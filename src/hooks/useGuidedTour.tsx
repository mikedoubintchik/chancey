import { Page } from '@ionic/core';
import { useCallback, useEffect, useState } from 'react';
import { CallBackProps, STATUS } from 'react-joyride';
import { get, getObject, set, setObject } from 'stores/IonicStorage';
import { ActionType, useStore } from 'stores/store';
import { Pages } from 'types/pages';
import { GuidedTour } from 'types/profile';

const useGuidedTour = () => {
  const page = window.location.pathname.substring(1);
  const [steps, setSteps] = useState<[]>([]);
  const [tourActive, setTourActive] = useState<boolean>(false);
  const [run, setRun] = useState<boolean>(false);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const { state, dispatch } = useStore();

  const handleCallback = async (data: CallBackProps) => {
    const { action, index, lifecycle, type, status } = data;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      set('guidedTour', {
        [page]: {
          dismissed: true,
          dateDismissed: new Date(),
        },
      });
      // TODO: save to localStorage so that use
    }

    // if (type === 'step:after' && index === 0 /* or step.target === '#home' */) {
    //   setRun(false);

    //   // navigate('/multi-route/a');
    // } else if (type === 'step:after' && index === 1) {
    //   if (action === 'next') {
    //     setRun(false);
    //     // navigate('/multi-route/b');
    //   } else {
    //     // navigate('/multi-route');
    //     setRun(true);
    //     setStepIndex(0);
    //   }
    // } else if (type === 'step:after' && action === 'prev' && index === 2) {
    //   setRun(false);
    //   // navigate('/multi-route/a');
    // } else if (action === 'reset' || lifecycle === 'complete') {
    //   setRun(false);
    //   setStepIndex(0);
    //   setTourActive(false);
    // }
  };

  const checkTourDismissed = useCallback(async () => {
    const guidedTour = await get('guidedTour');

    if (!guidedTour || (guidedTour && !guidedTour[page]?.dismissed)) setRun(true);
  }, [page]);

  useEffect(() => {
    const introPages: any = {
      home: [
        {
          target: '#profile-menu',
          skip: <strong aria-label="skip">SKIP</strong>,
          showSkipButton: true,
          content: <h2>Let's begin our journey!</h2>,
        },
        {
          target: '#latest-result',
          content: 'This another awesome feature!',
          disableBeacon: true,
        },
      ],
    };

    setSteps(introPages[page]);

    checkTourDismissed();
  }, [checkTourDismissed, page]);

  return { handleCallback, run, steps, stepIndex, tourActive };
};

export default useGuidedTour;
