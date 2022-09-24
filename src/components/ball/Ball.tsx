import './Ball.css';

interface BallProps {
  num: number;
}

const Ball: React.FC<BallProps> = ({ num }) => {
  return (
    <div className="ball-container">
      <div className="ball-number">{num}</div>
    </div>
  );
};

export default Ball;
