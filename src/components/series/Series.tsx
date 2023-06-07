import './Series.css';
import Ball from '../ball/Ball';
import { MouseEvent, useEffect } from 'react';
import { useRef } from 'react';

interface SeriesProps {
  numbers: number[];
  extra: number | null;
  onBallClick?: (number: number, isExtra: boolean) => void;
}

const Series: React.FC<SeriesProps> = ({ numbers, extra, onBallClick }) => {
  const underlineRef = useRef<HTMLDivElement | null>(null);

  const handleElementClick = (event: MouseEvent<HTMLDivElement>, number: number, isExtra: boolean) => {
    let boundingBox = (event.target as HTMLDivElement).getBoundingClientRect();
    if (underlineRef.current) {
      underlineRef.current.style.width = boundingBox.width + 'px';
      underlineRef.current.style.translate = boundingBox.left - boundingBox.width / 2 - 6 + 'px';
    }
    if (onBallClick) {
      onBallClick(number, isExtra);
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
        {numbers.map((n) => (
          <div key={n} onClick={(event) => handleElementClick(event, n, false)}>
            <Ball num={n} />
          </div>
        ))}
      </div>
      <div className="series-extra-container">
        {extra != null && (
          <div onClick={(event) => handleElementClick(event, extra, true)}>
            <Ball num={extra} color="#BD4F46" />
          </div>
        )}
      </div>
      <div className="underline" ref={underlineRef}></div>
    </div>
  );
};

export default Series;
