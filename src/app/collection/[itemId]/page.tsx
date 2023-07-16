'use client'

import { useEffect, useState } from "react";
import { CollectionItem } from "src/types";
import Image from 'next/image';
import getPageData from "src/utils/getPageData";

const query = `
  query {
    PageItem(id: "collection") {
      content {
        body
      }
    }
  }
`

const CollectionItem = ({ params }: { params: { itemId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [collectionItem, setCollectionItem] = useState<CollectionItem>();
  const [currentImage, setCurrentImage] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getPageData(query);
        sessionStorage.setItem('collectionItems', JSON.stringify(data.PageItem.content.body));
        setCollectionItem(data.PageItem.content.body.find((item: any) => item._uid === params.itemId));
      } catch {
        console.error('error')
      } finally {
        setLoading(false);
      }
    }

    if (sessionStorage.getItem('collectionItems')) {
      let items = JSON.parse(sessionStorage.getItem('collectionItems')!);
      setCollectionItem(items.find((item: CollectionItem) => item._uid === params.itemId));
      setLoading(false)
    } else {
      fetchData();
    }
  }, [params.itemId]);

  useEffect(() => {
    setCurrentImage(collectionItem?.additionalImages[0]?.filename)
  }, [collectionItem]);

  if (loading) {
    return <div className="w-screen h-screen flex items-center justify-center">loading...</div>
  }

  return (
    <div className="mt-[120px] flex flex-col md:flex-row gap-1 lg:justify-center mb-6">

      <div className="flex flex-row overflow-x-scroll no-scrollbar md:flex-col gap-1 cursor-pointer md:justify-between shrink-0">
        {collectionItem?.additionalImages.map((image, idx) => {
          return (
            <div key={idx} className="image-bg w-[200px] h-[200px] relative shrink-0">
              <Image
                src={`https://${image.filename}`}
                alt={image.name}
                sizes='200px'
                fill
                priority
                style={{ objectFit: 'cover' }}
                onClick={() => setCurrentImage(image.filename)}
              />
            </div>
          )
        })}
      </div>
      <div className='image-bg w-auto md:w-[620px] h-[620px] relative shrink-0'>
        {currentImage && <Image
          src={`https://${currentImage}`}
          alt={''}
          sizes='620px'
          fill
          style={{ objectFit: 'cover' }}
          priority
        />}
      </div>
      <div className="max-w-xs px-4 mt-4 lg:mt-0 lg:ml-4 flex flex-col gap-4 justify-center lg:px-0">
        <p className="text-5xl mb-4">{collectionItem?.prodTitle}</p>
        <p>{collectionItem?.prodDescription}</p>
        <div>
          <p className="font-medium text-lg mb-2">Details</p>
          <p>dimensions: {collectionItem?.prodDimensions} cm</p>
          <p>weight: {collectionItem?.prodWeight} kg</p>
          <p>
            <span className="mr-1">price:</span>
            <span className='font-numeric'>
              {collectionItem?.prodPrice && new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'EUR' }).format(Number(collectionItem?.prodPrice))}
            </span>
            <span className="italic ml-1 text-sm">(per item)</span>
          </p>
        </div>
      </div>
    </div>
  )

};

export default CollectionItem;