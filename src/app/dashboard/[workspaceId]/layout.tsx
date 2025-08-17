import React from "react";
import { getNotification, onAuthenticateUser } from "@/app/actions/user";
import { verifyAccessToWorkspace, getWorkspaceFolders, getAllUserVideos, getWorkSpaces } from "@/app/actions/workspace";
import { redirect } from "next/navigation";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import Sidebar from "@/components/global/sidebar";
import GlobalHeader from "@/components/global/global-header";


type Props = {
  params: { workspaceId: string };
  children: React.ReactNode;
};

const workspaceLayout = async ({
  params: { workspaceId },
  children,
}: Props) => {
  const auth = await onAuthenticateUser();
  // Check if user has any workspaces
  if (!auth.user?.workspace || !Array.isArray(auth.user.workspace) || !auth.user.workspace.length) {
    redirect("/auth/sign-in");
  }

  const hasAccess = await verifyAccessToWorkspace(workspaceId);

  if (hasAccess.status !== 200) {
    redirect(`/dashboard/${auth.user.workspace[0].id}`);
  }

  if (!hasAccess.data?.workspace) return null;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["workspace-folders"],
    queryFn: () => getWorkspaceFolders(workspaceId),
  });
  await queryClient.prefetchQuery({
    queryKey: ["user-videos"],
    queryFn: () => getAllUserVideos(workspaceId),
  });
  await queryClient.prefetchQuery({
    queryKey: ["user-workspaces"],
    queryFn: () => getWorkSpaces(),
  });
  await queryClient.prefetchQuery({
    queryKey: ["user-notification"],
    queryFn: () => getNotification(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex">
        <Sidebar activeWorkspaceId={workspaceId} />
        <div className=" w-full pt-28 p-6 overflow-y-scroll overflow-x-hidden ">
          <GlobalHeader workspace={hasAccess.data.workspace} />
          <div className="mt-4">
            {children}
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default workspaceLayout;
