import React from "react";
import { SubTopHeader } from "@/components/layout/subHeader";
import { UserPostPage } from "@/components/pages/user";

export default function Page({ params }: { params: { userId: number } }) {
  return (
    <>
      <SubTopHeader name='프로필' />
      <UserPostPage userId={params.userId} />
    </>
  );
}