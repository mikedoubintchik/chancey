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
    let parentBBox = (
      event.target as HTMLDivElement
    ).parentElement?.parentElement?.parentElement?.getBoundingClientRect();
    if (parentBBox) {
      if (underlineRef.current) {
        underlineRef.current.style.width = boundingBox.width + 'px';
        underlineRef.current.style.translate = boundingBox.left - parentBBox.left + 'px';
      }
      if (onBallClick) {
        onBallClick(number, isExtra);
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
        {numbers.map((n) => (
          <div key={n} onClick={(event) => handleElementClick(event, n, false)}>
            <Ball num={n} />
          </div>
        ))}
        {/* </div>
      <div className="series-extra-container"> */}
        {extra != null && (
          <div onClick={(event) => handleElementClick(event, extra, true)}>
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
