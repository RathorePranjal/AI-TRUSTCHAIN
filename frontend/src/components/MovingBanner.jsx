import React from 'react';
import { motion } from 'framer-motion';

const MovingBanner = () => {
  const bannerText = "Video Analysis - Text Analysis - Audio Analysis - Code Analysis - Document Analysis - Image Analysis - ";

  return (
    <div className="relative w-full overflow-hidden py-4 bg-white">
      <motion.div
        className="flex"
        animate={{ x: ['0%', '-100%'] }}
        transition={{
          ease: 'linear',
          duration: 30,
          repeat: Infinity,
        }}
      >
        {[...Array(2)].map((_, i) => (
          <span
            key={i}
            className="text-indigo-600 text-3xl font-bold whitespace-nowrap opacity-75 hover:opacity-100 transition-opacity duration-300"
            style={{ textShadow: '0 0 8px rgba(99, 102, 241, 0.7)' }} // Glowing effect for indigo
          >
            {bannerText}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default MovingBanner;
