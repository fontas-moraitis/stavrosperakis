import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

type ImageGalleryProps = {
  images: Array<{ id: string; src: string; alt: string }>;
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".image", { scale: 1.05, duration: 4 });

    }, comp); // <- IMPORTANT! Scopes selector text

    return () => ctx.revert(); // cleanup

  }, []); // <- empty dependency Array so it doesn't re-run on every render 
  return (
    <div ref={comp} className="relative overflow-hidden w-screen h-screen">
      {images.map((image, index) => (
        <Image
          key={image.id}
          src={image.src}
          alt={image.alt}
          fill
          className="image absolute object-cover"
        />
      ))}
    </div>
  );
};

export default ImageGallery;
