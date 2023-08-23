import useGuidedTour from 'hooks/useGuidedTour';
import { FC, ReactElement } from 'react';
import Joyride from 'react-joyride';

const Walkthrough: FC = (): ReactElement => {
  const { handleCallback, run, steps, stepIndex } = useGuidedTour();

  return (
    <Joyride
      callback={handleCallback}
      continuous
      run={run}
      // stepIndex={stepIndex}
      steps={steps}
      styles={
        {
          // options: {
          //   arrowColor: theme.black,
          //   backgroundColor: theme.black,
          //   primaryColor: theme.colors.purple,
          //   textColor: theme.white,
          // },
        }
      }
    />
  );
};

export default Walkthrough;
