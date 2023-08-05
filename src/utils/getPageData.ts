const getPageData = async (query: any) => {
  let baseUrl = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' || process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' ?
    `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000';

  const fetchUrl = `${baseUrl}/api/pageData`;

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 20 },
  };

  try {
    const data = await fetch(fetchUrl, fetchOptions).then((response) =>
      response.json(),
    );
    return data;
  } catch (error) {
    console.log('getPageData', process.env.NEXT_PUBLIC_VERCEL_ENV);
    throw new Error("Could not fetch data!",);
  }
};

export default getPageData;