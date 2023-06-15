'use client';

import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

type Image = { id: string; src: string; alt: string; subtitle: string };
type ImgGalleryProps = { images: Array<Image> };

const ImgGallery: React.FC<ImgGalleryProps> = ({ images }) => {
  const galleryContainer = useRef(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let currentIndex = images.length - 1;

    const fadeImageOut = () => {
      const currentImage = imageRefs.current[currentIndex];
      const nextIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;

      const nextImage = imageRefs.current[nextIndex];

      gsap.to(currentImage, { opacity: 0, duration: 2 });
      gsap.to(nextImage, { opacity: 1 });

      if (currentIndex === 0) currentIndex = images.length - 1;
      else currentIndex = currentIndex - 1;
    };

    const timerId = setInterval(fadeImageOut, 15000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div ref={galleryContainer} className="w-screen h-screen relative">
      {
        images.map((image, index) => (
          <div key={image.id} className="absolute top-0 left-0 w-full h-full" ref={(el) => (imageRefs.current[index] = el)}>
            <Image
              src={image.src}
              alt={image.alt}
              quality={100}
              fill
              placeholder='blur'
              blurDataURL={image.src}
              draggable='false'
              style={{ objectPosition: 'top center' }}
              className="object-cover sm:object-center brightness-75"
            />
            <div
              data-animation="img-gallery-text"
              className='absolute bottom-[15%] w-full flex flex-col items-center text-slate-100 text-center'
            >
              <p className='text-4xl mb-2 capitalize w-[80%]'>{image.alt}</p>
              <p className='text-sm w-[75%] whitespace-wrap'>{image.subtitle}</p>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default ImgGallery;
