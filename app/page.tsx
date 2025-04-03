"use client";

import { useEffect, useState, useRef } from "react";
import { Play, Pause } from "lucide-react";
import Confetti from "react-confetti";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cards";
import MemorySwipper from "./components/MemorySwipper";
import FramerSection from "./components/FramerSection";

export default function Home() {
  const targetDate = new Date("2025-03-28T00:00:00").getTime();
  // const targetDate = new Date().getTime() + 5000;
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showTitleCard, setShowTitleCard] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitleCard(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = targetDate - now;
  
    return difference <= 0
      ? { days: 0, hours: 0, minutes: 0, seconds: 0 }
      : {
          days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
          hours: Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24)),
          minutes: Math.max(0, Math.floor((difference / (1000 * 60)) % 60)),
          seconds: Math.max(0, Math.floor((difference / 1000) % 60)),
        };
  }
  
  useEffect(() => {
    if (
      timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0
    ) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 10000);
    }
  }, [timeLeft]);
  

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
      {/* Confetti Effect */}
      {showConfetti && <Confetti />}

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

      <MemorySwipper />
      <FramerSection />
    </div>
  );
}
