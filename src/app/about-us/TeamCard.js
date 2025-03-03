import { useState } from "react";
import { motion } from "framer-motion";

const TeamCard = ({ member }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="w-full md:w-64 h-80 mx-auto relative cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative w-full h-full rounded-2xl shadow-lg"
        animate={{ rotateY: isHovered ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front Side */}
        <div
          className="absolute w-full h-full rounded-2xl overflow-hidden bg-gray-300"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 bg-white rounded-br-lg px-2 py-1">
            <span className="text-blue-600 font-bold text-xl">in</span>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute w-full h-full bg-white flex flex-col items-center justify-center rounded-2xl p-4 shadow-lg"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <motion.h3
            className="font-extrabold text-lg text-center text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.4 }}
          >
            {member.name}
          </motion.h3>
          <motion.p
            className="text-sm text-gray-500 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {member.title}
          </motion.p>
          <motion.p
            className="text-sm text-gray-700 mt-2 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {member.description}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TeamCard;
