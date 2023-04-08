import Head from 'next/head'
import { gql } from '@apollo/react-hooks';
import client from '@/lib/storyblok';
import ImgGallery from '@/components/ImgGallery';

const HOME_CONTENT = gql`
  query {
    PageItem(id: "home") {
      name
      content {
        body
      }
    }
  } 
`;

type HomeContentImage = { _uid: string; image: string; title: string };
type HomeContentProps = { homeContent: Array<HomeContentImage> };

export async function getStaticProps() {
  const { data } = await client.query({ query: HOME_CONTENT });

  return {
    props: { homeContent: data.PageItem.content.body },
  }
}


const Home: React.FC<HomeContentProps> = ({ homeContent }) => {

  return (
    <>
      <Head>
        <title>Stavros Perakis | Pottery Sculptor in Athens</title>
        <meta name="description" content="Stavros Perakis is a pottery sculptor based in Athens. Explore his stunning work and get in touch for commissions or purchases." />
        <meta name="keywords" content="pottery, sculpture, art, artist, Athens, Greece, Stavros Perakis" />
        <meta name="author" content="Stavros Perakis" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#fff" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ImgGallery images={homeContent?.map((item: HomeContentImage) => ({ id: item._uid, src: `https:${item.image}`, alt: item.title }))} />
      </main>
    </>
  )
};

export default Home;
