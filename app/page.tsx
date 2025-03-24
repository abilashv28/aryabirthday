"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import { Pagination, Autoplay, EffectCards } from "swiper/modules";

export default function Home() {
  const targetDate = new Date("2025-03-28T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [showFireworks, setShowFireworks] = useState(false);

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
      seconds: Math.max(0, Math.floor((difference / 1000) % 60)),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-pink-200 to-pink-400">
      {showFireworks && <div className="fireworks-container"></div>}

      <div className="tag-container">
  🎉 Happy Birthday Arya! 🎂
  <div className="ribbon-bow"></div>
  <div className="ribbon-tail"></div>
</div>
      <div className="mt-6 flex space-x-4 text-white">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div
            key={unit}
            className="bg-pink-800 bg-opacity-80 p-4 rounded-lg shadow-xl border-2 border-white"
          >
            <p className="text-4xl md:text-5xl font-bold">{value}</p>
            <p className="text-lg capitalize">{unit}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 w-full max-w-md">
        <Swiper
          modules={[Pagination, Autoplay, EffectCards]}
          pagination={{ clickable: true }}
          effect="cards"
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          className="rounded-lg shadow-lg"
        >
          {["image1.jpeg", "image2.jpeg", "image3.jpeg"].map((img, index) => (
            <SwiperSlide key={index}>
              <Image
                src={`/${img}`}
                width={300}
                height={300}
                alt={`Memory ${index + 1}`}
                className="rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <p className="mt-8 text-2xl text-white font-semibold leading-relaxed">
  {words.map((word, index) => (
    <span
      key={index}
      className="inline-block animate-word-reveal"
      style={{ animationDelay: `${index * 0.3}s` }}
    >
      {word}&nbsp;
    </span>
  ))}
</p>
    </div>
  );
}
