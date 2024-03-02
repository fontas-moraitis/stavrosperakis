const callStoryblok = async (query: any) => {
  const fetchUrl = `https://gapi.storyblok.com/v1/api`;

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Token": process.env.storyblokPublic!,
    },
    body: JSON.stringify({ query }),
  };

  try {
    const data = await fetch(fetchUrl, fetchOptions).then((response) =>
      response.json(),
    );
    return data;
  } catch (error) {
    throw new Error("Could not fetch data from Storyblok!");
  }
};

export default callStoryblok;