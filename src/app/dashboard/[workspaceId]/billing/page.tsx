import { getPaymentInfo } from '@/app/actions/user'
import React from 'react'

type Props = {}

const Billing = async (props: Props) => {
    const payment = await getPaymentInfo()
    console.log(payment)
    return (
        <div
            className='flex flex-col gap-y-8 p-5 rounded-xl bg-[#1D1D1D]'
        >
            <div className='flex items-center gap-4'>
                <h2
                className='text-2xl font-bold text-[#a22fe0]'
                >Current Plamn</h2>
                <p
                
                className='text-muted-foreground text-sm'
                >Your Payment History</p>
            </div>
            <div>
                <h2 
                className='text-2xl font-bold text-[#a22fe0]'
                >
                    {payment?.data?.subscription?.plan === 'PRO' ? '99' : '0'}/Month
                </h2>
                <p
                className='text-muted-foreground text-sm'
                >{payment?.data?.subscription?.plan} Plan</p>
            </div>
        </div>
    )
}

export default Billing