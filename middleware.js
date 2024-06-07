import { NextResponse } from 'next/server';
import { getUserMeLoader } from './app/data/services/get-user-me-loader.js';

export async function middleware(request) {
  const user = await getUserMeLoader();
  console.log('user', user);
  const currentPath = request.nextUrl.pathname;

  if (currentPath.startsWith('/dashboard') && user.ok === false) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  return NextResponse.next();
}
