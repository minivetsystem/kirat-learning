import { useState } from "react";
import { motion } from "framer-motion";

const TeamCard = ({ member }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => setIsExpanded(!isExpanded);

  return (
    <motion.div
      className="w-full md:w-64 h-80 mx-auto relative cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isHovered ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front Side */}
        <div
          className="absolute w-full h-full overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <img
            src={member.image}
            alt={member.name}
            className="w-full object-cover rounded-tr-2xl rounded-bl-2xl"
          />
          <div className="absolute top-0 left-0 bg-white px-2 py-1">
            <span className="text-blue-600 font-bold text-xl">in</span>
          </div>

          <div className="px-3 pt-5">
            <h3 className="font-extrabold text-sm text-start text-gray-900">
              {member.name}
            </h3>
            <p className="text-xs text-gray-500 text-start">{member.title}</p>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute w-full h-full bg-white flex flex-col rounded-2xl p-4 shadow-lg"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <motion.h3
            className="font-extrabold text-sm text-start text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.4 }}
          >
            {member.name}
          </motion.h3>
          <motion.p
            className="text-xs text-gray-500 text-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {member.title}
          </motion.p>

          {/* Read More / Read Less Description */}
          <div className="overflow-y-auto max-h-60 custom-scrollbar mt-2">
            <motion.p
              className="text-xs text-justify text-gray-700 mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {isExpanded
                ? member.description
                : `${member.description.substring(0, 170)}...`}

              <span
                onClick={toggleDescription}
                className="text-blue-950 font-bold cursor-pointer text-[11px] mt-1"
              >
                {isExpanded ? "Show Less" : "Read More"}
              </span>
            </motion.p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TeamCard;
