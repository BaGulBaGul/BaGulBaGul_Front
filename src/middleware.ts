// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { call } from "./service/ApiService";

export default async function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const { origin, pathname } = nextUrl;
  const AUTH_PAGES = ['/user/mypage'];
  const UNAUTH_PAGES = ['/signin', '/join']

  const requestHeaders = new Headers(request.headers);
  console.log('path: ', pathname)
  // 로그인 필요한 페이지
  if (AUTH_PAGES.some((page) => pathname.startsWith(page))) {
    if (cookies.get('Access_Token') !== undefined) {
      await call('/api/user/info', "GET", null, cookies.get('Access_Token')?.value)
        .then((response) => {
          if (response.errorCode === 'C00000') {
            // requestHeaders.set("x-user", 'ccc');
            // console.log('&*&*: ', requestHeaders.has('X-User'))
            // return NextResponse.next({ request: { headers: requestHeaders }, });
            return NextResponse.next();
          }
        }).catch((error) => {
          console.log(error)
          return NextResponse.redirect(origin + '/signin');
        });
    } else {
      return NextResponse.redirect(origin + '/signin');
    }
  }

  // 로그인 없어야하는 페이지
  if (UNAUTH_PAGES.some((page) => pathname.startsWith(page))) {
    if (cookies.get('Access_Token') === undefined) {
      return NextResponse.next();
    } else {
      await call('/api/user/info', "GET", null, cookies.get('Access_Token')?.value)
        .then((response) => {
          if (response.errorCode === 'C00000') {
            alert('이미 로그인 되어 있습니다.')
            return NextResponse.redirect(origin + '/');
          }
        }).catch((error) => {
          console.log(error)
          return NextResponse.next();
        });
    }
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|.*\svg|.*\png|.*\jpg|.*\jpeg|.*\gif|.*\webp|_next/image|favicon.ico).*)',
  ],
}