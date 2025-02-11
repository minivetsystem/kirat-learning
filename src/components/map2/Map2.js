"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { FaLocationDot } from "react-icons/fa6";
import WorldMap from "react-svg-worldmap";

const Map2 = () => {
  const data = [
    { country: "ch", value: '                  Kirat-IT AG                   Jöchlerweg 4, 6340 Baar' }, // china
    { country: "in", value: '                               DK-1016, DLF Galleria, Action Area 1, New Town, Kolkata, West Bengal 700156, India                    604B, Astra North Office, Astra Towers, Major Arterial Road (North Extension), New Town, West Bengal -700161, India'            }, // india
    { country: "ae", value: '             Kirat Information Technology LLC, PO BOX - 111409, Dubai, United Arab Emirates, Phone- +971585960949' }
  ];
  const [datav, setDataV] = useState(data);
  // const containerRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(null);    
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div>
    {" "}
    {windowWidth &&  <WorldMap
      color="#ed7c33"
       size="xxl"
    
      data={datav}
    />}{" "}
  </div>
   
 
  );
};

export default Map2;
