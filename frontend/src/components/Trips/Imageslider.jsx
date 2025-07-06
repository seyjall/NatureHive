import { useState, useEffect } from "react";

export default function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg">

      <img
        src={images[currentIndex]}
        alt="Slide"
        className="w-screen h-screen object-cover transition-all duration-500"
      />

 

      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

