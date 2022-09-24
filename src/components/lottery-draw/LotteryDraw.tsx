import Series from 'components/series/Series';
import { LotteryDrawModel } from 'types/lottery-draw';
import './LotteryDraw.css';

interface LotteryDrawProps {
  draw: LotteryDrawModel;
}

const LotteryDraw: React.FC<LotteryDrawProps> = ({ draw }) => {
  return (
    <div className="lottery-draw-container">
      <div>{draw.date.toString()}</div>
      <Series numbers={draw.series.numbers} extra={draw.series.extra}></Series>
    </div>
  );
};

export default LotteryDraw;
