"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import { Autoplay, EffectCards, EffectCreative } from "swiper/modules";
import LoveLetter from "./components/LoveLetter";

export default function Home() {
  const targetDate = new Date("2025-03-28T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [showFireworks, setShowFireworks] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showTitleCard, setShowTitleCard] = useState(false);
  const [animate, setAnimate] = useState(false);
  const framerSectionRef = useRef<HTMLDivElement | null>(null);
  const specialMessageRef = useRef<HTMLDivElement | null>(null);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (specialMessageRef.current) {
        const sectionTop = specialMessageRef.current.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight * 0.75) {
          setStartAnimation(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitleCard(true);
    }, 2000); // Show after 2 seconds

    return () => clearTimeout(timer);
  }, []);

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

      {/* Title Card (Appears After 2 Seconds) */}
      {showTitleCard && (
        <div className="title-card tag-container transition-opacity duration-1000 opacity-100">
          🎉 Happy 25th Birthday Arya! 🎂
          <div className="ribbon-bow"></div>
          <div className="ribbon-tail"></div>
        </div>
      )}
      {/* Video Section - Styled Card */}
      <div className="video-section mt-6 flex flex-col items-center">
        <div className="bg-white p-4 rounded-lg shadow-lg border border-pink-300">
          <video src="/lovehug.mp4" autoPlay loop muted className="w-[320px] md:w-[400px] rounded-lg" />
          <p className="mt-2 text-sm text-gray-700 font-semibold">A special moment for Arya 💖</p>
        </div>
      </div>
      {/* Countdown Timer */}
      <div className="countdown mt-6 flex flex-wrap justify-center gap-3 px-4 text-white">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="bg-pink-800 bg-opacity-80 p-3 rounded-md shadow-md border border-white min-w-[60px] text-center">
            <p className="text-2xl md:text-3xl font-semibold">{value}</p>
            <p className="text-sm capitalize">{unit}</p>
          </div>
        ))}
      </div>

      {/* Music Player */}
      <div className="music-player mt-6 flex items-center space-x-4">
        <audio ref={audioRef} src="/birthday-song.mp3" />
        <button onClick={toggleMusic} className="bg-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform">
          {isPlaying ? <Pause size={32} color="red" /> : <Play size={32} color="green" />}
        </button>
      </div>

      <div className="memory-swipper mt-8 w-full max-w-4xl bg-white shadow-lg rounded-lg p-4 flex flex-col md:flex-row items-center mb-8">
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
        <div
          className="special-message w-full md:w-1/2 flex flex-col justify-center p-4 text-gray-700 text-center md:text-left"
          ref={specialMessageRef}>
          <h2 className="text-2xl font-bold mb-4 text-pink-500">A Special Message for Arya</h2>
          <p className="text-lg leading-relaxed">
            {words.map((word, index) => (
              // <span key={index} className="inline-block animate-word-reveal" style={{ animationDelay: `${index * 0.3}s` }}>
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
                {[1, 2, 3, 4, 5].map(num => (
                  <SwiperSlide key={num} className="flex items-center justify-center">
                    <img src={`/photo${num}.jpeg`} alt={`Slide ${num}`} className="w-full h-full object-cover rounded-lg" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
        <div className="card-section w-full flex justify-center mt-12">
          <div className="w-3/4 bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row">
            {/* Image Section */}
            <div className={`w-full md:w-3/4 transition-all duration-1000 ${animate ? "animate-move" : "opacity-0"}`}>
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
    </div>
  );
}
