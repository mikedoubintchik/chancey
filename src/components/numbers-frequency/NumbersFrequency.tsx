import { IonButton, IonCard, IonCardContent, IonCardHeader } from '@ionic/react';
import StatsFrame, { StatsFrameMode } from 'components/stats-frame/StatsFrame';
import { useState } from 'react';
import './NumbersFrequency.css';

interface NumbersFrequencyProps {}

const NumbersFrequency: React.FC<NumbersFrequencyProps> = ({}) => {
  const [_mode, setMode] = useState<StatsFrameMode>(StatsFrameMode.DISPLAY);

  const onModeChangeRequest = (mode: StatsFrameMode) => {
    console.log('onModeChangeRequest');
    setMode(mode);
  };
  return (
    <StatsFrame
      title="Numbers Frequency"
      mode={_mode}
      displayComponent={<div>display</div>}
      infoComponent={<div>info</div>}
      editComponent={<div>edit</div>}
      onModeChangeRequest={(mode: StatsFrameMode) => {
        onModeChangeRequest(mode);
      }}
    ></StatsFrame>
  );
};

export default NumbersFrequency;
