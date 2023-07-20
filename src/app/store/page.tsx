'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import ContactForm from '@/components/ContactForm';
import AppFooter from "@/components/AppFooter";
import { CollectionItem } from "src/types";

const Store: React.FC = () => {
  const [cart, setCart] = useState([]);
  const [showingForm, setShowingForm] = useState(false);

  const handleRemoveItem = (itemId: string) => {
    const updatedCart = cart.filter((item: CollectionItem) => item._uid !== itemId);

    setCart(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  useEffect(() => {
    if (sessionStorage.getItem('cart')) {
      setCart(JSON.parse(sessionStorage.getItem('cart')!));
    }
  }, []);

  return (
    <>
    <div className="mt-[120px] md:mx-auto mb-6 flex flex-col items-center">
      <h2 className='text-3xl md:text-5xl mx-4 text-center mb-6'>Cart</h2>
      <p className='max-w-lg px-2 text-center mb-10 text-sm text-neutral-800'>
        Availabiliy of items can not be guranteed, please check the list bellow and when
        ready contact the artist with your details.
      </p>
      {
        cart.length ? 
        cart.map((item: CollectionItem) => {
          return (
            <div key={item._uid} className="flex items-center w-full px-6 gap-4 max-w-3xl odd:bg-neutral-200 py-4 overflow-hidden">
              <div className="image-bg w-[60px] h-[60px] relative shrink-0">
                <Image
                 src={`https:${item.additionalImages[0].filename}`}
                 fill
                 alt={item.prodTitle}
                 priority
                />
              </div>
              <span className="text-sm">{item.prodTitle.toUpperCase()}</span>
              <div className="font-numeric grow text-right whitespace-nowrap">
                <span>
                  {item?.prodPrice && new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'EUR' }).format(Number(item.prodPrice))}
                </span>
                <button
                  className="ml-6 hover:fill-red-700 hover:text-red-700"
                  onClick={() => handleRemoveItem(item._uid)}
                >
                  x
                </button>
              </div>
            </div>
          )
        }) :
        <div>your cart is empty</div>
      }
      <button 
        className="w-full mt-auto sm:w-fit sm:mt-10 border-2 border-neutral-900 px-4 py-4 bg-neutral-900 text-neutral-50 hover:bg-neutral-50 hover:text-neutral-900 active:scale-95"
        disabled={!cart.length}
        onClick={() => setShowingForm(true)}
      >
        Contact artist with query
      </button>
      { showingForm && <ContactForm setShowingForm={setShowingForm} /> }
    </div>
    <AppFooter />
    </>
  )
};

export default Store;