
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DialogDescription } from '@radix-ui/react-dialog'
import React, { ReactNode } from 'react'

type Props = {
    trigger: ReactNode
    children: ReactNode
    title: string
    description: string
    className?: string
}

function Modal({ children, trigger, title, description, className }: Props) {
    return (
        <Dialog>

            <DialogTrigger
                className={className}
                asChild
            >
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default Modal