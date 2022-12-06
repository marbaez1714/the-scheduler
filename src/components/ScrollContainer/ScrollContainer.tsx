import { useState, useEffect, useRef } from 'react';
import cn from 'classnames';

import { ScrollContainerProps } from './types';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/solid';

const ScrollContainer = ({ children, className }: ScrollContainerProps) => {
  /******************************/
  /* Refs                       */
  /******************************/
  const containerRef = useRef<HTMLDivElement | null>(null);
  const resizeObserver = useRef(
    new ResizeObserver(() => {
      onScroll();
      onResize();
    })
  );

  /******************************/
  /* State                      */
  /******************************/
  const [opacities, setOpacities] = useState<{
    top: number;
    right: number;
    bottom: number;
    left: number;
  }>({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  const [height, setHeight] = useState(0);

  /******************************/
  /* Effects                    */
  /******************************/
  useEffect(() => {
    onResize();
    onScroll();

    const container = containerRef.current;

    if (container) {
      container.addEventListener('scroll', onScroll);
      resizeObserver.current.observe(container);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', onScroll);
        resizeObserver.current.unobserve(container);
      }
    };
  }, [containerRef.current]);

  /******************************/
  /* Callbacks                  */
  /******************************/
  const onScroll = () => {
    const containerElement = containerRef.current;

    if (containerElement) {
      const {
        scrollHeight,
        scrollTop,
        scrollWidth,
        scrollLeft,
        offsetHeight,
        offsetWidth,
      } = containerElement;

      const contentScrollHeight = scrollHeight - offsetHeight;
      const contentScrollWidth = scrollWidth - offsetWidth;

      // Opacities
      const top = scrollTop / contentScrollHeight;
      const bottom = 1 - top;
      const left = scrollLeft / contentScrollWidth;
      const right = 1 - left;

      setOpacities({ top, right, bottom, left });
    }
  };

  const onResize = () => {
    const { height } = containerRef.current?.getBoundingClientRect() ?? {
      height: 0,
    };
    setHeight(height);
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <div className={cn('relative', className)} ref={containerRef}>
      <div className="sticky top-0 left-0 z-50 w-full">
        <div className="absolute h-full w-full" style={{ height }}>
          {/* Top */}
          {!!opacities.top && (
            <div
              className="pointer-events-none absolute top-0 left-0 z-50 flex h-4 w-full items-center justify-center bg-gradient-to-b from-app-dark/50"
              style={{ opacity: opacities.top }}
            >
              <ChevronUpIcon className="h-4 text-app" />
            </div>
          )}
          {/* Right */}
          {!!opacities.right && (
            <div
              className="pointer-events-none absolute top-0 right-0 z-50 flex h-full w-4 items-center justify-center bg-gradient-to-l from-app-dark/50"
              style={{ opacity: opacities.right }}
            >
              <ChevronRightIcon className="h-4 text-app" />
            </div>
          )}
          {/* Bottom */}
          {!!opacities.bottom && (
            <div
              className="pointer-events-none absolute bottom-0 left-0 z-50 flex h-4 w-full items-center justify-center bg-gradient-to-t from-app-dark/50"
              style={{ opacity: opacities.bottom }}
            >
              <ChevronDownIcon className="h-4 text-app" />
            </div>
          )}
          {/* Left */}
          {!!opacities.left && (
            <div
              className="pointer-events-none absolute top-0 left-0 z-50 flex h-full w-4 items-center justify-center bg-gradient-to-r from-app-dark/50"
              style={{ opacity: opacities.left }}
            >
              <ChevronLeftIcon className="h-4 text-app" />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {children}
    </div>
  );
};

export default ScrollContainer;
