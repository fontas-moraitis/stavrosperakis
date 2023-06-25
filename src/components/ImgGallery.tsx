'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { ImgGalleryNav } from '.';
import useSwipe from 'src/hooks/useSwipe';

type Image = { id: string; src: string; alt: string; subtitle: string };
type ImgGalleryProps = { images: Array<Image> };

const ImgGallery: React.FC<ImgGalleryProps> = ({ images }) => {
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(images.length - 1);

  const decrementIndex = () => setCurrentIndex((currentIndex) => (currentIndex === 0 ? images.length - 1 : currentIndex - 1));
  const incrementIndex = () => setCurrentIndex((currentIndex) => (currentIndex + 1) % images.length);

  const handleSwipeLeft = () => decrementIndex();
  const handleSwipeRight = () => incrementIndex();

  useSwipe({ onSwipeLeft: handleSwipeLeft, onSwipeRight: handleSwipeRight });

  useEffect(() => {
    const decrementIndexInterval: NodeJS.Timeout = setInterval(() => decrementIndex(), 10000);

    return () => clearInterval(decrementIndexInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <div className='h-screen w-screen bg-neutral-500'>
      {
        images.map((image, index) => (
          <div
            ref={(el) => (imageRefs.current[index] = el)}
            key={image.id}
            className={`fixed w-screen h-screen overflow-hidden top-0 left-0 opacity-0 transition-opacity duration-200 ${index === currentIndex ? 'active-image' : ''}`}>
            <Image
              src={image.src}
              alt={image.alt}
              quality={100}
              fill
              draggable='false'
              style={{
                objectPosition: 'top center',
                objectFit: 'cover',
                filter: 'brightness(.70)',
              }}
              className="brightness-70 animate-[scaleUp_20s_ease-in_infinite] pointer-events-none"
            />
            <div
              data-animation="img-gallery-text"
              className='absolute bottom-[15%] w-full flex flex-col items-center text-slate-100 text-center'
            >
              <p className='animate-[slideUp_2s_ease-in-out] text-4xl mb-3 capitalize w-[80%]'>{image.alt}</p>
              <p className='animate-[slideUp_3s_ease-in-out] text-sm w-[75%] whitespace-wrap'>{image.subtitle}</p>
            </div>
          </div>
        ))
      }
      <ImgGalleryNav numberOfItems={images.length} setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} />
    </div>
  );
};

export default ImgGallery;
