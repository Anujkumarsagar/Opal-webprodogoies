import { Bell, CreditCard, Home, Library, Settings } from "lucide-react";
import React from "react";

export const MENU_ITEMS = (workspaceId: string): {
    title: string;
    href: string;
    icon: React.ReactNode
}[] => [
        { title: 'Home', href: `/dashboard/${workspaceId}/home`, icon: <Home /> },
        { title: 'My Library', href: `/dashboard/${workspaceId}`, icon: <Library /> },
        { title: 'Notification', href: `/dashboard/${workspaceId}/notification`, icon: <Bell /> },
        { title: 'Billing', href: `/dashboard/${workspaceId}/billing`, icon: <CreditCard /> },
        { title: 'Settings', href: `/dashboard/${workspaceId}/settings`, icon: <Settings /> },

    ]