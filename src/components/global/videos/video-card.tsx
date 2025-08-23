
import React from "react";
import Loader from "../loader";
import CopyLink from "./CopyLink";
import Link from "next/link";
import CardMenu from "./card-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfile } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";



type Props = {
  User: {
    firstname: string | null;
    lastname: string | null;
    image: string | null;
  } | null;
  id: string;
  processing: boolean;
  workspaceId: string;
  source: string;
  title: string | null;
  Folder: {
    id: string;
    name: string;
  } | null;
  createdAt: Date;
};
const VideoCard = (props: Props) => {
  //WIP witre p date

  const daysago = Math.floor(
    (new Date().getTime() - props.createdAt.getTime()) /
      (24 * 60 * 60 * 60 * 100)
  );
  return (
    <Loader
      className="bg-[#171717] flex justify-center items-center border-[1px] border-[#252525] rounded-xl"
      state={props.processing}
    >
      <div className=" group overflow-hidden cursor-pointer relative flex flex-col rounded-xl bg-[#171717] border-[#252525] border-[1px]">
        <div className="absoulte top-3 right-3 z-50 flex gap-x-3 group-hover:flex">
          <CardMenu
            currentFolder={props.Folder?.id}
            currentWorkspace={props.workspaceId}
            videoId={props.id}
            currentFolderName={props.Folder?.id}
          />
          <CopyLink className="p-[5px] h-5 bg-[#252525] hover:bg-transparent" videoId={props.id} />
        </div>
        <Link
          href={`/preview/${props.id}`}
          className="hover:bg-[#252525] transtition duration-150 flex flex-col justify-between h-full"
        >
          <video
            controls={false}
            preload="metadata"
            className="w-full aspect-video opacity-50 z-20"
          >
            <source
              src={`${process.env.NEXT_PUBLIC_CLOUD_STREAM_URL}/${props.source}#t=1`}
            />
          </video>
          <div className="px-5 py-3 flex flex-col gap-x-2 z-20">
            <h2 className="text-sm font-semibold text-[#BDBDBD] ">
              {props.title}
            </h2>
            <div className="flex gap-x-2 items-center">
              <Avatar>
                <AvatarImage className="mt-4"/>
                <AvatarFallback>
                  
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </Link>
      </div>
    </Loader>
  );
};

export default VideoCard;
