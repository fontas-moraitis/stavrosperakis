import Image from 'next/image';
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
  let { image, title, description } = data?.PageItem.content.body[0];

  return (
    <div className="mt-[120px] md:mx-auto mb-6 flex flex-col items-center gap-8">
      <h2 className='text-3xl md:text-5xl mx-4 md:col-span-2 text-center md:mb-8'>Workshops with the artist</h2>
      <div className='grid gap- lg:grid-cols-2 grid-cols-1 grid-rows-2 min-h-screen w-[90%] md:w-[80%] xl:w-[70%]'>
        <div className='relative image-bg'>
          <Image
            src={`https:${image}`}
            alt='workshop with the artist'
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className='flex flex-col gap-2 justify-center'>
          <p className='text-2xl font-semibold'>{title}</p>
          <p className='text-neutral-800'>{description}</p>
        </div>
      </div>
    </div>
  )
};

export default Workshops;