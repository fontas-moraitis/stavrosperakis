'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import ContactForm from '@/components/ContactForm';
import AppFooter from "@/components/AppFooter";
import { CollectionItem } from "src/types";
import msg from '../../locales/msg.json';

const Store: React.FC = () => {
  const [cart, setCart] = useState([]);
  const [showingForm, setShowingForm] = useState(false);
  const [queryMsg, setQueryMsg] = useState('');

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

  useEffect(() => {
    const composedMessage = cart.map((item: CollectionItem) => ` ${item.prodTitle.toUpperCase()},`);

    setQueryMsg(`${msg.contactForm.prefilledMsg} ${composedMessage.join('')}`);
  }, [cart]);

  return (
    <>
    <div className="mt-[120px] md:mx-auto flex flex-col items-center mb-[10%] px-3">
      <h2 className='text-3xl md:text-5xl mx-4 text-center mb-6'>
        { msg.cart.title }
      </h2>
      <p className='max-w-lg px-2 text-center mb-10 text-sm text-neutral-800'>
        { msg.cart.subTitle }
      </p>
      {
        cart.length && !showingForm ? 
        cart.map((item: CollectionItem) => {
          return (
            <div key={item?._uid} className="flex items-center w-full px-6 gap-4 max-w-3xl odd:bg-neutral-200 even:bg-neutral-50 py-4 overflow-hidden">
              <div className="image-bg w-[60px] h-[60px] relative shrink-0">
                <Image
                 src={`https:${item?.additionalImages[0]?.filename}`}
                 sizes='60px'
                 fill
                 alt={`img - ${item?.prodTitle.toLowerCase()}`}
                 priority
                />
              </div>
              <span className="text-sm">{item?.prodTitle?.toUpperCase()}</span>
              <div className="font-numeric grow text-right whitespace-nowrap">
                <span>
                  {item?.prodPrice && new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'EUR' }).format(Number(item.prodPrice))}
                </span>
                <button
                  className="ml-6 hover:fill-red-700 hover:text-red-700 align-middle"
                  title={msg.buttons.removeItem}
                  aria-label={msg.buttons.removeItem}
                  onClick={() => handleRemoveItem(item._uid)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            </div>
          )
        }) :
        <div>
          { msg.cart.emptyCart }
        </div>
      }
      <div className="mt-6 sm:mt-10 w-full flex items-center justify-end gap-4">
        <button 
          className="button-main"
          disabled={!cart.length}
          aria-label={msg.buttons.contactWithQuery}
          onClick={() => setShowingForm(true)}
        >
          { msg.buttons.contactWithQuery }
        </button>
        <a href={`https://api.whatsapp.com/send?phone=+306977086072&text=${queryMsg}`} rel="noreferrer" target="_blank" className='button-whatsapp'>
          {msg.buttons.whatsappArtist}
        </a>
      </div>
      { showingForm && <ContactForm setShowingForm={setShowingForm} queryMsg={queryMsg} /> }
    </div>
    {!showingForm && <AppFooter />}
    </>
  )
};

export default Store;