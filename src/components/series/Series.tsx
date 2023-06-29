import { nanoid } from 'nanoid';
import { MouseEvent, useEffect, useRef } from 'react';
import Ball from '../ball/Ball';
import './Series.css';
import { motion } from 'framer-motion';
interface SeriesProps {
  numbers: number[];
  extra: number | null;
  onBallClick?: (number: number, isExtra: boolean, index: number) => void;
  animate?: boolean;
}

const Series: React.FC<SeriesProps> = ({ numbers, extra, onBallClick, animate }) => {
  const underlineRef = useRef<HTMLDivElement | null>(null);

  const handleElementClick = (event: MouseEvent<HTMLDivElement>, number: number, isExtra: boolean, index: number) => {
    let boundingBox = (event.target as HTMLDivElement).getBoundingClientRect();
    let parentBBox = (
      event.target as HTMLDivElement
    ).parentElement?.parentElement?.parentElement?.getBoundingClientRect();
    if (parentBBox) {
      if (underlineRef.current) {
        underlineRef.current.style.width = boundingBox.width + 'px';
        underlineRef.current.style.translate = boundingBox.left - parentBBox.left + 'px';
      }
      if (onBallClick) {
        onBallClick(number, isExtra, index + 1); // if no index is passed, that means it's extra ball
      }
    }
  };

  useEffect(() => {
    if (underlineRef.current) {
      underlineRef.current.style.translate = '0px';
    }
  }, [numbers]);

  return (
    <div className="series-container">
      <div className="series-numbers-container">
        {numbers.map((number, index) => (
          <motion.div
            key={'number-' + number + '-' + index}
            onClick={(event) => handleElementClick(event, number, false, index)}
            className="series-item"
            initial={animate ? { opacity: 0, translateY: -60 } : {}}
            animate={animate ? { opacity: 1, translateY: 0 } : {}}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: index * Math.random() * 0.05 }}
          >
            <Ball num={number} />
          </motion.div>
        ))}

        {extra != null && (
          <motion.div
            key={'number-' + extra + '-' + 6}
            onClick={(event) => handleElementClick(event, extra, true, 5)}
            className="series-item-extra"
            initial={animate ? { opacity: 0, translateY: -60 } : {}}
            animate={animate ? { opacity: 1, translateY: 0 } : {}}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 6 * Math.random() * 0.05 }}
          >
            <Ball num={extra} color="#BD4F46" />
          </motion.div>
        )}
      </div>

      <div className="underline-container">
        <div className="underline" ref={underlineRef}></div>
      </div>
    </div>
  );
};

export default Series;
