import callStoryblok from 'src/utils/storyblokApi';
import { ImgGallery } from '@/components/index.js';

type HomeContentImage = { _uid: string; image: string; title: string, subTitle: string };

export const metadata = {
  title: 'Stavros Perakis | Pottery Sculptor in Athens',
  description: 'Stavros Perakis is a pottery sculptor based in Athens. Explore his stunning work and get in touch for commissions or purchases.',
  keywords: 'pottery, sculpture, art, artist, Athens, Greece, Stavros Perakis',
  viewport: 'width=device-width, initial-scale=1.0, viewport-fit=cover',
  themeColor: '#a3a3a3',
  icons: {
    icon: '/favicon.ico',
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
