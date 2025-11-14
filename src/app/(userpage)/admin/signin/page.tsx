"use client";
import { SubXHeader } from "@/components/layout/subHeader";
import { call } from '@/service/ApiService';
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    if (!formData.get('id') || !formData.get('pw')) { alert('모든 항목을 입력해주세요.') }
    else {
      console.log(formData)
      call('/api/auth/login/password', "POST", { "loginId": formData.get('id'), "loginPw": formData.get('pw') })
        .then((response) => {
          if (response.errorCode === 'C00000') {
            alert('로그인을 성공했습니다.')
            router.replace('/admin')
          } else {
            alert('로그인을 실패했습니다. 로그인 정보를 다시 확인해주세요.')
          }
        })
    }
  }
  return (
    <div className="flex flex-col justify-between h-screen">
      <SubXHeader />
      <div className="flex flex-col items-center h-full py-[91.42px] gap-[20px]">
        <div className="flex flex-col items-center gap-[20px] pointer-events-none">
          <img src="/logo_s.svg" width='135.07' />
          <div className="flex flex-col items-center gap-[2px]" key="signin-text">
            <p className="text-18 font-semibold">내가 찾던 페스티벌</p>
            <p className="text-14">간편하게 로그인하고 찾으러 떠나볼까요?</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <p>id</p>
          <input name='id' />
          <p>password</p>
          <input name='pw' />
          <button type="submit" className="flex justify-center fixed bottom-0 left-0 right-0 w-full rounded-0 pt-[20px] pb-[35px] bg-primary-blue text-white text-16 disabled:bg-gray3" style={{ zIndex: 100 }}>작성하기</button>
        </form>
      </div>
    </div>
  );
}