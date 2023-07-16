import Image from 'next/image';
import Link from 'next/link'
import { CollectionItem } from 'src/types';
import callStoryblok from "src/utils/storyblokApi";

const query = `
  query {
    PageItem(id: "collection") {
      content {
        body
      }
    }
  }
`
export const metadata = {
  title: 'Stavros Perakis | Pottery Sculptor in Athens',
  description: 'A collection of pottery and sculptures, handmade by Stavros Perakis',
  keywords: 'workshops, pottery, sculpture, art, artist, Athens, Greece, Stavros Perakis',
  viewport: 'width=device-width, initial-scale=1.0, viewport-fit=cover',
  themeColor: '#f5f5f5',
  icons: {
    icon: '/sum.png',
  }
};

type ComposedItem = {
  uid: string,
  image: string,
  title: string,
  price: string,
}

const Collection = async () => {
  const { data } = await callStoryblok(query);

  let collectionItems = data?.PageItem.content.body.map((item: CollectionItem) => {
    return ({
      uid: item._uid,
      image: item.additionalImages[0].filename,
      title: item.prodTitle,
      price: item.prodPrice,
    })
  })

  return (
    <div className="mt-[120px] md:mx-auto mb-6 flex flex-col items-center">
      <h2 className='text-3xl md:text-5xl mx-4 text-center mb-10 md:mb-20'>
        A journey in form
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 grid-cols-1">
        {
          collectionItems.map((item: any, idx: number) => {
            return (
              <Link href={`/collection/${item.uid}`} key={item.uid} className='relative image-bg'>
                <Image
                  src={`https://${item.image}`}
                  alt={item.title}
                  width={320}
                  height={320}
                  style={{ objectFit: 'cover' }}
                  priority
                />
                <div className='flex items-center justify-between mt-1 sm:hidden'>
                  <p>{item.title.toUpperCase()}</p>
                  <p className="font-medium font-numeric">
                    {new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'EUR' }).format(item.price)}
                  </p>
                </div>
                <div className="hidden sm:flex w-full h-full absolute top-0 left-0 backdrop-blur-none hover:backdrop-blur-md duration-500 hover:duration-500 bg-white/40 opacity-0 hover:opacity-100 hover:transition-all hover:cursor-pointer delay-100 transition-all ease-in flex-col items-center justify-center">
                  <p className='text-lg'>{item.title.toUpperCase()}</p>
                  <p className="font-bold font-numeric">
                    {new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'EUR' }).format(item.price)}
                  </p>
                </div>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
};

export default Collection;