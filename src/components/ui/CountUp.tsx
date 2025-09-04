import { useEffect, useRef } from 'react';

import {
  MotionValue,
  useInView,
  useMotionValue,
  useSpring,
} from 'motion/react';

interface CountUpProps {
  to: number;
  from?: number;
  direction?: 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  onStart?: () => void;
  onEnd?: () => void;
}

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  onStart,
  onEnd,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  // Use correct initial value for motionValue
  const initialValue = direction === 'down' ? to : from;
  const motionValue = useMotionValue(initialValue) as MotionValue<number>;

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, {
    damping,
    stiffness,
  }) as MotionValue<number>;

  // Explicitly type useInView return value
  const isInView = Boolean(useInView(ref, { once: true, margin: '0px' }));

  const getDecimalPlaces = (num: number): number => {
    const str = num.toString();
    if (str.includes('.')) {
      const decimals = str.split('.')[1];
      if (decimals && parseInt(decimals, 10) !== 0) {
        return decimals.length;
      }
    }
    return 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = String(direction === 'down' ? to : from);
    }
  }, [from, to, direction]);

  useEffect(() => {
    if (isInView && startWhen) {
      if (typeof onStart === 'function') {
        onStart();
      }

      const timeoutId = window.setTimeout(() => {
        // Safe call: check if .set exists and is a function
        if (
          motionValue &&
          typeof (motionValue as MotionValue<number>).set === 'function'
        ) {
          (motionValue as MotionValue<number>).set(
            direction === 'down' ? from : to
          );
        }
      }, delay * 1000);

      const durationTimeoutId = window.setTimeout(
        () => {
          if (typeof onEnd === 'function') {
            onEnd();
          }
        },
        delay * 1000 + duration * 1000
      );

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(durationTimeoutId);
      };
    }
  }, [
    isInView,
    startWhen,
    motionValue,
    direction,
    from,
    to,
    delay,
    onStart,
    onEnd,
    duration,
  ]);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    // Safe call: check if .on exists and is a function
    if (
      springValue &&
      typeof (springValue as MotionValue<number>).on === 'function'
    ) {
      unsubscribe = (springValue as MotionValue<number>).on(
        'change',
        (latest: number) => {
          if (ref.current) {
            const hasDecimals = maxDecimals > 0;
            const options: Intl.NumberFormatOptions = {
              useGrouping: !!separator,
              minimumFractionDigits: hasDecimals ? maxDecimals : 0,
              maximumFractionDigits: hasDecimals ? maxDecimals : 0,
            };
            const formattedNumber = Intl.NumberFormat('en-US', options).format(
              Number(latest)
            );
            ref.current.textContent = separator
              ? formattedNumber.replace(/,/g, separator)
              : formattedNumber;
          }
        }
      );
    }
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [springValue, separator, maxDecimals]);

  return <span className={className} ref={ref} />;
}
