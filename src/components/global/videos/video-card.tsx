
import React from "react";
import Loader from "../loader";
import CopyLink from "./CopyLink";
import Link from "next/link";
import CardMenu from "./card-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfile } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { Dot, Share, User2 } from "lucide-react";



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
            <h2 className="text-sm font-semibold text-[#6d6b6b] ">
              {props.title}
            </h2>
            <div className="flex gap-x-2 items-center mt-4">
              <Avatar className="mt-2 w-8 h-8">
                <AvatarImage src={props.User?.image as string} />
                <AvatarFallback>
                  <User2 />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="capitalize text-[#6d6b6b] text-xs">
                  {props.User?.firstname} {props.User?.lastname}
                </p>
                <p className="text-[#707070] text-xs flex items-center">
                  <Dot /> {daysago === 0 ? "Today" : daysago + "d ago"}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <span className="flex gap-x-1 items-center">
                <Share 
                fill="#9D9D9D"
                className="text-[#9D9D9D]"
                size={12}
                />
                <p className="text-[#9D9D9D] text-xs capitalize" >{props.User?.firstname}'s Workspace</p>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </Loader> 
  );
};

export default VideoCard;
