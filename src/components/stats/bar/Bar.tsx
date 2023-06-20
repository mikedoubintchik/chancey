import { useState } from 'react';
import './Bar.css';
import { motion } from 'framer-motion';

interface BarProps {
  index: number;
  height: number;
  maxVal: number;
  value: number;
  color?: string;
}

const Bar: React.FC<BarProps> = ({ index, height, maxVal, value, color }) => {
  color = color || '#CC9630';
  const [currVal, setCurrVal] = useState<number>(0);
  setTimeout(() => {
    setCurrVal(value);
  }, 200);

  return (
    <div className="bar-container" style={{ height: height * 1.2 + 'px' }}>
      <div className="bar-label-container">
        <div>{currVal}</div>
      </div>
      <motion.div
        className="bar"
        style={{ backgroundColor: color }}
        initial={{ height: '0px' }}
        animate={{ height: (height / maxVal) * currVal + 'px' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: index * 0.05 }}
      ></motion.div>
    </div>
  );
};

export default Bar;
