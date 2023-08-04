import callStoryblok from 'src/utils/storyblokApi';
import { ImgGallery } from '@/components/index.js';
import msg from '../locales/msg.json';

type HomeContentImage = { _uid: string; image: string; title: string, subTitle: string };

export const metadata = {
  title: msg.metadata.title,
  description: msg.metadata.description, 
  keywords: 'pottery, sculpture, art, artist, Athens, Greece, Stavros Perakis',
  viewport: 'width=device-width, initial-scale=1.0, viewport-fit=cover',
  themeColor: '#a3a3a3',
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
