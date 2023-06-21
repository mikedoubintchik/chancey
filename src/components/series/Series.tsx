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
          <div key={nanoid()} onClick={(event) => handleElementClick(event, number, false, index)}>
            <Ball num={number} />
          </div>
        ))}

        {extra != null && (
          <div onClick={(event) => handleElementClick(event, extra, true, 5)}>
            <Ball num={extra} color="#BD4F46" />
          </div>
        )}
      </div>

      <div className="underline-container">
        <div className="underline" ref={underlineRef}></div>
      </div>
    </div>
  );
};

export default Series;
