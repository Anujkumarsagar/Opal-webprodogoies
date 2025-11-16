'use server'

import { ca } from "date-fns/locale"
import { client } from "../../lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { includes } from "zod"
import { TruckElectric } from "lucide-react"
import { SegmentViewNode } from "next/dist/next-devtools/userspace/app/segment-explorer-node"
import nodemailer from 'nodemailer'
import { razorpay } from "../api/payment/route"


export const sendEmail = async (
    to: string,
    subject: string,
    text: string,
    html?: string
) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD

        }
    })

    const mailOptions = {
        to,
        subject,
        text,
        html

    }

    return { transporter, mailOptions }
}

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



export const getPaymentInfo = async () => {
    try {
        const user = await currentUser()
        if (!user) return { status: 403 }

        const payment = await client.user.findUnique({
            where: {
                clerkid: user.id
            },
            select: {
                subscription: {
                    select: {
                        plan: true,
                    }
                }
            }
        })

        if (payment) {
            return {
                status: 200,
                data: payment
            }
        }
    } catch (error) {
        return {
            status: 500,
            data: null
        }
    }
}

export const enableFirstView = async (state: boolean) => {
    try {
        const user = await currentUser()
        if (!user) return { status: 403 }

        const userData = await client.user.update({
            where: {
                clerkid: user.id
            },
            data: {
                firstView: state
            }
        })
        if (userData) {
            return {
                status: 200,
                data: userData
            }
        }
        return {
            status: 404,
            data: null
        }
    } catch (error) {
        return {
            status: 500,
            data: null
        }
    }
}




export const getFirstView = async () => {
    try {
        const user = await currentUser()
        if (!user) return { status: 403 }

        const userData = await client.user.findUnique({
            where: {
                clerkid: user.id
            },
            select: {
                firstView: true
            }
        })

        if (userData) {
            return {
                status: 200,
                data: userData.firstView
            }
        }

        return {
            status: 404,
            data: null
        }
    } catch (error) {
        return {
            status: 500,
            data: null
        }
    }
}



export const createCommentAndReply = async (
    userId: string,
    comment: string,
    videoId: string,
    commentId?: string
) => {
    try {
        if (commentId) {
            const reply = await client.comment.update({
                where: { id: commentId },
                data: {
                    reply: {
                        create: {
                            userId,
                            videoId,
                            comment,
                        },
                    },
                },
            })

            return {
                status: 200,
                data: "Reply posted",
            }
        } else {
            const newComment = await client.video.update({
                where: { id: videoId },
                data: {
                    comment: {
                        create: {
                            userId,
                            comment,
                        },
                    },
                },
            })

            return {
                status: 200,
                data: "Comment posted",
            }
        }
    } catch (error) {
        console.error("Error creating comment/reply:", error)
        return {
            status: 500,
            data: null,
        }
    }
}



export const getUserProfile = async () => {
    try {
        const user = await currentUser()
        if (!user) return { status: 403 }

        const profileIdAndImage = await client.user.findUnique({
            where: {
                clerkid: user.id
            },
            select: {
                id: true,
                image: true
            }
        })
        if (profileIdAndImage) {
            return {
                status: 200,
                data: profileIdAndImage
            }
        }
        return {
            status: 404,
            data: null
        }
    } catch (error) {
        return {
            status: 500,
            data: null
        }
    }
}



export const getVideoComments = async (id: string) => {
    try {
        const comments = await client.comment.findMany({
            where: {
                OR: [{
                    videoId: id
                }, {
                    commentId: id
                }],
                commentId: null

            },
            include: {
                reply: {
                    include: {
                        User: true
                    }
                },
                User: true
            }
        })

        return {
            status: 200,
            data: comments
        }

    } catch (error) {
        return {
            status: 500,
            data: null
        }
    }


}



