import callStoryblok from 'src/utils/storyblokApi';
import { ImgGallery } from '@/components/index.js';
import msg from '../locales/msg.json';
import type { Viewport, Metadata } from 'next';

type HomeContentImage = { _uid: string; image: string; title: string, subTitle: string };


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#a3a3a3',
}

export const metadata: Metadata = {
  title: msg.metadata.title,
  description: msg.metadata.description,
  icons: {
    icon: '/sum.png',
  }
};

const query = `
  query {
    PageItem(id: "home") {
      name
      content {
        body
      }
    }
  } 
`;

const fetchHomeContent = async () => {
  const { data } = await callStoryblok(query);

  return data.PageItem.content.body;
}


const Home = async () => {
  const homeContent = await fetchHomeContent();

  return (
    <ImgGallery
      images={
        homeContent?.map((item: HomeContentImage) => ({
          id: item._uid,
          src: `https:${item.image}`,
          alt: item.title,
          subtitle: item.subTitle,
        }))
      }
    />
  )
};

export default Home;
