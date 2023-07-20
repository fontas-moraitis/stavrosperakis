import { NextResponse, NextFetchEvent, NextRequest } from 'next/server';

export const runtime = 'edge';

const ALLOWED_ORIGINS = ['http://localhost:3000/api/pageData', 'https://www.stavrosperakis.com/api/pageData'];
const fetchUrl = `https://gapi.storyblok.com/v1/api`;

export async function POST(
  request: NextRequest,
  context: NextFetchEvent,
) {
  // if (!ALLOWED_ORIGINS.includes(request.url)) return NextResponse.error();

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
    const { data } = await fetch(fetchUrl, fetchOptions).then((response) =>
      response.json(),
    );
    return NextResponse.json({
      status: 200,
      incomingUrl: request.url,
      data
    });
  } catch (error) {
    // throw new Error("Could not fetch data from Storyblok!");
    return NextResponse.error();
  }
}