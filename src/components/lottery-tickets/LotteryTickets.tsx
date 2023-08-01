import LotteryDraw from 'components/lottery-draw/LotteryDraw';
import BallEditModal from 'components/modals/BallEditModal';
import useModal from 'hooks/useModal';
import { useState } from 'react';
import { LotteryDrawModel } from 'types/lottery-draw';

interface LotteryTicketsProps {
  draws: LotteryDrawModel[];
  onBallClick: (number: number, isExtra: boolean, index: number, seriesIndex: number) => void;
}

const LotteryTickets: React.FC<LotteryTicketsProps> = ({ draws, onBallClick }) => {
  return (
    <>
      {draws.map((draw, seriesIndex) => (
        <LotteryDraw
          key={seriesIndex}
          draw={draw}
          onBallClick={(number, isExtra, index) => onBallClick(number, isExtra, index, seriesIndex)}
        />
      ))}
    </>
  );
};

export default LotteryTickets;
