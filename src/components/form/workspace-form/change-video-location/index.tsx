import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useMoveVideos } from "@/hooks/useFolders";
import React from "react";

type Props = {
  videoId: string;
  currentFolder: string | undefined;
  currentWorkSpace: string | undefined;
  currentFolderName: string | undefined;
};

const ChangeVideoLocation = ({
  videoId,
  currentFolder,
  currentWorkSpace,
  currentFolderName,
}: Props) => {
  const {
    register,
    isFetching,
    isPending,
    onFormSubmit,
    folders,
    workspaces,
    isFolders,
  } = useMoveVideos(videoId, currentWorkSpace || "");

  console.log(folders)
  console.log("current folders", isFolders)
  // WIP : wire up the user move folder

  const folder = folders.find((folder) => folder.id === currentFolder);
  const workspace = workspaces.find(
    (workspace) => workspace.id === currentWorkSpace
  );

  return (
    <form className="flex flex-col gap-y-5" onSubmit={onFormSubmit}>
      <div className="border-[1px] rounded-xl p-5">
        <h2 className="text-xs text-[#a4a4a4]">Current Workspaces</h2>
        {workspace && <p className="text-[#a4a4a4]">{workspace.name}</p>}
        {/* {folder && (
                    <p className='text-[#a4a4a4]'>{folder.name}</p>

                )} */}
        <h2 className="text-[#a4a4a4] text-sm mt-4">Current Folder</h2>
        {folder ? <p>{folder.name}</p> : <p>No Folder</p>}
      </div>
      <Separator orientation="horizontal" />
      <div className="border-[1px] flex flex-col  rounded-xl p-5">
        <h2 className="text-xs text-[#a4a4a4]">To</h2>
        <Label className="flex-col flex text-sm">
          <p className="text-xs">Workspace</p>
          <select
            className="rounded-xl text-base bg-transparent"
            {...register("workspace_id")}
          >
            {workspaces.map((workspace) => (
              <option
                key={workspace.id as string}
                className="text-[#a4a4a4]"
                value={workspace.id as string}
              >
                {workspace.name}
              </option>
            ))}
          </select>
        </Label>
        {isFetching ? (
          <Skeleton />
        ) : (
          <Label className="flex-col gap-y-2 flex text-sm">
            <p className="text-xs">Folder</p>
            {isFolders && isFolders.length > 0 ? (
              <select
                {...register("folder_id")}
                className="rounded-xl text-base bg-transparent"
              >
                {isFolders.map((folder, key) =>
                  key === 0 ? (
                    <option
                      key={folder.id as string}
                      value={folder.id as string}
                      selected
                    >
                      {folder.name} 
                    </option>
                  ) : (
                    <option
                      key={folder.id as string}
                      value={folder.id as string}
                    >
                      {folder.name}
                    </option>
                  )
                )}
              </select>
            ) : (
              <p className="text-[#a4a4a40 text-sm]">
                This workspace has no folders
              </p>
            )}
          </Label>
        )}
      </div>
      <Button type="submit">
        <Loader state={isPending} color="#000" className="mr-2">
          Transfer
        </Loader>
      </Button>
    </form>
  );
};

export default ChangeVideoLocation;
