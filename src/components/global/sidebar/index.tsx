
"use client"
import { getWorkSpaces } from "@/app/actions/workspace";
import { Select, SelectContent, SelectLabel, SelectGroup, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { userQueryData } from "@/hooks/userQueryData";

import { useRouter } from "next/navigation";
import React from "react";
type Props = {
  actionWorkspaceId: string;
};

const Sidebar = ({ actionWorkspaceId }: Props) => {
  const router = useRouter()
  const {data, isFetched} = userQueryData(["user-workspaces"], getWorkSpaces)
  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`)
  }
  return (
    <div className="bg-[#111111] bg-white flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden ">
      <div className="bg-[#111111] p-4 gap-2 justify-center items-center mb-4 absolute top-0  flex left-0 right-0">
        Logo
        <p className="text-2xl">Dost</p>
      </div>
      <Select
      defaultValue={actionWorkspaceId}
      onValueChange={onChangeActiveWorkspace}

      >
        <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
          <SelectValue placeholder={"Select a workspace" }></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Workspace</SelectLabel>
            <Separator />
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Sidebar;
