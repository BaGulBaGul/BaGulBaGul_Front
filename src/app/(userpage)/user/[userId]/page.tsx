"use client";
import { SubTopHeader } from "@/components/layout/subHeader";
import { UserPage } from '@/components/pages/user'
import React from "react";

export default function Page({ params }: { params: { userId: number } }) {
  return (
    <>
      <SubTopHeader name='프로필' />
      <UserPage userId={params.userId} />
    </>
  );
}