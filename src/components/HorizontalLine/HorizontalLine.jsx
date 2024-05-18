// HorizontalLine.js
import React, { useState } from "react";
import styles from "./HorizontalLine.module.css";

const HorizontalLine = () => {
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const rect = e.currentTarget.getBoundingClientRect();

    if (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    ) {
      setMousePosition({ x: clientX - rect.left, y: clientY - rect.top });
      setIsMouseInside(true);
    } else {
      setIsMouseInside(false);
    }
  };

  return (
    <div className={styles.container} onMouseMove={handleMouseMove}>
      {isMouseInside && (
        <div className={styles.line} style={{ top: mousePosition.y }} />
      )}
    </div>
  );
};

export default HorizontalLine;
