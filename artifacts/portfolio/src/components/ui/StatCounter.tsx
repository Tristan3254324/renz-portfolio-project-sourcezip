import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

export function StatCounter({ 
  value, 
  duration = 2, 
  prefix = '', 
  suffix = '',
  decimals = 0
}: { 
  value: number; 
  duration?: number; 
  prefix?: string; 
  suffix?: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Easing function: easeOutQuart
        const easeOut = 1 - Math.pow(1 - progress, 4);
        
        setCount(value * easeOut);
        
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setCount(value);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}
