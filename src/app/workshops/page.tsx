import AppFooter from '@/components/AppFooter';
import Image from 'next/image';
import callStoryblok from "src/utils/storyblokApi";
import msg from '../../locales/msg.json';

const query = `
  query {
    PageItem(id: "workshops") {
      content {
        body
      }
    }
  }
`
export const metadata = {
  title: msg.metadata.title,
  description: msg.metadata.descriptionWorkshops,
  keywords: 'pottery, sculpture, art, artist, Athens, Greece, Stavros Perakis',
  viewport: 'width=device-width, initial-scale=1.0, viewport-fit=cover',
  themeColor: '#f5f5f5',
  icons: {
    icon: '/sum.png',
  }
};

const Workshops = async () => {
  const { data } = await callStoryblok(query);
  let { image, title, description } = data.PageItem.content.body[0];

  return (
    <>
    <div className="mt-[120px] md:mx-auto flex flex-col items-center gap-8 mb-6">
      <h2 className='text-3xl md:text-5xl mx-4 md:col-span-2 text-center md:mb-8'>
        { msg.workshops.title }
      </h2>
      <div className='grid gap-6 lg:gap-10 grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 md:w-[80%] xl:w-[70%]'>
        <div className='relative h-full image-bg'>
          <Image
            src={`https:${image}`}
            alt={msg.workshops.title}
            sizes='420px'
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className='flex flex-col gap-2 justify-center px-8'>
          <p className='text-2xl font-semibold'>
            { title }
          </p>
          <p className='text-neutral-800'>
            { description }
          </p>
          <a href="tel:+306977086072" className='bg-neutral-800 rounded-md text-center mt-4 text-white p-2'>
            { msg.buttons.workshopContact }
          </a>
        </div>
      </div>
    </div>
    <AppFooter />
    </>
  )
};

export default Workshops;