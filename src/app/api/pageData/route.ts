import { NextResponse, NextFetchEvent, NextRequest } from 'next/server';

export const runtime = 'edge';

const fetchUrl = `https://gapi.storyblok.com/v1/api`;

export async function POST(
  request: NextRequest,
  context: NextFetchEvent,
) {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Token": process.env.STORYBLOK_PUBLIC_KEY!,
    },
    body: request.body,
    next: { revalidate: 20 },
  };

  try {
    const response = await fetch(fetchUrl, fetchOptions);

    if (!response.ok) return NextResponse.json({status: 500, message: response.json() });

    const { data } = await response.json();

    if (data) {
      return NextResponse.json({
        status: 200,
        incomingUrl: request.url,
        data
      });
    }
  } catch (error) {
    return NextResponse.error();
  }
}