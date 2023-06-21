import Series from 'components/series/Series';
import { LotteryDrawModel } from 'types/lottery-draw';
import { getDefaultLDM } from 'utils/lottery-utils';
import './LotteryDraw.css';

interface LotteryDrawProps {
  draw: LotteryDrawModel | undefined;
  onBallClick?: (number: number, isExtra: boolean, index: number) => void;
}

const LotteryDraw: React.FC<LotteryDrawProps> = ({ draw, onBallClick }) => {
  const finalDraw = draw !== undefined ? (draw as LotteryDrawModel) : getDefaultLDM();

  return (
    <>
      <Series numbers={finalDraw.series.numbers} extra={finalDraw.series.extra} onBallClick={onBallClick} />
    </>
  );
};

export default LotteryDraw;
