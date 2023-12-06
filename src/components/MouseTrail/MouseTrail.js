import React, { useState, useEffect } from "react";
import "./MouseTrail.css";

const MouseTrail = () => {
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const newDot = { x: clientX, y: clientY, opacity: 1 };
      setTrail((prevTrail) => [...prevTrail, newDot]);
    };

    const fadeOutTrail = () => {
      setTrail((prevTrail) =>
        prevTrail.map((dot) => ({
          ...dot,
          opacity: dot.opacity - 0.01,
        }))
      );
    };

    window.addEventListener("mousemove", handleMouseMove);

    const fadeOutInterval = setInterval(fadeOutTrail, 3);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(fadeOutInterval);
    };
  }, []);

  return (
    <div className="mouse-trail">
      {trail.map((dot, index) => (
        <div
          key={index}
          className="trail-dot"
          style={{ left: dot.x, top: dot.y, opacity: dot.opacity }}
        />
      ))}
    </div>
  );
};

export default MouseTrail;
