import React from "react";
import { useUserInfo } from "@/hooks/useInUser";
import { UserPostPage } from "./UserPostPage";
import { UserProfileBlock } from "@/components/common/block";

export function UserPage(props: { userId: number }) {
  const { data: userdata, isLoading, isError } = useUserInfo(props.userId)
  return (
    <div className="flex flex-col pt-[60px]">
      <UserProfileBlock profileImageUrl={userdata?.imageURI} username={userdata?.nickname} email={userdata?.email} message={userdata?.profileMessage ?? '-'} />
      <UserPostPage userId={props.userId} />
    </div>
  )
}