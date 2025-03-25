import { useState } from "react";
import { motion } from "framer-motion";

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex justify-center items-center">
      <motion.div
        className="relative w-[300px] h-[200px] rounded-lg shadow-xl cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isOpen ? 180 : 0 }}
        transition={{ duration: 0.8 }}
        style={{ transformStyle: "preserve-3d" }} // Ensures proper 3D effect
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-red-500 rounded-lg shadow-xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-xl font-bold text-red-500 shadow-lg">
            💌
          </div>
          <p className="mt-4 text-white text-lg font-semibold">Click to Open</p>
        </div>

        {/* Back Side */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-lg"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <h2 className="text-xl font-bold text-red-500">To My Love ❤️</h2>
          <p className="mt-2 text-gray-700 text-center">
            You are the most beautiful part of my life. Every moment with you is magical.
          </p>
          <p className="mt-2 text-gray-700 text-center">I love you forever and always! 💖</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoveLetter;
