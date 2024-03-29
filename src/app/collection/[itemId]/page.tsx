'use client'

import { useEffect, useState } from "react";
import { CollectionItem } from "src/types";
import Image from 'next/image';
import Link from 'next/link';
import getPageData from "src/utils/getPageData";
import msg from '../../../locales/msg.json';

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
        setCollectionItem(data.PageItem.content.body.find((item: CollectionItem) => item._uid === params.itemId));
      } catch (error) {
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
    return <div className="w-screen h-screen flex items-center justify-center">
      {msg.collectionItem.loading}
    </div>
  }

  return (
    <div className="mt-[120px] flex flex-col lg:flex-row md:items-center gap-1 lg:justify-center mb-6">
      <div className="flex flex-row lg:flex-col w-screen md:w-auto lg:h-[620px] overflow-x-scroll no-scrollbar gap-1 cursor-pointer lg:justify-between shrink-0">
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
          alt=''
          sizes='620px 100vw'
          fill
          style={{ objectFit: 'cover', backgroundPosition: 'center center' }}
          priority
        />}
      </div>
      <div className="lg:max-w-xs px-4 mt-4 lg:mt-0 lg:ml-4 flex flex-col gap-4 justify-center lg:px-0">
        <p className="text-5xl sm:mb-4">{collectionItem?.prodTitle}</p>
        <p>{collectionItem?.prodDescription}</p>
        <div>
          <p className="font-medium text-lg mb-2">
            {msg.collectionItem.details}
          </p>
          <p>
            {msg.collectionItem.dimensions}
            <span className="font-numeric ml-2">{collectionItem?.prodDimensions} cm</span>
          </p>
          <p>
            {msg.collectionItem.weight}
            <span className="font-numeric ml-2">{collectionItem?.prodWeight} kg</span>
          </p>
          <p>
            <span className="mr-1">
              {msg.collectionItem.price}
            </span>
            <span className='font-numeric ml-2'>
              {collectionItem?.prodPrice && new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'EUR' }).format(Number(collectionItem?.prodPrice))}
            </span>
            <span className="italic ml-2 text-sm">
              {msg.collectionItem.perItem}
            </span>
          </p>
          <button
            className="button-main mt-6 sm:mt-10 align-self-end"
            onClick={() => handleAddToCart(collectionItem!)}
            aria-label={msg.buttons.addToCart}
            disabled={isItemInCart}
          >
            {isItemInCart ? msg.buttons.itemInCart : msg.buttons.addToCart}
          </button>
          <Link href={'/collection'} className="button-secondary ml-4">
            {msg.buttons.backToCollection}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Item;