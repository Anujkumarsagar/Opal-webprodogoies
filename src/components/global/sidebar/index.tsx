"use client";

import { getWorkSpaces } from "@/app/actions/workspace";
import {
    Select,
    SelectContent,
    SelectLabel,
    SelectGroup,
    SelectTrigger,
    SelectValue,
    SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { userQueryData } from "@/hooks/userQueryData";
import { NotificationsProps, WorkspaceProps } from "@/types/index.type";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Modal from "../modal";
import { Divide, Menu, PlusCircle } from "lucide-react";
import Search from "../search";
import { MENU_ITEMS } from "@/constants";
import SidebarItem from "./sidebar-item";
import { getNotification } from "@/app/actions/user";
import WorkspacePlaceholder from "./workspace-placeholder";
import GlobalCard from "../global-card";
import { Button } from "@/components/ui/button";
import Loader from "../loader";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type Props = {
    activeWorkspaceId: string;
};


// WIP: upgrade button functionality 
const Sidebar = ({ activeWorkspaceId }: Props) => {
    const router = useRouter();
    const pathName = usePathname();

    // Fetch Workspaces
    const { data: workspacesData, isFetched } = userQueryData(
        ["user-workspaces"],
        getWorkSpaces
    );

    // Fetch Notifications
    const { data: notificationsData } = userQueryData(
        ["user-notifications"],
        getNotification
    );

    // Cast and destructure with defaults to avoid undefined errors
    const workspaceResponse = workspacesData as WorkspaceProps | undefined;
    const workspace = workspaceResponse?.data?.[0] || {
        workspace: [],
        members: [],
        subscription: {},
    };

    const notifications = notificationsData as NotificationsProps | undefined;

    // Current selected workspace
    const currentWorkspace = workspace.workspace.find(
        (w) => w.id === activeWorkspaceId
    );

    const count = notifications?.data?._count?.notification ?? 0;
    const menuItems = MENU_ITEMS(activeWorkspaceId);

    const onChangeActiveWorkspace = (value: string) => {
        router.push(`/dashboard/${value}`);
    };

    if (!isFetched) {
        return (
            <div className="bg-[#111111] p-4 h-full w-[250px] flex items-center justify-center">
                <p className="text-neutral-400">Loading...</p>
            </div>
        );
    }

    const SidebarSection = (
        <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center  ">
            {/* Header */}
            <div className="bg-[#111111] p-4 gap-2 justify-center items-center mb-4 absolute top-0 flex left-0 right-0">
                Logo
                <p className="text-2xl">Dost</p>
            </div>

            {/* Workspace Selector */}
            <Select
                defaultValue={activeWorkspaceId}
                onValueChange={onChangeActiveWorkspace}
            >
                <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
                    <SelectValue placeholder="Select a workspace" />
                </SelectTrigger>
                <SelectContent className="bg-[#111111] backdrop-blur-xl">
                    <SelectGroup>
                        <SelectLabel>Workspace</SelectLabel>
                        <Separator />
                        {/* Owned Workspaces */}
                        {workspace.workspace.map((ws) => (
                            <SelectItem key={ws.id} value={ws.id}>
                                {ws.name}
                            </SelectItem>
                        ))}

                        {/* Member Workspaces */}
                        {workspace.members.length
                            ? workspace.members.map((m) =>
                                m.Workspace ? (
                                    <SelectItem value={m.Workspace.id} key={m.Workspace.id}>
                                        {m.Workspace.name}
                                    </SelectItem>
                                ) : null
                            )
                            : null}
                    </SelectGroup>
                </SelectContent>
            </Select>

            {/* Invite Modal (only for PUBLIC + PRO workspaces) */}
            {currentWorkspace?.type === "PUBLIC" &&
                workspace?.subscription?.plan === "PRO" && (
                    <Modal
                        title="Invite To Workspace"
                        trigger={
                            <span className="text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90 hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2">
                                <PlusCircle
                                    size={15}
                                    className="text-neutral-800/90 fill-neutral-500"
                                />
                                <span className="text-neutral-400 font-semibold text-sm">
                                    Invite To Workspace
                                </span>
                            </span>
                        }
                        description="Invite other user to your workspace"
                    >
                        <Search workspaceId={activeWorkspaceId} />
                    </Modal>
                )}

            {/* Main Menu */}
            <p className="w-full text-[#9D9D9D] font-bold mt-4">Menu</p>
            <nav className="w-full">
                <ul>
                    {menuItems.map((item) => (
                        <SidebarItem
                            href={item.href}
                            icon={item.icon}
                            title={item.title}
                            key={item.title}
                            selected={pathName === item.href}
                            notifications={item.title === "Notification" ? count : 0}
                        />
                    ))}
                </ul>
            </nav>

            <Separator className="w-4/5" />

            {/* Quick Workspace List */}
            <p className="w-full text-[#9D9D9D] font-bold m-4">Workspaces</p>
            {workspace.workspace.length === 1 &&
                workspace.members.length === 0 && <div className="w-full h-full flex justify-center items-center">

                    <div className="w-full mt-[-10px]">

                        <p className="text-[#3C3C3C] font-medium text-sm">

                            {workspace.subscription?.plan === 'FREE' ? "Upgrade to create workspaces" : "No Workspaces"}
                        </p>
                    </div>
                </div>}
            <nav className="w-full">
                <ul className="h-[150px] overflow-auto overflow-x-hidden fade-layer">
                    {workspace.workspace.length > 0 &&
                        workspace.workspace.map(
                            (e) =>
                                e.type == "PERSONAL" && (

                                    <SidebarItem
                                        href={`/dashboard/${e.id}`}
                                        selected={pathName === `/dashboard/${e.id}`}
                                        title={e.name}
                                        notifications={0}
                                        key={e.id}
                                        icon={
                                            <WorkspacePlaceholder>
                                                {e.name.charAt(0)}
                                            </WorkspacePlaceholder>
                                        }
                                    />
                                )
                        )}
                    {workspace.members.length > 0 && workspace.members.map((e) => (<SidebarItem
                        href={`/dashboard/${e.Workspace.id}`}
                        selected={pathName === `/dashboard/${e.Workspace.id}`}
                        title={e.Workspace.name}
                        notifications={0}
                        key={e.Workspace.id}
                        icon={
                            <WorkspacePlaceholder>
                                {e.Workspace.name.charAt(0)}
                            </WorkspacePlaceholder>
                        }
                    />))}


                </ul>
            </nav>
            <Separator className="w-4/5" />
            {workspace.subscription?.plan === 'FREE' && <GlobalCard

                title="Upgrade to Pro"
                description="Unlock AI features like transcription  AI summary, and more."
            >

                <Button className="tex-sm w-full mx-auto mt-2">
                    <Loader> Ugrade </Loader>
                </Button>
            </GlobalCard>}
        </div>
    );

    return (
        <div>
            {/* Mobile View */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-neutral-200 hover:bg-neutral-800 rounded-md"
                        >
                            <Menu className="w-6 h-6" />
                        </Button>
                    </SheetTrigger>

                    {/* Slide-Out Sidebar */}
                    <SheetContent
                        side="left"
                        className="p-0 w-[250px] bg-[#111111] border-r border-neutral-800"
                    >
                        {SidebarSection}
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block">{SidebarSection}</div>
        </div>
    );
}
export default Sidebar;
