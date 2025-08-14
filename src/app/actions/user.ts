'use server'

import { ca } from "date-fns/locale"
import { client } from "../../lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

export const onAuthenticateUser = async () => {
    try {
        const user = await currentUser()
        if (!user) {
            return { status: 403 }
        }

        const userExists = await client.user.findUnique({
            where: {
                clerkid: user.id
            },
            include: {
                workspace: {
                    where: {
                        User: {
                            clerkid: user.id
                        }
                    }
                }
            }
        })


        if (userExists) {
            return { status: 200, user: userExists }
        }

        const newUser = await client.user.create({
            data: {
                clerkid: user.id,
                email: user.emailAddresses[0].emailAddress,
                firstname: user.firstName || "",
                lastname: user.lastName || "",
                image: user.imageUrl || "",
                studio: {
                    create: {}
                },
                subscription: {
                    create: {
                        customerId: user.id,

                    }
                },
                workspace: {
                    create: {
                        name: `${user.firstName}'s Workspace`,
                        type: "PERSONAL",

                    }
                }
            },
            include: {
                workspace: {
                    where: {
                        User: {
                            clerkid: user.id
                        }
                    }
                },
                subscription: true
            }
        })

        if (newUser) {
            return { status: 201, user: newUser }
        }

        return { status: 500, message: "User creation failed" }
    } catch (error) {
        return { status: 500, message: "Internal Server Error", error: error instanceof Error ? error.message : "Unknown error" }
    }
}

export const getNotification = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        status: 403,
        data: { notifications: [], count: 0 }
      };
    }

    const notification = await client.user.findUnique({
      where: { clerkid: user.id },
      select: {
        notificaion: true,
        _count: { select: { notificaion: true } }
      }
    });

    return {
      status: 200,
      data: {
        notifications: notification?.notificaion || [],
        count: notification?._count?.notificaion || 0
      }
    };
  } catch (error) {
    console.error("Error fetching user notifications:", error);
    return {
      status: 500,
      data: { notifications: [], count: 0 }
    };
  }
};


export const searchUsers = async (query: string) => {
    try {
        const user = await currentUser();
        if (!user) return { status: 404 }

        const workspace = await client.user.findMany({
            where: {
                OR: [
                    { firstname: { contains: query } },
                    { lastname: { contains: query } },
                    { email: { contains: query } }

                ],
                NOT: [{ clerkid: user.id }]
            },
            select: {
                id: true,
                subscription: {
                    select: {
                        plan: true
                    }
                },
                firstname: true,
                lastname: true,
                image: true,
                email: true
            }
        })

        if (workspace && workspace.length > 0) {
            return {
                status: 200,
                data: workspace
            }
        }

        return {
            status: 404,
            data: undefined
        }
    } catch (error) {
        console.error("Error searching workspace:", error);
        return {
            status: 500,
            data: undefined
        };
    }
}