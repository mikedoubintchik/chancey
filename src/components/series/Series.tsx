import './Series.css';
import Ball from './../ball/Ball';

interface SeriesProps {
  numbers: number[];
  extra: number;
}

const Series: React.FC<SeriesProps> = ({ numbers, extra }) => {
  return (
    <div className="series-container">
      <div className="series-numbers-container" style={{ width: numbers.length * (48 + 10) }}>
        {numbers.map((n) => (
          <Ball num={n}></Ball>
        ))}
      </div>
      <div className="series-extra-container">{extra > 0 && <Ball num={extra} color="blue"></Ball>}</div>
    </div>
  );
};

export default Series;
