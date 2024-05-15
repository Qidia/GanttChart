import React, { useState } from 'react';
import styles from './HorizontalLine.module.css';

const HorizontalLine = () => {
  const [isMouseInside, setIsMouseInside] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const rect = e.currentTarget.getBoundingClientRect();

    if (clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) {
      setMousePosition({ x: clientX - rect.left, y: clientY - rect.top });
    } else {
      setIsMouseInside(false);
    }
  };

  const handleMouseLeave = () => {
    setIsMouseInside(false);
  };

  const handleMouseEnter = () => {
    setIsMouseInside(true);
  };

  return (
    <div
      className={styles.container}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {isMouseInside && <div className={styles.line} style={{ top: mousePosition.y }} />}
    </div>
  );
};

export default HorizontalLine;
