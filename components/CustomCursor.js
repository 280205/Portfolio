"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Main inverted cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const mainXSpring = useSpring(cursorX, { damping: 25, stiffness: 700, mass: 0.1 });
  const mainYSpring = useSpring(cursorY, { damping: 25, stiffness: 700, mass: 0.1 });
  
  // Trailing comet dots (hardcoded to obey Hook rules)
  const tx1 = useMotionValue(-100); const ty1 = useMotionValue(-100);
  const tx2 = useMotionValue(-100); const ty2 = useMotionValue(-100);
  const tx3 = useMotionValue(-100); const ty3 = useMotionValue(-100);
  const tx4 = useMotionValue(-100); const ty4 = useMotionValue(-100);
  const tx5 = useMotionValue(-100); const ty5 = useMotionValue(-100);
  
  const tailX = [tx1, tx2, tx3, tx4, tx5];
  const tailY = [ty1, ty2, ty3, ty4, ty5];

  const tailSpringsX = [
    useSpring(tx1, { damping: 20, stiffness: 500, mass: 0.1 }),
    useSpring(tx2, { damping: 24, stiffness: 400, mass: 0.15 }),
    useSpring(tx3, { damping: 28, stiffness: 300, mass: 0.2 }),
    useSpring(tx4, { damping: 32, stiffness: 200, mass: 0.25 }),
    useSpring(tx5, { damping: 36, stiffness: 100, mass: 0.3 })
  ];
  
  const tailSpringsY = [
    useSpring(ty1, { damping: 20, stiffness: 500, mass: 0.1 }),
    useSpring(ty2, { damping: 24, stiffness: 400, mass: 0.15 }),
    useSpring(ty3, { damping: 28, stiffness: 300, mass: 0.2 }),
    useSpring(ty4, { damping: 32, stiffness: 200, mass: 0.25 }),
    useSpring(ty5, { damping: 36, stiffness: 100, mass: 0.3 })
  ];

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches || 'ontouchstart' in window) {
      return;
    }
    setIsMobile(false);

    const moveCursor = (e) => {
      setIsVisible(true);
      // Main cursor is 32x32 (offset by 16)
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      
      // Tail dots are 12x12 (offset by 6)
      tailX.forEach(x => x.set(e.clientX - 6));
      tailY.forEach(y => y.set(e.clientY - 6));
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverStart = (e) => {
      const target = e.target;
      if (
        target.tagName?.toLowerCase() === "a" ||
        target.tagName?.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      }
    };
    
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleHoverStart);
    window.addEventListener("mouseout", handleHoverEnd);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleHoverStart);
      window.removeEventListener("mouseout", handleHoverEnd);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Trailing Comet Tail */}
      {tailSpringsX.map((xSpring, index) => (
        <motion.div
          key={index}
          className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9998] hidden md:block"
          style={{
            x: xSpring,
            y: tailSpringsY[index],
            opacity: isVisible && !isHovering ? 1 - index * 0.15 : 0,
            scale: 1 - index * 0.15,
            backgroundColor: "var(--accent)",
            boxShadow: "0 0 12px var(--accent)",
          }}
          transition={{ opacity: { duration: 0.2 } }}
        />
      ))}
      
      {/* Main Glowing Blue Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[10000] hidden md:block"
        style={{
          x: mainXSpring,
          y: mainYSpring,
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(80, 180, 255, 0.15)" : "transparent",
          border: "1px solid var(--accent)",
          boxShadow: "0 0 15px rgba(80, 180, 255, 0.3)",
        }}
        transition={{ 
          scale: { type: "spring", stiffness: 400, damping: 25 },
          backgroundColor: { duration: 0.2 },
          opacity: { duration: 0.2 }
        }}
      />
    </>
  );
}
