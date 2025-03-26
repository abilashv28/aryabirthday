import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative } from "swiper/modules";
import LoveLetter from "./LoveLetter";

export default function FramerSection() {
  const [animate, setAnimate] = useState(false);
  const framerSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (framerSectionRef.current) {
        const sectionTop = framerSectionRef.current.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight * 0.8) {
          setAnimate(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger once on mount in case it's already visible

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="framer-section relative min-h-screen w-full flex flex-col items-center p-6" ref={framerSectionRef}>
      {/* Two-column layout */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left Swiper */}
        <div className="relative h-[500px] w-[350px] sm:w-[450px] sm:h-[550px] bg-white shadow-lg rounded-lg flex items-center justify-center p-4">
          <div className="absolute inset-0 border-4 border-transparent rounded-lg before:absolute before:content-[''] before:top-0 before:left-0 before:w-full before:h-full before:border-2 before:border-yellow-500 before:rotate-12 before:rounded-lg after:absolute after:content-[''] after:top-0 after:left-0 after:w-full after:h-full after:border-2 after:border-yellow-500 after:-rotate-12 after:rounded-lg"></div>

          <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] bg-gray-200 shadow-lg rounded-lg flex items-center justify-center overflow-hidden">
            <Swiper
              grabCursor={true}
              effect={"creative"}
              creativeEffect={{
                prev: { shadow: true, translate: [0, 0, -400] },
                next: { translate: ["100%", 0, 0] }
              }}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              modules={[EffectCreative, Autoplay]}
              className="w-full h-full flex items-center justify-center">
              {[1, 2, 3, 4, 5].map(num => (
                <SwiperSlide key={num} className="flex items-center justify-center">
                  <img src={`/photo${num}.jpeg`} alt={`Slide ${num}`} className="w-full h-full object-cover rounded-lg" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <LoveLetter />
        {/* Right Swiper (Duplicate) */}
        <div className="relative h-[500px] w-[350px] sm:w-[450px] sm:h-[550px] bg-white shadow-lg rounded-lg flex items-center justify-center p-4">
          <div className="absolute inset-0 border-4 border-transparent rounded-lg before:absolute before:content-[''] before:top-0 before:left-0 before:w-full before:h-full before:border-2 before:border-yellow-500 before:rotate-12 before:rounded-lg after:absolute after:content-[''] after:top-0 after:left-0 after:w-full after:h-full after:border-2 after:border-yellow-500 after:-rotate-12 after:rounded-lg"></div>

          <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] bg-gray-200 shadow-lg rounded-lg flex items-center justify-center overflow-hidden">
            <Swiper
              grabCursor={true}
              effect={"creative"}
              creativeEffect={{
                prev: { shadow: true, translate: [0, 0, -400] },
                next: { translate: ["100%", 0, 0] }
              }}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              modules={[EffectCreative, Autoplay]}
              className="w-full h-full flex items-center justify-center">
              {[6, 7, 8, 9, 5].map(num => (
                <SwiperSlide key={num} className="flex items-center justify-center">
                  <img src={`/photo${num}.jpeg`} alt={`Slide ${num}`} className="w-full h-full object-cover rounded-lg" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      <div className={`card-section w-full flex justify-center mt-12 transition-all duration-1000 ${animate ? "animate-move" : "opacity-0"}`}>
        <div className="w-3/4 bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="w-full md:w-3/4">
            <img src="/wallpaper.jpeg" alt="Romantic Wallpaper" className="w-full h-auto rounded-xl" />
          </div>
          {/* Text Section */}
          <div className="w-full md:w-1/4 flex items-center justify-center mt-4 md:mt-0">
            <div className="text-center">
              <p className="text-xl font-bold text-pink-600">💖 My Love 💖</p>
              <p className="text-lg text-gray-700 mt-2">
                Every moment with you is a beautiful memory. You are my dream, my heart, and my everything. 💕
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
