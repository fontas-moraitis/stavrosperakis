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

const Item = ({ params }: { params: { itemId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [collectionItem, setCollectionItem] = useState<CollectionItem>();
  const [currentImage, setCurrentImage] = useState<string>();
  const [isItemInCart, setIsItemInCart] = useState(false);

  const handleAddToCart = (item: CollectionItem) => {
    const currentStore = sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')!) : [];

    const payload = [...currentStore, item];
    sessionStorage.setItem('cart', JSON.stringify(payload));
    setIsItemInCart(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getPageData(query);
        sessionStorage.setItem('collectionItems', JSON.stringify(data.PageItem.content.body));
        setCollectionItem(data.PageItem.content.body.find((item: any) => item._uid === params.itemId));
      } catch(error) {
        console.error('error from item', error);
      } finally {
        setLoading(false);
      }
    }

    if (sessionStorage.getItem('collectionItems')) {
      let items = JSON.parse(sessionStorage.getItem('collectionItems')!);
      setCollectionItem(items.find((item: CollectionItem) => item._uid === params.itemId));
      setLoading(false);
    } else {
      fetchData();
    }
  }, [params.itemId]);

  useEffect(() => {
    setCurrentImage(collectionItem?.additionalImages[0]?.filename)
  }, [collectionItem]);

  useEffect(() => {
    if (sessionStorage.getItem('cart')) {
      let itemExists = JSON.parse(sessionStorage.getItem('cart')!).find((item: CollectionItem) => item._uid === collectionItem?._uid);
      setIsItemInCart(itemExists);
    }
  }, [collectionItem?._uid])

  if (loading) {
    return <div className="w-screen h-screen flex items-center justify-center">loading...</div>
  }

  return (
    <div className="mt-[120px] flex flex-col md:flex-row gap-1 lg:justify-center mb-6">
      <div className="flex flex-row md:flex-col w-screen md:w-auto md:h-[620px] overflow-x-scroll no-scrollbar gap-1 cursor-pointer md:justify-between shrink-0">
        {collectionItem?.additionalImages.map((image) => {
          return (
            <div key={image.filename} className="image-bg w-[200px] h-[200px] relative shrink-0">
              <Image
                src={`https:${image.filename}`}
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
      <div className='image-bg w-auto h-[420px] md:w-[620px] sm:h-[620px] relative shrink-0'>
        {currentImage && <Image
          src={`https:${currentImage}`}
          alt={''}
          sizes='620px 100vw'
          fill
          style={{ objectFit: 'cover', backgroundPosition: 'center center' }}
          priority
        />}
      </div>
      <div className="sm:max-w-xs px-4 mt-4 lg:mt-0 lg:ml-4 flex flex-col gap-4 justify-center lg:px-0">
        <p className="text-5xl sm:mb-4">{collectionItem?.prodTitle}</p>
        <p>{collectionItem?.prodDescription}</p>
        <div>
          <p className="font-semibold text-lg mb-2">Details</p>
          <p>
            Dimensions: 
            <span className="font-numeric ml-2">{collectionItem?.prodDimensions} cm</span>
          </p>
          <p>
            Weight:
            <span className="font-numeric ml-2">{collectionItem?.prodWeight} kg</span>
          </p>
          <p>
            <span className="mr-1">Price:</span>
            <span className='font-numeric ml-2'>
              {collectionItem?.prodPrice && new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'EUR' }).format(Number(collectionItem?.prodPrice))}
            </span>
            <span className="italic ml-2 text-sm">(per item)</span>
          </p>
          <button
            className="hover:bg-neutral-100 hover:text-neutral-900 border-neutral-700 mt-6 sm:mt-10 border-2 p-2 align-self-end bg-neutral-900 text-neutral-50 active:scale-95 disabled:bg-neutral-400 disabled:border-neutral-400 disabled:pointer-events-none"
            onClick={() => handleAddToCart(collectionItem!)}
            disabled={isItemInCart}
          >
            {isItemInCart ? 'Item already in cart' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  )

};

export default Item;