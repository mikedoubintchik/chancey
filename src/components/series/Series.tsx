import { nanoid } from 'nanoid';
import { MouseEvent, useEffect, useRef } from 'react';
import Ball from '../ball/Ball';
import './Series.css';

interface SeriesProps {
  numbers: number[];
  extra: number | null;
  onBallClick?: (number: number, isExtra: boolean, index: number) => void;
}

const Series: React.FC<SeriesProps> = ({ numbers, extra, onBallClick }) => {
  const underlineRef = useRef<HTMLDivElement | null>(null);

  const handleElementClick = (event: MouseEvent<HTMLDivElement>, number: number, isExtra: boolean, index: number) => {
    let boundingBox = (event.target as HTMLDivElement).getBoundingClientRect();
    if (underlineRef.current) {
      underlineRef.current.style.width = boundingBox.width + 'px';
      underlineRef.current.style.translate = boundingBox.left - boundingBox.width / 2 - 6 + 'px';
    }

    if (onBallClick) {
      onBallClick(number, isExtra, index + 1); // if no index is passed, that means it's extra ball
    }
  };

  useEffect(() => {
    if (underlineRef.current) {
      underlineRef.current.style.translate = '0px';
    }
  }, [numbers]);

  return (
    <div className="series-container">
      <div className="series-numbers-container" style={{ width: numbers.length * (40 + 10) }}>
        {numbers.map((number, index) => (
          <div key={nanoid()} onClick={(event) => handleElementClick(event, number, false, index)}>
            <Ball num={number} />
          </div>
        ))}
      </div>
      <div className="series-extra-container">
        {extra != null && (
          <div onClick={(event) => handleElementClick(event, extra, true, 5)}>
            <Ball num={extra} color="#BD4F46" />
          </div>
        )}
      </div>
      <div className="underline" ref={underlineRef}></div>
    </div>
  );
};

export default Series;
