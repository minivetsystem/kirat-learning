"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { FaLocationDot } from "react-icons/fa6";

const Map = () => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: "",
    top: 0,
    left: 0,
    fontSize: "1rem",
  });
  const containerRef = useRef(null);

  const updateTooltipPosition = useCallback((target) => {
    const rect = target.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    setTooltip((prev) => ({
      ...prev,
      top: rect.top - containerRect.top - 110, // Offset above the icon by 20px
      left: rect.left - containerRect.left + rect.width / 2 + 50,
    }));
  }, []);

  const handleMouseEnter = (event, location) => {
    updateTooltipPosition(event.target);
    setTooltip((prev) => ({
      ...prev,
      visible: true,
      content: location,
    }));
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  const updateFontSize = () => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      let fontSize = "1rem";

      if (width < 600) {
        fontSize = "0.75rem"; // Small font size for small containers
      } else if (width >= 600 && width < 1200) {
        fontSize = "1rem"; // Medium font size for mid-sized containers
      } else {
        fontSize = "1.25rem"; // Larger font size for large containers
      }

      setTooltip((prev) => ({ ...prev, fontSize }));
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (tooltip.visible) {
        // Update position of tooltip if visible
        const activeElement = document.querySelector('[data-active="true"]');
        if (activeElement) {
          updateTooltipPosition(activeElement);
        }
      }
      updateFontSize();
    };

    window.addEventListener("resize", handleResize);
    updateFontSize(); // Initial font size update

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [tooltip.visible, updateTooltipPosition]);

  return (
    <div ref={containerRef} className="relative inline-block w-full">
      <img src="/map2.png" alt="Map" className="w-full h-auto" />
      <div
        className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
        style={{ top: "32%", left: "46%" }}
        // onMouseEnter={(e) => handleMouseEnter(e, 'Location 1')}
        onMouseLeave={handleMouseLeave}
        data-active={tooltip.visible ? "true" : "false"}
      >
        <FaLocationDot className="text-primary-orange" />
      </div>
      <div
        className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
        style={{ top: "38%", left: "50%" }}
        onMouseEnter={(e) =>
          handleMouseEnter(
            e,
            <div className="bg-white p-2">
              <p className="font-bold text-primary-midnightBlue text-base">
                Kirat-IT AG
              </p>
              <p className="text-primary-midnightBlue text-xs">
                Jöchlerweg 4, 6340 Baar
              </p>
            </div>
          )
        }
        onMouseLeave={handleMouseLeave}
        data-active={tooltip.visible ? "true" : "false"}
      >
        <FaLocationDot className="text-primary-orange" />
      </div>
      <div
        className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
        style={{ top: "52%", left: "62%" }}
        onMouseEnter={(e) =>
          handleMouseEnter(
            e,
            <div className="bg-white p-2">
              <h3 className="font-bold text-primary-midnightBlue text-base">
                Kirat Information Technology LLC
              </h3>
              <p className="text-primary-midnightBlue text-xs">
                PO BOX - 111409, Dubai, UAE
              </p>
            </div>
          )
        }
        onMouseLeave={handleMouseLeave}
        data-active={tooltip.visible ? "true" : "false"}
      >
        <FaLocationDot className="text-primary-orange" size={24} />
      </div>
      <div
        className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
        style={{ top: "52%", left: "74%" }}
        onMouseEnter={(e) =>
          handleMouseEnter(
            e,
            <div className="bg-white p-2">
              <h3 className="font-bold text-base text-primary-midnightBlue">
                Kolkata, India
              </h3>
              <p className="text-primary-midnightBlue text-xs">
                DLF Galleria, NewTown, 700156-WB
              </p>
              <p className="text-primary-midnightBlue text-xs">
                Astra Towers, NewTown 700161-WB{" "}
              </p>
            </div>
          )
        }
        onMouseLeave={handleMouseLeave}
        data-active={tooltip.visible ? "true" : "false"}
      >
        <FaLocationDot className="text-primary-orange" />
      </div>
      {tooltip.visible && (
        <div
          className="absolute text-white rounded opacity-80 transform -translate-x-1/2"
          style={{
            top: `${tooltip.top}px`,
            left: `${tooltip.left}px`,
            fontSize: tooltip.fontSize,
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default Map;
