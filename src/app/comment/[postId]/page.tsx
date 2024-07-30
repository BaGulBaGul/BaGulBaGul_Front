"use client";
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { call } from "@/service/ApiService";
import { SubHeaderCnt } from '@/components/layout/subHeader';
import { CommentMProps } from '@/components/common';
import { CommentDrawer, CommentFooter, Comments, ModifyInput } from '@/components/pages/comment';

export default function Page() {
  const [count, setCount] = useState(0);
  const [isLoading, setLoading] = useState(true)
  // menu drawer
  const [openD, setOpenD] = useState(0);
  const toggleDrawer = (newOpen: number) => () => { setOpenD(newOpen); };

  const [openM, setOpenM] = useState(false);
  const [targetM, setTargetM] = useState<CommentMProps | undefined>();

  const params = useParams()

  const [tmp, setTmp] = useState<any[]>([])
  const [tmpP, setTmpP] = useState<number>();

  const handleDelete = () => {
    let confirmDelete = confirm("댓글을 삭제하시겠습니까?");
    if (targetM && confirmDelete) {
      console.log(targetM.content)
      call(`/api/post/comment/${targetM.postCommentId}`, "DELETE", null)
        .then((response) => {
          console.log(response)
          // props.initialSet.current = false;
          setTmp([])
          setTmpP(undefined)
          setLoading(true)
        }).catch((error) => console.error(error));
    }
  }

  return (
    <>
      <SubHeaderCnt name='글 댓글' cnt={count} />
      <Comments postId={params.postId} setCount={setCount} setOpenD={setOpenD} setTargetM={setTargetM}
        isLoading={isLoading} setLoading={setLoading} tmp={tmp} setTmp={setTmp} setTmpP={setTmpP} tmpP={tmpP} />
      <CommentFooter postId={params.postId} setLoading={setLoading} setTmp={setTmp} setTmpP={setTmpP} />
      <CommentDrawer open={openD} toggleDrawer={toggleDrawer} setOpenM={setOpenM} handleDelete={handleDelete} />
      <ModifyInput open={openM} setOpenM={setOpenM} target={targetM} setTarget={setTargetM} setLoading={setLoading} setTmp={setTmp} setTmpP={setTmpP} />
    </>
  );
}