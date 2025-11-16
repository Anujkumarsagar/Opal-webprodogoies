import { client } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params:{id} }: { params: { id: string } }) {


    try {

        const userProfile = await client.user.findUnique({
            where: {
                clerkid: id
            },
            include: {
                studio: true,
                subscription: {
                    select: {
                        plan: true
                    }
                }
            }
        })

        if (userProfile) {
            return NextResponse.json({
                status: 200,
                user: userProfile
            })
        }

        const clerkUserInstance = await clerkClient.users.getUser(id)

        const createUser = await client.user.create({
            data: {
                clerkid: id,
                email: clerkUserInstance.emailAddresses[0].emailAddress,
                firstname: clerkUserInstance.firstName || '',
                lastname: clerkUserInstance.lastName || '',
                studio: {
                    create: {},
                },
                workspace: {
                    create: {
                        name: `${clerkUserInstance.firstName}'s Workspace`,
                        type: 'PERSONAL'
                    }
                },
                subscription: {
                    create: {
                        plan: 'FREE',
                       customerId: '',
                    },
                },

            },
            include: {
                subscription: {
                    select: {
                        plan: true,
                    }
                }
            }
        })

        if (createUser) {
            return NextResponse.json({
                status: 201,
                user: createUser
            })
        }

        return NextResponse.json({
            status: 400,
            message: 'Unable to create user profile'
        })
    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}   