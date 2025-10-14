import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import Razorpay from "razorpay";

const key_id = process.env.RAZORPAY_KEY_ID;
const key_secret = process.env.RAZORPAY_KEY_SECRET;
const plan_id = process.env.RAZORPAY_PLAN_ID;

if (!key_id || !key_secret || !plan_id) {
    throw new Error("Razorpay environment variables are not set.");
}

export const razorpay = new Razorpay({
    key_id,
    key_secret,
});

// const stripe = new Stripe(process.env.STRIPE_CLIENT_KEY as string)
export async function GET() {
    try {
        const user = await currentUser();
        if (!user) {
            return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
        }

        console.log("entered payment route");

        const success_url = `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard?payment=success`;
        const cancel_url = `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard?payment=cancelled`;

        const session = await razorpay.subscriptions.create({
            plan_id: plan_id as string,
            customer_notify: true,
            total_count: 12,
            quantity: 1,
            notes: {
                "success_url": success_url,
                "cancel_url": cancel_url,
                "user_email": user.emailAddresses[0].emailAddress,
                "user_clerk_id": user.id
            }
        });

        console.log(session, ['razorpay session']);

        if (session) {
            return NextResponse.json({
                status: 200,
                sessionId: session.id,
                // The short_url is the checkout page you can redirect the user to.
                url: session.short_url,
                customerId: session.customer_id,
            });
        }

        return NextResponse.json({
            status: 400,
            message: 'Failed to create subscription session'
        });
    } catch (error) {
        console.error("Error creating Razorpay subscription:", error);
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
}
