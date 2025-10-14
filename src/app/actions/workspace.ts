"use server";
"use server";

import { client } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { stat } from "fs";
import { a } from "node_modules/framer-motion/dist/types.d-Cjd591yU";
import { sendEmail } from "./user";

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
        workspace: null,
      },
      error: error,
    };
  }
}

export const getWorkspaceFolders = async (workSpaceId: string) => {
  try {
    const isFolders = await client.folder.findMany({
      where: {
        workSpaceId,
      },
      include: {
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });

    if (isFolders && isFolders.length > 0) {
      return {
        status: 200,
        data: isFolders,
      };
    }

    return {
      status: 404,
      data: [],
    };
  } catch (error) {
    console.error("Error fetching workspace folders:", error);
    return {
      status: 404,
      data: [],
    };
  }
};

export const getAllUserVideos = async (workSpaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 403,
        data: [],
      };
    }
    const videos = await client.video.findMany({
      where: {
        OR: [{ workSpaceId }, { folderId: workSpaceId }],
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
            name: true,
          },
        },
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (videos && videos.length > 0) {
      return {
        status: 200,
        data: videos,
      };
    }

    return {
      status: 404,
      data: [],
    };
  } catch (error) {
    console.error("Error fetching user videos:", error);
    return {
      status: 500,
      data: [],
    };
  }
};

export const getWorkSpaces = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 403,
        data: [],
      };
    }

    const workspaces = await client.user.findMany({
      where: {
        clerkid: user.id,
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
          },
        },
        members: {
          select: {
            WorkSpace: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });

    if (workspaces) {
      return {
        status: 200,
        data: workspaces,
      };
    }
    return {
      status: 404,
      data: [],
    };
  } catch (error) {
    console.error("Error fetching user workspaces:", error);
    return {
      status: 500,
      data: [],
    };
  }
};

export const CreateWorkspace = async (name: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 403, data: null };
    const authorized = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        id: true,
        subscription: {
          select: {
            id: true,
            plan: true,
          },
        },
      },
    });

    console.log("authorized in create workspace: ", authorized)

    if (authorized?.subscription?.plan === "PRO") {
      const workspace = await client.user.update({
        where: {
          clerkid: user.id,
        },
        data: {
          workspace: {
            create: {
              name,
              type: "PUBLIC",
            },
          },
        },
      });

      console.log("Workspace Created: ", workspace)

      if (workspace) {
        return { status: 200, data: "Workspace Created" };
      }
    }

    return {
      status: 403,
      data: null,
      error: "You are not authorized to create a workspace",
    };
  } catch (error) {
    console.error("Error creating workspace:", error);
    return {
      status: 500,
      data: null,
      error: error,
    };
  }
};

export const renameFolders = async (folderId: string, name: string) => {
  try {
    const folder = await client.folder.update({
      where: {
        id: folderId,
      },
      data: {
        name: name,
      },
    });

    if (folder) {
      return {
        status: 200,
        data: folder,
      };
    }
    return {
      status: 404,
      data: null,
      error: "Folder not found",
    };
  } catch (error) {
    return {
      status: 500,
      data: null,
    };
  }
};

export const createFolder = async (workspaceId: string) => {
  try {
    const isNewFolders = await client.workSpace.update({
      where: {
        id: workspaceId,
      },
      data: {
        folders: {
          create: {
            name: "Untitled Folder",
          },
        },
      },
    });

    if (isNewFolders) {
      return {
        status: 200,
        message: "Folder created successfully",
        data: isNewFolders,
      };
    }

    return {
      status: 404,
      message: "Failed to create folder",
      data: null,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal server error",
      data: null,
    };
  }
};

export const getFolderInfo = async (folderId: string) => {
  try {
    const folder = await client.folder.findUnique({
      where: {
        id: folderId,
      },
      select: {
        name: true,
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });

    if (folder) {
      return {
        status: 200,
        data: folder,
      };
    }

    return {
      status: 404,
      data: null,
      error: "Folder not found",
    };
  } catch (error) {
    return {
      status: 500,
      data: null,
      error: "Internal server error",
    };
  }
};

export const moveVideoLocation = async (
  folderId: string,
  videoId: string,
  workspaceId: string
) => {
  try {
    const location = await client.video.update({
      where: {
        id: videoId,
      },
      data: {
        folderId: folderId || undefined,
        workSpaceId: workspaceId,
      },
    });
    if (location) {
      return {
        status: 200,
        data: location,
      };
    }
    return {
      status: 404,
      data: null,
      error: "Failed to move video location",
    };
  } catch (error) {
    return {
      status: 500,
      data: null,
      error: "Internal server error",
    };
  }
};




export const getPreviewVideo = async (videoId: string) => {
  try {
    const user = await currentUser()
    if (!user) return { status: 403, data: null }
    const video = await client.video.findUnique({
      where: {
        id: videoId
      },
      select: {
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        description: true,
        views: true,
        summary: true,
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
            clerkid: true,
            subscription: {
              select: {
                plan: true,
              },
            },
            trial: true
          }
        },
      }
    })

    if (video) {
      return {
        status: 200,
        data: video,
        author: user.id === video.User?.clerkid ? true : false
      }
    }
    return {
      status: 404,
      data: null,
      author: false,
      error: "Video not found"
    }
  } catch (error) {
    return {
      status: 500,
      data: null,
      error: error
    }

  }
}





export const sendEmailForFirstView = async (videoId: string) => {
  try {
    const user = await currentUser()
    if (!user) return { status: 403 }
    const firstViewSettings = await client.user.findUnique(
      {
        where: {
          clerkid: user.id
        },
        select: {
          firstView: true
        }
      }
    )

    if (!firstViewSettings?.firstView) {
      return
    }

    const video = await client.video.findUnique({
      where: {
        id: videoId
      },
      select: {
        title: true,
        views: true,
        User: {
          select: {
            email: true,
          },
        },
      }
    })

    if (video && video.views === 0) {
      await client.video.update({
        where: {
          id: videoId
        },
        data: {
          views: video.views + 1
        }
      })
    }

    const { transporter, mailOptions } = await sendEmail(
      video?.User?.email as string,
      "Your video got its first view!",
      `<p>Your video titled "${video?.title}" has just received its first view! 🎉</p>
      <p>Thank you for sharing your content with us.</p>
      <p>Best regards,<br/>The Team</p>`
    )

    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);
      }
      else {
        const notification = await client.user.update({
          where: {
            clerkid: user.id
          },
          data: {
            notificaion: {
              create: {
                content: mailOptions.text as string
              }
            }
          }

        })

        if (notification) {
          return {
            status: 200,
            data: { notification }
          }
        }
      }
    })
  } catch (error) {
    console.log(error)

  }
}