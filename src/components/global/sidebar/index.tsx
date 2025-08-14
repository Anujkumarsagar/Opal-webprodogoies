"use client";

import { getWorkSpaces } from "@/app/actions/workspace";
import {
  Select,
  SelectContent,
  SelectLabel,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { userQueryData } from "@/hooks/userQueryData";
import { NotificationsProps, WorkspaceProps } from "@/types/index.type";

import { usePathname, useRouter } from "next/navigation";
import React, { act } from "react";
import Modal from "../modal";
import { PlusCircle } from "lucide-react";
import Search from "../search";
import { MENU_ITEMS } from "@/constants";
import SidebarItem from "./sidebar-item";
import { getNotification } from "@/app/actions/user";
import WorkspacePlaceholder from "./workspace-placeholder";

type Props = {
  activeWorkspaceId: string;
};

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

  const workspaceData = workspacesData as WorkspaceProps | undefined;
  const notifications = notificationsData as NotificationsProps | undefined;


  const currentWorkspace = workspaceData?.data?.find(
    (s) => s?.workspace?.map((item)=> item.id === activeWorkspaceId && item)
  );



  console.log("CurrentWorkspace", currentWorkspace)
  console.log("workspaceData", workspaceData)

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

  return (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden ">
      {/* Header */}
      <div className="bg-[#111111] p-4 gap-2 justify-center items-center mb-4 absolute top-0 flex left-0 right-0">
        Logo
        <p className="text-2xl">Dost</p>
      </div>

      {/* Workspace Selector */}
      <Select defaultValue={activeWorkspaceId} onValueChange={onChangeActiveWorkspace}>
        <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
          <SelectValue placeholder="Select a workspace"></SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-[#111111] backdrop-blur-xl">
          <SelectGroup>
            <SelectLabel>Workspace</SelectLabel>
            <Separator />
            {/* Owned Workspaces */}
            {workspaceData?.data[0]?.workspace?.map((workspace) => (
              <SelectItem key={workspace.id} value={workspace.id}>
                {workspace.name}
              </SelectItem>
            ))}
            {/* Member Workspaces */}
            {workspaceData?.data[0]?.members?.length
              ? workspaceData.data[0].members.map((m) =>
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

      {/* Invite Modal */}
      {currentWorkspace?.workspace[0]?.type === "PUBLIC" &&
        workspaceData?.data[0]?.subscription?.plan === "PRO" && (
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
              notifications={
                item.title === "Notification" ? count : 0
              }
            />
          ))}
        </ul>
      </nav>

      <Separator className="w-4/5" />

      {/* Quick Workspace List */}
      <p className="w-full text-[#9D9D9D] font-bold m-4">Workspaces</p>
      <nav className="w-full">
        <ul className="h-[150px] overflow-auto overflow-x-hidden fade-layer">
          {workspaceData?.data[0]?.workspace?.length
            && workspaceData.data[0].workspace.map((e) => (
                <SidebarItem
                  href={`/dashboard/${e.id}`}
                  selected={pathName === `/dashboard/${e.id}`}
                  title={e.name}
                  notifications={0}
                  key={e.id}
                  icon={
                    <WorkspacePlaceholder>{e.name.charAt(0)}</WorkspacePlaceholder>
                  }
                />
              ))
            }
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
