import { IonButton, IonCard, IonCardContent, IonCardHeader, IonIcon, IonItem, IonLabel } from '@ionic/react';
import Series from 'components/series/Series';
import { pauseOutline, playOutline } from 'ionicons/icons';
import { useCallback, useEffect, useState } from 'react';
import { RuleEngineClient } from 'rules/RuleEngineClient';
import { useStore } from 'stores/store';
import { SeriesModel } from 'types/series';
import './DrawingsGenerator.css';

interface DrawingsGeneratorProps {
  count: number;
  showMax: number;
}

const DrawingsGenerator: React.FC<DrawingsGeneratorProps> = ({ count, showMax }) => {
  const { state } = useStore();
  const [drawings, setDrawings] = useState<Array<SeriesModel>>([]);
  const [generating, setGenerating] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(5);

  const generateDrawings = useCallback(async () => {
    if (timeLeft > 0) {
      await new Promise((r) => setTimeout(r, 1000));
      setTimeLeft(timeLeft - 1);
    } else {
      if (RuleEngineClient.instance.isInitialized && generating) {
        let drawingResponse = await RuleEngineClient.instance.generateDrawings(count);
        let newDrawingsState = drawings.concat(drawingResponse.drawings);

        if (newDrawingsState.length > showMax) {
          newDrawingsState.splice(0, 1);
        }
        // console.log(
        //   '🚀 ~ file: DrawingsGenerator.tsx ~ line 20 ~ generateADrawing ~ newDrawingsState',
        //   newDrawingsState,
        // );
        setDrawings(newDrawingsState);
      }
      setTimeLeft(5);
    }
  }, [drawings, generating, state, timeLeft]);

  useEffect(() => {
    generateDrawings();
  }, [generateDrawings]);

  const togglePlayMode = () => {
    setGenerating(!generating);
  };

  const renderDrawings = () => {
    return [...drawings].reverse().map((drawing, index) => {
      return (
        <div key={drawing.numbers.join('-')} style={{ opacity: 1 / (1 + index) + 0.25, paddingBottom: 10 }}>
          <Series numbers={drawing.numbers} extra={drawing.extra} />
        </div>
      );
    });
  };
  return (
    <IonCard>
      <IonCardHeader>
        <IonItem lines="none">
          <IonButton onClick={() => togglePlayMode()} fill="clear" shape="round" slot="start">
            <IonIcon icon={generating ? pauseOutline : playOutline} />
          </IonButton>
          {generating && <IonLabel color="primary">Generating next drawing in {timeLeft}s...</IonLabel>}
          {!generating && <IonLabel color="danger">Paused</IonLabel>}
        </IonItem>
      </IonCardHeader>
      <IonCardContent>{renderDrawings()}</IonCardContent>
    </IonCard>
  );
};

export default DrawingsGenerator;
