import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";
import Image from "next/image";

export default function MemorySwipper() {
  const memorySwipperRef = useRef<HTMLDivElement | null>(null);
  const [startAnimation, setStartAnimation] = useState(false);

  const message =
    "Arya, may your special day be as beautiful and radiant as your smile. Wishing you a year filled with boundless joy, unforgettable memories, and all the love your heart can hold. 💖✨";
  const words = message.split(" ");

  useEffect(() => {
    const handleScroll = () => {
      if (memorySwipperRef.current) {
        const sectionTop = memorySwipperRef.current.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight * 0.75) {
          setStartAnimation(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={memorySwipperRef}
      className={`memory-swipper mt-8 w-full max-w-4xl bg-white shadow-lg rounded-lg p-4 flex flex-col md:flex-row items-center mb-8 transition-all duration-1000 ease-out ${
        startAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
      {/* Left Side - Memory Swiper */}
      <div className="w-full md:w-1/2 p-4">
        <Swiper
          modules={[Autoplay, EffectCards]}
          pagination={{ clickable: true }}
          effect="cards"
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          className="rounded-lg shadow-lg w-full">
          {["image2.jpeg", "image3.jpeg", "image1.jpeg"].map((img, index) => (
            <SwiperSlide key={index}>
              <Image
                src={`/${img}`}
                width={300}
                height={300}
                alt={`Memory ${index + 1}`}
                className="rounded-lg w-full max-w-xs mx-auto object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Right Side - Text Content */}
      <div className="special-message w-full md:w-1/2 flex flex-col justify-center p-4 text-gray-700 text-center md:text-left">
        <h2 className="text-2xl font-bold mb-4 text-pink-500">A Special Message for Arya</h2>
        <p className="text-lg leading-relaxed">
          {words.map((word, index) => (
            <span
              key={index}
              className={`inline-block ${startAnimation ? "animate-word-reveal" : "opacity-0"}`}
              style={{ animationDelay: `${index * 0.3}s` }}>
              {word}&nbsp;
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
