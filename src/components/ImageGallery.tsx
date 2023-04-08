import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageGalleryItemProps extends ImageData {
  index: number;
  currentImageIndex: number;
};

function ImageGalleryItem({ src, alt, index, currentImageIndex }: ImageGalleryItemProps) {
  const isActive = index === currentImageIndex;

  return (
      <Image
        className={`absolute object-cover inset-0 transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}
        src={src}
        alt={alt}
        fill
        priority
      />
  );
}

interface ImageData {
  id?: number;
  src: string;
  alt: string;
}

const ImageGallery: React.FC<{ images: ImageData[] }> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((index) => (index + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleNextClick = () => {
    setCurrentImageIndex((index) => (index + 1) % images.length);
  };

  const handlePrevClick = () => {
    setCurrentImageIndex((index) =>
      index === 0 ? images.length - 1 : index - 1
    );
  };

  return (
    <div className="object-cover">
      {images.map((image, index) => (
        <ImageGalleryItem
          key={image.id}
          src={image.src}
          alt={image.alt}
          index={index}
          currentImageIndex={currentImageIndex}
        />
      ))}
        <button
          className="absolute top-1/2 left-0"
          onClick={handlePrevClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          className="absolute top-1/2 right-0"
          onClick={handleNextClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
  );
}



export default ImageGallery;
