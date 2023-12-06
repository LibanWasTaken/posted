import React, { useState, useEffect } from "react";
import "./BlobCursor.css"; // Create a CSS file for styling

const BlobCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoveredText, setHoveredText] = useState(false);
  const delayDuration = 0.2;

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      setPosition((prevPosition) => ({
        x: prevPosition.x + (clientX - prevPosition.x) * delayDuration,
        y: prevPosition.y + (clientY - prevPosition.y) * delayDuration,
      }));
    };

    const handleTextHover = () => {
      setHoveredText(true);
    };

    const handleTextLeave = () => {
      setHoveredText(false);
    };

    window.addEventListener("mousemove", handleMouseMove);

    const hoverTextElement = document.getElementById("hover-text");
    if (hoverTextElement) {
      hoverTextElement.addEventListener("mouseenter", handleTextHover);
      hoverTextElement.addEventListener("mouseleave", handleTextLeave);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (hoverTextElement) {
        hoverTextElement.removeEventListener("mouseenter", handleTextHover);
        hoverTextElement.removeEventListener("mouseleave", handleTextLeave);
      }
    };
  }, []);

  return (
    <div
      className={`blob-cursor ${hoveredText ? "invert-color" : ""}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
};

export default BlobCursor;
