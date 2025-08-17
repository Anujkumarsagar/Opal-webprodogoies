"use server";

import { client } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { stat } from "fs";

export async function verifyAccessToWorkspace(workspaceId: string) {
  try {
    const user = await currentUser();
    if (!user)
      return {
        status: 403,
      };

    const isUserInWorkspace = await client.workSpace.findUnique({
      where: {
        id: workspaceId,
        OR: [
          {
            User: {
              clerkid: user.id,
            },
          },
          {
            members: {
              every: {
                User: {
                  clerkid: user?.id,
                },
              },
            },
          },
        ],
      },
    });
    return {
      status: 200,
      data: {
        workspace: isUserInWorkspace,
      },
    };
  } catch (error) {
    return {
      status: 400,
      data: {
        workspace: null
      },
      error: error
    }
  }
}


export const getWorkspaceFolders = async (workSpaceId: string) => {
  try {
    const isFolders = await client.folder.findMany({
      where: {
        workSpaceId
      },
      include: {
        _count: {
          select: {
            videos: true,
          }
        }
      }
    })

    if (isFolders && isFolders.length > 0) {
      return {
        status: 200,
        data: isFolders
      }
    }

    return {
      status: 404,
      data: []
    }
  } catch (error) {
    console.error("Error fetching workspace folders:", error);
    return {
      status: 404,
      data: []
    }
  }
}


export const getAllUserVideos = async (workSpaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 403,
        data: []
      };
    }
    const videos = await client.video.findMany({
      where: {
        OR: [{ workSpaceId }, { folderId: workSpaceId }]
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        Folder: {
          select: {
            id: true,
            name: true
          }
        },
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true
          }
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (videos && videos.length > 0) {
      return {
        status: 200,
        data: videos
      };
    }

    return {
      status: 404,
      data: []
    }
  } catch (error) {
    console.error("Error fetching user videos:", error);
    return {
      status: 500,
      data: []
    };
  }
}

export const getWorkSpaces = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 403,
        data: []
      };
    }

    const workspaces = await client.user.findMany({
      where: {
        clerkid: user.id
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        workspace: {

          select: {
            id: true,
            name: true,
            type: true,
          }
        },
        members: {
          select: {
            WorkSpace: {
              select: {
                id: true,
                name: true,
                type: true,
              }
            }
          }
        }
      }
    });

    if (workspaces) {
      return {
        status: 200,
        data: workspaces
      }
    }
    return {
      status: 404,
      data: []
    };
  } catch (error) {
    console.error("Error fetching user workspaces:", error);
    return {
      status: 500,
      data: []
    };
  }
}



export const CreateWorkspace = async (name: string) => {
  try {

    const user = await currentUser();
    if (!user) return { status: 403, data: null };
    const authorized = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true
          }
        }
      }
    })

    if (authorized?.subscription?.plan !== 'PRO') {
      const workspace = await client.user.update({
        where: {
          clerkid: user.id,

        },
        data: {
          workspace: {
            create: {
              name, type: 'PUBLIC'
            }
          }
        }
      })


      if (workspace) {
        return { status: 200, data: 'Workspace Created' };
      }
    }


    return {
      status: 403,
      data: null,
      error: "You are not authorized to create a workspace"
    }

  } catch (error) {
    console.error("Error creating workspace:", error);
    return {
      status: 500,
      data: null,
      error: error
    };
  }
}



export const renameFolders = async (folderId: string, name: string) => {

  try {
    const folder = await client.folder.update({
      where: {
        id: folderId
      },
      data: {
        name: name
      }
    })

    if (folder) {
      return {
        status: 200,
        data: folder
      }
    }
    return {
      status: 404,
      data: null,
      error: "Folder not found"
    }
  } catch (error) {
    return {
      status: 500,
      data: null,
    }
  }
}