export const inviteMembers = async (
    workspaceId: string,
    recieverId: string,
    email: string
) => {
    try {

        const user = await currentUser()
        if (!user) return { status: 403 }

        const senderInfo = await client.user.findUnique({
            where: {
                clerkid: user.id
            },
            select: {
                id: true,
                firstname: true,
                lastname: true,
            }
        })
        if (senderInfo?.id) {
            const workspace = await client.workSpace.findUnique({
                where: {
                    id: workspaceId
                },
                select: {
                    name: true
                }
            })

            if (workspace) {
                const invitation = await client.invite.create({
                    data: {
                        senderId: senderInfo.id,
                        recieverId,
                        workSpaceId: workspaceId,
                        content: `You are invited to join ${workspace.name} workspace , click accept to confirm`
                    },
                    select: {
                        id: true,


                    }

                })

                const notification = await client.user.update({
                    where: {
                        clerkid: user.id
                    },
                    data: {
                        notification: {
                            create: {
                                content: `${user.firstName} ${user.lastName} invited ${senderInfo.firstname}`
                            },
                        },
                    },
                })

                if (invitation) {
                    const { transporter, mailOptions } = sendEmail(
                        email,
                        'Workspace Invitation',
                        `You are invited to join ${workspace.name} workspace , click accept to confirm`,
                        `<a href="${process.env.NEXT_PUBLIC_HOST_URL}/invitations">Accept Invitation</a> `
                    )

                    await transporter.sendMail(mailOptions, async (err, info) => {
                        if (err) {
                            console.error('Error sending email:', err);
                        } else {
                            console.log('Email sent:', info.response);
                        }
                    })

                    return {
                        status: 200,
                        data: 'Invitation Sent'
                    }
                }
                return {
                    status: 400,
                    data: 'Invitation Failed'
                }
            }
            return {
                status: 404,
                data: 'Workspace not found'
            }
        }
        return {
            status: 404,
            data: 'Recipent not found'
        }
    } catch (error) {
        return {
            status: 500,
            data: 'Internal Server Error'
        }

    }
}





export const acceptInvite = async (inviteId: string) => {
    try {

        const user = await currentUser()
        if (!user) return { status: 403 }
        const invitation = await client.invite.findUnique({
            where: {
                id: inviteId
            },
            select: {
                workSpaceId: true,
                reciever: {
                    select: {
                        clerkid: true,
                    },
                },
            },
        })

        if (user.id !== invitation?.reciever?.clerkid) {
            return { status: 403, message: "You are not authorized to accept this invitation" }
        }

        const acceptInvite = await client.workSpace.update({
            where: {
                id: invitation?.workSpaceId as string
            },
            data: {
                accepted: true
            }
        })


        const updateMember = await client.workSpace.update({
            where: {
                clerkid: user.id,
            },
            data: {
                members: {
                    create: {
                        workspaceId: invitation?.workSpaceId
                    }
                }
            }
        })


        const membersTransaction = await client.$transaction([acceptInvite, updateMember])

        if (membersTransaction) {
            return { status: 200, message: "Invitation accepted" }
        }

        return { status: 500, message: "Failed to accept invitation" }

    } catch (error) {
        return {
            status: 500,
            data: 'Internal Server Error'
        }
    }

}







export const completeSubscription = async (session_id: string) => {
    try {

        const user = await currentUser()
        if (!user) return { status: 403 }

        const session = await razorpay.subscriptions.fetch(session_id)

        if (session && session.status === 'active') {
            const updateSubscription = await client.user.update({
                where: {
                    clerkid: user.id
                },
                data: {
                    subscription: {
                        update: {
                            data: {
                                customerId: session.customer_id as string,
                                plan: 'PRO',
                                // status: session.status,
                            }
                        }
                    }

                }
            })

            if (updateSubscription) {
                return {
                    status: 200,
                    data: updateSubscription
                }
            }
        }
        return {
            status: 400,
            data: 'Failed to complete subscription'
        }


    } catch (error) {

        return {
            status: 500,
            data: 'Internal Server Error'
        }

    }
}