import './Ball.css';

interface BallProps {
  num: number;
  color?: string;
}

const Ball: React.FC<BallProps> = ({ num, color }) => (
  <div className="ball-container" style={{ backgroundColor: color || '#CC9630' }}>
    <div className="ball-number">{num}</div>
    <div className="ball-number-decor"></div>
  </div>
);

export default Ball;
