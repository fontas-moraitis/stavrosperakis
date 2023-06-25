import callStoryblok from "src/utils/storyblokApi";

const query = `
  query {
    PageItem(id: "workshops") {
      content {
        body
      }
    }
  }
`
const Workshops = async () => {
  const { data } = await callStoryblok(query);

  return (
    <div className="mt-[120px]">
      <div>{data?.PageItem.content.body[0].title}</div >
      <div>{data?.PageItem.content.body[0].description}</div>
    </div>
  )
};

export default Workshops;