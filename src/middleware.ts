// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { isSigned } from "./service/ApiService";

export default async function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const { origin, pathname } = nextUrl;
  const AUTH_PAGES = ['/mypage'];
  const UNAUTH_PAGES = ['/signin', '/join']
  const DIFF_PAGES = ['/user']

  const token = cookies.get('Access_Token')?.value
  // 로그인 필요한 페이지
  if (AUTH_PAGES.some((page) => pathname.startsWith(page))) {
    if (token !== undefined) {
      const res = await isSigned(token)
      if (res.errorCode === 'C00000') { return NextResponse.next(); }
      else { return NextResponse.redirect(origin + '/signin'); }
    } else {
      return NextResponse.redirect(origin + '/signin');
    }
  }
  // 로그인 없어야하는 페이지
  if (UNAUTH_PAGES.some((page) => pathname.startsWith(page))) {
    if (token !== undefined) {
      const res = await isSigned(token)
      if (res.errorCode === 'C00000') {
        console.log('이미 로그인 되어 있습니다.')
        return NextResponse.redirect(origin);
      } else { return NextResponse.next(); }
    } else {
      console.log('no cookies')
      return NextResponse.next();
    }
  }
  // 본인의 유저페이지 방문 시 마이페이지로 리다이렉트
  if (DIFF_PAGES.some((page) => pathname.startsWith(page))) {
    if (token !== undefined) {
      const res = await isSigned(token)
      if (res.errorCode === 'C00000' && String(res.data.id) === pathname.split('/')[2]) {
        return NextResponse.redirect(origin + '/mypage');
      }
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|.*\svg|.*\png|.*\jpg|.*\jpeg|.*\gif|.*\webp|_next/image|favicon.ico).*)',
  ],
}