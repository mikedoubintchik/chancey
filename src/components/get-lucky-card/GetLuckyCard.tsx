import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonLabel,
  IonLoading,
  IonSpinner,
  IonToolbar,
} from '@ionic/react';
import './GetLuckyCard.css';
import { create, createOutline, createSharp, informationCircle, pencilOutline, time } from 'ionicons/icons';
import Series from 'components/series/Series';
import { RuleEngineClient } from 'rules/RuleEngineClient';
import { useEffect, useState } from 'react';
import { SeriesModel } from 'types/series';
import { first } from 'lodash';

interface GetLuckyCardProps {}

const GetLuckyCard: React.FC<GetLuckyCardProps> = ({}) => {
  const [generatedDrawing, setGeneratedDrawing] = useState<SeriesModel | null>(null);
  const [showLoading, setShowLoading] = useState(true);
  const [firstTime, setFirstTime] = useState(true);

  const generateSingleDrawing = async () => {
    setFirstTime(false);
    setShowLoading(true);
    if (RuleEngineClient.instance.isInitialized) {
      let drawingResponse = await RuleEngineClient.instance.generateDrawings(1);
      if (drawingResponse.drawings.length > 0) {
        setGeneratedDrawing(drawingResponse.drawings[0]);
        setShowLoading(false);
      }
    }
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
            <IonButton onClick={() => {}}>
              <IonIcon slot="icon-only" icon={time}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => {}}>
              <IonIcon slot="icon-only" icon={pencilOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonCardHeader>
      <IonCardContent className="get-lucky-card-content">
        {generatedDrawing && <Series numbers={generatedDrawing.numbers} extra={generatedDrawing.extra}></Series>}
        {firstTime && <IonLabel className="get-lucky-label">Get Lucky and generate your numbers</IonLabel>}
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
    </IonCard>
  );
};

export default GetLuckyCard;
