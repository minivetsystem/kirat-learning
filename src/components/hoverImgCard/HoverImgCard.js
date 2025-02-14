import React, { useState } from "react";
import { motion } from "framer-motion";

export default function HoverImgCard({ image, title, content }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex justify-center items-center">
      <div
        className="relative w-80 h-96 overflow-hidden rounded-lg shadow-lg cursor-pointer bg-white"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image Section */}
        <motion.div
          className="absolute top-0 w-full"
          animate={{ height: hovered ? "25%" : "90%" }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-all duration-500"
          />
        </motion.div>

        {/* Content Section */}
        <motion.div
          className="absolute bottom-0 w-full bg-white flex flex-col justify-center items-center p-4"
          animate={{ height: hovered ? "75%" : "0%" }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className={`py-4 w-full font-bold text-lg text-center text-black z-50 bg-transparent ${hovered ? "text-white" : "text-black"}`}
            animate={{ opacity: 1, zIndex: 50, y: hovered ? -40 : -3 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h2>

          {/* Content fades in smoothly */}
          {hovered && (
            <motion.div animate={{ opacity: 1, y: -30 }} transition={{ duration: 0.5 }}>
              <p className="text-sm text-start mt-2 text-black">{content.description}</p>
              <ul className="mt-2 text-start text-sm list-disc pl-4 text-black">
                {content.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
