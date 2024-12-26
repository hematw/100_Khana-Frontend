import { useState } from "react";
import { FaChevronRight,FaChevronLeft  } from "react-icons/fa6";

type carouselProps = {
    images: string[],
    className?: string
};

const Carousel = ({ className = '', images }: carouselProps) => {
  const [curr, setCurr] = useState(0);

  const goNext = () => {
    setCurr((prev: number) => (prev >= images.length - 1 ? 0 : prev + 1));
  };

  const goPrev = () => {
    setCurr((prev: number) => (prev <= 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="overflow-hidden relative group">
      <div
        className={`flex duration-200 min-w-full ${className}`}
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {images.map((img, index) => (
          <img key={index} src={img} className="min-w-full rounded-xl" />
        ))}
      </div>
      <div className="px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-between opacity-0 w-full group-hover:opacity-100 duration-200">
        <button
          onClick={goPrev}
          className="p-2 h-8 w-8 flex items-center bg-white rounded-full "
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={goNext}
          className="p-2 h-8 w-8 flex items-center bg-white rounded-full "
        >
          <FaChevronRight />
        </button>
      </div>
      <div className="w-full ">
        <div className="m-auto flex justify-center absolute bottom-1 left-0 right-0 shadow-2xl">
          {images.map((item, index) => (
            <span
              key={item}
              onClick={() => setCurr(index)}
              className={`h-2 w-2 rounded-full inline-block mx-1 cursor-pointer duration-200
                    ${curr === index ? "scale-125 bg-gray-100" : "bg-gray-200"}
                    `}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
