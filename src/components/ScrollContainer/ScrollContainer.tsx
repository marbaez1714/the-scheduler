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

  /******************************/
  /* State                      */
  /******************************/
  const [opacities, setOpacities] = useState<[number, number, number, number]>([
    0, 0, 0, 0,
  ]);

  /******************************/
  /* Effects                    */
  /******************************/
  useEffect(() => {
    onScroll();

    containerRef.current?.addEventListener('scroll', onScroll);
    return () => {
      containerRef.current?.removeEventListener('scroll', onScroll);
    };
  }, []);

  /******************************/
  /* Callbacks                  */
  /******************************/
  const onScroll = () => {
    const scrollNode = containerRef.current;

    if (scrollNode) {
      const {
        scrollHeight,
        clientHeight,
        offsetHeight,
        scrollTop,
        scrollWidth,
        clientWidth,
        offsetWidth,
        scrollLeft,
      } = scrollNode;

      const ratioY = scrollTop / (scrollHeight - offsetHeight);
      const ratioX = scrollLeft / (scrollWidth - offsetWidth);

      const hasOverflowX = scrollWidth > clientWidth;
      const hasOverflowY = scrollHeight > clientHeight;

      setOpacities([
        ratioY,
        hasOverflowX ? 1 - ratioX : 0,
        hasOverflowY ? 1 - ratioY : 0,
        ratioX,
      ]);
    }
  };

  /******************************/
  /* Render                     */
  /******************************/
  return (
    <div className={cn('relative w-full overflow-hidden flex', className)}>
      {/* Top */}
      {!!opacities[0] && (
        <div
          className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-4 pointer-events-none bg-gradient-to-b from-app-dark/50"
          style={{ opacity: opacities[0] }}
        >
          <ChevronUpIcon className="h-4 text-app" />
        </div>
      )}
      {/* Right */}
      {!!opacities[1] && (
        <div
          className="absolute top-0 right-0 z-50 flex items-center justify-center w-4 h-full pointer-events-none bg-gradient-to-l from-app-dark/50"
          style={{ opacity: opacities[1] }}
        >
          <ChevronRightIcon className="h-4 text-app" />
        </div>
      )}
      {/* Bottom */}
      {!!opacities[2] && (
        <div
          className="absolute bottom-0 left-0 z-50 flex items-center justify-center w-full h-4 pointer-events-none bg-gradient-to-t from-app-dark/50"
          style={{ opacity: opacities[2] }}
        >
          <ChevronDownIcon className="h-4 text-app" />
        </div>
      )}
      {/* Left */}
      {!!opacities[3] && (
        <div
          className="absolute top-0 left-0 z-50 flex items-center justify-center w-4 h-full pointer-events-none bg-gradient-to-r from-app-dark/50"
          style={{ opacity: opacities[3] }}
        >
          <ChevronLeftIcon className="h-4 text-app" />
        </div>
      )}
      {/* Content */}
      <div
        className="w-full max-h-full overflow-auto hide-scroll-bar"
        ref={containerRef}
      >
        {children}
      </div>
    </div>
  );
};

export default ScrollContainer;
