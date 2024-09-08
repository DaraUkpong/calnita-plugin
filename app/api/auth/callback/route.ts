import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let callbackUrl = searchParams.get('callbackUrl');

  // Decode the callbackUrl only once
  if (callbackUrl) {
    try {
      callbackUrl = decodeURIComponent(callbackUrl);
    } catch (error) {
      console.error('Error decoding callbackUrl:', error);
    }
  }
console.log(callbackUrl)
  // Check if the callbackUrl is pointing to the widget page
  if (callbackUrl && callbackUrl.includes('/widget')) {
    return NextResponse.redirect(new URL(callbackUrl, request.url));
  }

  // If no valid callback URL is provided, redirect to the widget page
  return NextResponse.redirect(new URL('/widget', request.url));
}