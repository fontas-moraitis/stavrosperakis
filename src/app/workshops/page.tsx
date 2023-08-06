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
      <div className='flex flex-col lg:flex-row gap-6 md:gap-10 mb-8 lg:h-[50vh] lg:w-[80vw] items-center justify-center px-3 md:px-0'>
        <div className='relative image-bg w-full lg:w-[420px] h-[420px] lg:h-[50vh] shrink-0'>
          <Image
            src={`https:${image}`}
            alt={msg.workshops.title}
            sizes='420px'
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className='flex flex-col gap-2 justify-center sm:min-w-[600px]'>
          <p className='text-2xl font-medium'>
            { title }
          </p>
          <p className='text-neutral-800'>
            { description }
          </p>
          <div className='flex mt-4 gap-4'>
            <a href="tel:+306977086072" className='button-main text-center'>
              { msg.buttons.workshopContact }
            </a>
            <a href='https://api.whatsapp.com/send?phone=+306977086072&text=Hi Stavros, I am interested in the workshops' rel="noreferrer" target="_blank" className='button-whatsapp'>
                {msg.buttons.whatsappArtist}
            </a>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
    </>
  )
};

export default Workshops;