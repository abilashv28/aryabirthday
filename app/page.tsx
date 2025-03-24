"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import { Pagination, Autoplay, EffectCards, EffectCreative } from "swiper/modules";

export default function Home() {
  const targetDate = new Date("2025-03-28T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [showFireworks, setShowFireworks] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const message =
    "Arya, may your special day be as beautiful and radiant as your smile. Wishing you a year filled with boundless joy, unforgettable memories, and all the love your heart can hold. 💖✨";
  const words = message.split(" ");

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = targetDate - now;
    if (difference <= 0) setShowFireworks(true);
    return {
      days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
      hours: Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24)),
      minutes: Math.max(0, Math.floor((difference / (1000 * 60)) % 60)),
      seconds: Math.max(0, Math.floor((difference / 1000) % 60))
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(error => console.log("Autoplay blocked:", error));
    }
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-pink-200 to-pink-400">
      {/* Fireworks Effect (if time reaches zero) */}
      {showFireworks && <div className="fireworks-container"></div>}

      {/* Birthday Tag */}
      <div className="tag-container">
        🎉 Happy 25 th Birthday Arya! 🎂
        <div className="ribbon-bow"></div>
        <div className="ribbon-tail"></div>
      </div>

      {/* Countdown Timer */}
      <div className="mt-6 flex space-x-4 text-white">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="bg-pink-800 bg-opacity-80 p-4 rounded-lg shadow-xl border-2 border-white">
            <p className="text-4xl md:text-5xl font-bold">{value}</p>
            <p className="text-lg capitalize">{unit}</p>
          </div>
        ))}
      </div>

      {/* Music Player */}
      <div className="mt-6 flex items-center space-x-4">
        <audio ref={audioRef} src="/birthday-song.mp3" />
        <button onClick={toggleMusic} className="bg-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform">
          {isPlaying ? <Pause size={32} color="red" /> : <Play size={32} color="green" />}
        </button>
      </div>

      <div className="mt-8 w-full max-w-4xl bg-white shadow-lg rounded-lg p-4 flex flex-col md:flex-row items-center">
        {/* Left Side - Memory Swiper */}
        <div className="w-full md:w-1/2 p-4">
          <Swiper
            modules={[Pagination, Autoplay, EffectCards]}
            pagination={{ clickable: true }}
            effect="cards"
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            className="rounded-lg shadow-lg w-full">
            {[ "image2.jpeg", "image3.jpeg","image1.jpeg"].map((img, index) => (
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
        <div className="w-full md:w-1/2 flex flex-col justify-center p-4 text-gray-700 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-4">A Special Message for Arya</h2>
          <p className="text-lg leading-relaxed">
            {words.map((word, index) => (
              <span key={index} className="inline-block animate-word-reveal" style={{ animationDelay: `${index * 0.3}s` }}>
                {word}&nbsp;
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Floral Background with Curved Layout */}
      <div className="relative h-[600px] bg-white w-full flex flex-wrap justify-around items-center p-4">
        <div className="w-1/4 p-2 transform sm:translate-y-1 translate-y-0">
          <Image src="/floral.webp" width={200} height={200} alt="Image 1" className="rounded-lg" />
        </div>
        <div className="w-1/4 p-2 transform sm:translate-y-20 translate-y-5">
          <Image src="/floral.webp" width={200} height={200} alt="Image 2" className="rounded-lg" />
        </div>
        <div className="w-1/4 p-2 transform sm:-translate-y-10 translate-y-2">
          <Image src="/floral.webp" width={200} height={200} alt="Image 3" className="rounded-lg" />
        </div>
        <div className="w-1/4 p-2 transform sm:-translate-y-1 translate-y-0">
          <Image src="/floral.webp" width={200} height={200} alt="Image 4" className="rounded-lg" />
        </div>

        {/* Centered Swiper Card */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-gray-200 shadow-lg rounded-lg flex items-center justify-center">
          <Swiper
            grabCursor={true}
            effect={"creative"}
            creativeEffect={{
              prev: {
                shadow: true,
                translate: [0, 0, -400]
              },
              next: {
                translate: ["100%", 0, 0]
              }
            }}
            autoplay={{ delay: 2000, disableOnInteraction: false }} // Added Autoplay
            modules={[EffectCreative, Autoplay]} // Added Autoplay module
            className="w-full h-full flex items-center justify-center">
            <SwiperSlide className="flex items-center justify-center text-xl font-bold bg-pink-200">Slide 1</SwiperSlide>
            <SwiperSlide className="flex items-center justify-center text-xl font-bold bg-pink-300">Slide 2</SwiperSlide>
            <SwiperSlide className="flex items-center justify-center text-xl font-bold bg-pink-400">Slide 3</SwiperSlide>
            <SwiperSlide className="flex items-center justify-center text-xl font-bold bg-pink-500">Slide 4</SwiperSlide>
            <SwiperSlide className="flex items-center justify-center text-xl font-bold bg-pink-600">Slide 5</SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
