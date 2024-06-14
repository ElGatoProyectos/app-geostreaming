import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import React, { useEffect, useState } from "react";
interface NumberProps {
  n: number;
}

const CountNumber = ({ n }: NumberProps) => {
  const [counterOn, setCounterOn] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true, 
    threshold: 0.5, 
  });

  useEffect(() => {
    if (inView) {
      setCounterOn(true);
    }
  }, [inView]);

  const { number } = useSpring({
    from: { number: 0 },
    number: counterOn ? n : 0, 
    delay: 600,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  return (
    <span>
      <animated.span ref={ref}>{number.to((n) => n.toFixed(0))}</animated.span>
    </span>
  );
};

export default CountNumber;
