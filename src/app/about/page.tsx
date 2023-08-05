import Image from 'next/image';
import AppFooter from '@/components/AppFooter';
import callStoryblok from "src/utils/storyblokApi";
import msg from '../../locales/msg.json';

const query = `
  query {
    PageItem(id: "about") {
      content {
        body
      }
    }
  }
`

export const metadata = {
  title: msg.metadata.title, 
  description: msg.metadata.descriptionAbout, 
  keywords: 'pottery, sculpture, art, artist, Athens, Greece, Stavros Perakis',
  viewport: 'width=device-width, initial-scale=1.0, viewport-fit=cover',
  themeColor: '#f5f5f5',
  icons: {
    icon: '/sum.png',
  }
};

const About = async () => {
  const { data } = await callStoryblok(query);
  let { title, studio, bio, aboutStudio, image_studio, image_stavros } = data?.PageItem?.content.body[0];

  return (
    <>
    <div className="mt-[120px] md:mx-auto mb-6 flex flex-col items-center gap-4">
      <h2 className='text-3xl md:text-5xl mx-4 md:col-span-2 text-center mb-4 md:mb-8'>
        { msg.about.title }
      </h2>
      <div className='flex flex-col md:flex-row gap-6 md:gap-10 mb-8 w-full px-3 sm:px-0 lg:h-[50vh] lg:w-[80vw] items-center justify-center'>
        <div className="relative image-bg w-full sm:w-[420px] h-[420px] lg:h-[50vh] shrink-0">
          <Image
            src={`https:${image_stavros}`}
            alt={title}
            sizes='420px 100vw'
            fill
            priority
            style={{ 'objectFit': 'cover' }}
          />
        </div>
        <div className='sm:max-w-sm flex flex-col justify-center gap-2 md:gap-4 text-neutral-900'>
          <p className='text-2xl font-medium md:mb-0'>{title}</p>
          <p>{bio}</p>
        </div>
      </div>
      <div className='flex flex-col md:flex-row gap-6 md:gap-10 w-full px-3 sm:px-0 text-left md:text-right lg:h-[60vh] lg:w-[80vw] items-center justify-center'>
        <div className='sm:max-w-sm flex flex-col justify-center gap-2 md:gap-4 text-neutral-900 order-2 md:order-1'>
          <p className='text-2xl font-medium md:mb-0'>{studio}</p>
          <p>{aboutStudio}</p>
        </div>
        <div className="relative image-bg w-full sm:w-[420px] h-[420px] lg:h-[50vh] shrink-0 order-1 md:order-2">
          <Image
            src={`https:${image_studio}`}
            alt={title}
            sizes='420px 100vw'
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
    <AppFooter />
    </>
  )
};

export default About;