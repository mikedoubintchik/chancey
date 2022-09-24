import './Ball.css';

interface BallProps {
  num: number;
  color?: string;
}

const Ball: React.FC<BallProps> = ({ num, color }) => {
  color = color ? color : 'brown';
  return (
    <div className="ball-container" style={{ backgroundColor: color }}>
      <div className="ball-number">{num}</div>
    </div>
  );
};

export default Ball;
