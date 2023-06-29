import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonIcon,
  IonLabel,
  IonSpinner,
  IonToolbar,
} from '@ionic/react';
import Series from 'components/series/Series';
import useModal from 'hooks/useModal';
import { pencilOutline, time } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { RuleEngineClient } from 'rules/RuleEngineClient';
import { ActionType, useStore } from 'stores/store';
import { DrawType, LotteryDrawModel } from 'types/lottery-draw';
import HistoricalGeneratedModal from './historical-generated/HistoricalGeneratedModal';

import './GetLuckyCard.css';

const GetLuckyCard: React.FC<{}> = ({}) => {
  const [generatedDrawing, setGeneratedDrawing] = useState<LotteryDrawModel | null>(null);
  const [showLoading, setShowLoading] = useState(true);

  const history = useHistory();
  const [isOpen, showModal, hideModal] = useModal();
  const { state, dispatch } = useStore();

  const generateSingleDrawing = async () => {
    setShowLoading(true);
    if (RuleEngineClient.instance.isInitialized) {
      const drawingResponse = await RuleEngineClient.instance.generateDrawings(1);
      if (drawingResponse.drawings.length > 0) {
        const generatedGuess = { date: new Date(), series: drawingResponse.drawings[0], type: DrawType.MEGA };
        setGeneratedDrawing(generatedGuess);

        dispatch({
          type: ActionType.ADD_LUCKY_GENERATED_RESULT,
          historicalLuckyGeneratedResults: [generatedGuess],
        });
        setShowLoading(false);
      }
    }
  };

  const handleEditRulesClick = () => {
    history.push('/rules');
  };

  const handleHistoricalGeneratedClick = () => {
    showModal();
  };

  useEffect(() => {
    // generateSingleDrawing();
    setShowLoading(!RuleEngineClient.instance.isInitialized);
  }, [RuleEngineClient.instance.isInitialized]);

  return (
    <IonCard>
      <IonCardHeader style={{ padding: '3px' }}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              onClick={() => {
                handleHistoricalGeneratedClick();
              }}
            >
              <IonIcon slot="icon-only" icon={time}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                handleEditRulesClick();
              }}
            >
              <IonIcon slot="icon-only" icon={pencilOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonCardHeader>
      <IonCardContent className="get-lucky-card-content">
        {generatedDrawing && (
          <Series animate numbers={generatedDrawing.series.numbers} extra={generatedDrawing.series.extra}></Series>
        )}
        {generatedDrawing == null && (
          <IonLabel className="get-lucky-label">Get Lucky and generate your numbers</IonLabel>
        )}
        <IonButton
          onClick={() => {
            generateSingleDrawing();
          }}
          className="my-custom-button"
        >
          {showLoading && <IonSpinner name="circular"></IonSpinner>}
          {!showLoading && <IonLabel>Get Lucky</IonLabel>}
        </IonButton>
      </IonCardContent>

      <HistoricalGeneratedModal isOpenModal={isOpen} hideModal={hideModal}></HistoricalGeneratedModal>
    </IonCard>
  );
};

export default GetLuckyCard;
