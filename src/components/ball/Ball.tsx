import './Ball.css';

interface BallProps {
  num: number;
  color?: string;
  hollow?: boolean;
}

const Ball: React.FC<BallProps> = ({ num, color, hollow }) => {
  color = color || '#CC9630';
  if (hollow) {
    color = 'transparent';
  }
  return (
    <div className="ball-container-flat" style={{ backgroundColor: color }}>
      {num > 0 && <div className="ball-number">{num}</div>}
      {/* {num > 0 && <div className="ball-number-decor"></div>} */}
    </div>
  );
};

export default Ball;
