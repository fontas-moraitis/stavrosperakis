const getPageData = async (query: any) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 20 },
  };

  try {
    const data = await fetch('/api/pageData', fetchOptions).then((response) =>
      response.json(),
    );

    return data;
  } catch (error) {
    throw new Error("Could not fetch data!",);
  }
};

export default getPageData;