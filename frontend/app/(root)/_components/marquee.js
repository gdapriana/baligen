import React, { useRef, useEffect } from "react";
import {
  motion,
  useSpring,
  useTransform,
} from "framer-motion";
import normalizeWheel from "normalize-wheel";
import { useRafLoop } from "react-use";
import { useWindowSize } from "@react-hook/window-size";

const MarqueeItem = (props) => {
  const { children, speed } = props;

  const itemRef = useRef(null);
  const rectRef = useRef(null);
  const x = useRef(0);
  const [width, height] = useWindowSize();

  const setX = () => {
    if (!itemRef.current || !rectRef.current) {
      return;
    }

    const xPercentage = (x.current / rectRef.current.width) * 100;

    if (xPercentage < -100) {
      x.current = 0;
    }

    if (xPercentage > 0) {
      x.current = -rectRef.current.width;
    }

    itemRef.current.style.transform = `translate3d(${xPercentage}%, 0, 0)`;
  };

  useEffect(() => {
    if (itemRef.current) {
      rectRef.current = itemRef.current.getBoundingClientRect();
    }
  }, [width, height]);

  const loop = () => {
    //Substracts the current x from the speed set by useSpring
    x.current -= speed.get();
    setX();
  };

  const [_, loopStart] = useRafLoop(loop, false);

  useEffect(() => {
    loopStart();
  }, []);

  return (
    <motion.div className="item flex" ref={itemRef}>
      {children}
    </motion.div>
  );
};


export const InteractiveMarquee = (props) => {
  const {
    speed = 0.1,
    threshold = 0.014,
    wheelFactor = 1.8,
    dragFactor = 1.2,
    children,
  } = props;

  const marqueeRef = useRef(null);
  const slowDown = useRef(false);
  const isScrolling = useRef(null);
  const constraintsRef = useRef(null);

  const x = useRef(0);
  const [wWidth] = useWindowSize();
  const speedSpring = useSpring(speed, {
    damping: 40,
    stiffness: 90,
    mass: 5,
  });

  const opacity = useTransform(
    speedSpring,
    [-wWidth * 0.05, 0, wWidth * 0.05],
    [1, 0, 1],
  );
  const skewX = useTransform(
    speedSpring,
    [-wWidth * 0.05, 0, wWidth * 0.05],
    [1, 0, 1],
  );

  const handleOnWheel = (e) => {
    const normalized = normalizeWheel(e);

    x.current = normalized.pixelY * wheelFactor;

    if (isScrolling.current) {
      window.clearTimeout(isScrolling.current);
    }

    isScrolling.current = setTimeout(() => {
      speedSpring.set(speed);
    }, 30);
  };

  const handleDragStart = () => {
    slowDown.current = true;
    marqueeRef.current?.classList.add("drag");
    speedSpring.set(0);
  };

  const handleOnDrag = (_, info) => {
    speedSpring.set(dragFactor * -info.delta.x);
  };

  const handleDragEnd = (_) => {
    slowDown.current = false;
    marqueeRef.current?.classList.remove("drag");
    //rest to the original speed
    x.current = speed;
  };

  const loop = () => {
    /**
     * Do nothing if we're slowing down
     * or
     * Our x is less than the threshold
     *
     * The threshold basically tells how much to speed up
     *
     * Without this stop - x.current will mutiple expodentially
     */
    if (slowDown.current || Math.abs(x.current) < threshold) {
      return;
    }

    /**
     * This portion speeds up the spring until it reaches the `threshold`
     */
    x.current *= 0.66;

    if (x.current < 0) {
      x.current = Math.min(x.current, 0);
    } else {
      x.current = Math.max(x.current, 0);
    }

    //speedSpring sets the speed for the marquee items that gets passed to the item components
    speedSpring.set(speed + x.current);
  };

  useRafLoop(loop);

  return (
    <div className="w-full">
      <motion.div className="bg" style={{ opacity }} ref={constraintsRef} />
      <motion.div
        className="marquee w-full flex"
        ref={marqueeRef}
        style={{ skewX }}
        onWheel={handleOnWheel}
        drag="x"
        dragPropagation={true}
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={handleDragStart}
        onDrag={handleOnDrag}
        onDragEnd={handleDragEnd}
        dragElastic={0.000001} // needs to be > 0 ¯\_(ツ)_/¯
      >
        <MarqueeItem speed={speedSpring}>{children}</MarqueeItem>
      </motion.div>
    </div>
  );
};
