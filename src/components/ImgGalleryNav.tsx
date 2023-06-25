type SetCurrentIndex = (index: number) => void;

const ImgGalleryNav = ({ numberOfItems, setCurrentIndex, currentIndex }: { numberOfItems: number; setCurrentIndex: SetCurrentIndex; currentIndex: number }) => {
  const circles = Array(numberOfItems).fill(null).map((_, i) => i);

  return (
    <div className="hidden absolute bottom-10 left-[50%] translate-x-[-50%] sm:flex flex-row-reverse gap-3">
      {
        circles.map((circle) => (
          <button
            key={circle}
            className={`animate-[slideUp_3s_ease-in-out] rounded-full border transition-colors duration-300 ease-in border-neutral-100 w-3 h-3 hover:bg-neutral-100 ${circle === currentIndex ? 'bg-neutral-100' : 'bg-transparent'}`}
            onClick={() => setCurrentIndex(circle)}
          />
        ))
      }
    </div>
  )
};

export default ImgGalleryNav;
