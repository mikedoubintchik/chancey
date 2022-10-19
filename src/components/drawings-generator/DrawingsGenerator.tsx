import { IonCard, IonCardContent, IonItem } from '@ionic/react';
import Series from 'components/series/Series';
import { useCallback, useEffect, useState } from 'react';
import { RuleEngineClient } from 'rules/RuleEngineClient';
import { SeriesModel } from 'types/series';
import './DrawingsGenerator.css';

interface DrawingsGeneratorProps {
  count: number;
  showMax: number;
}

const DrawingsGenerator: React.FC<DrawingsGeneratorProps> = ({ count, showMax }) => {
  const [drawings, setDrawings] = useState<Array<SeriesModel>>([]);

  const generateDrawings = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 5000));
    if (RuleEngineClient.instance.isInitialized) {
      let drawingResponse = await RuleEngineClient.instance.generateDrawings(count);
      let newDrawingsState = drawings.concat(drawingResponse.drawings);
      // drawingResponse.drawings.forEach((drawing) => {
      //   newDrawingsState.unshift(drawing);
      // });
      //.concat(drawingResponse.drawings);
      if (newDrawingsState.length > showMax) {
        newDrawingsState.splice(0, 1);
      }
      console.log('🚀 ~ file: DrawingsGenerator.tsx ~ line 20 ~ generateADrawing ~ newDrawingsState', newDrawingsState);
      setDrawings(newDrawingsState);
    }
    // }
  }, [drawings]);

  useEffect(() => {
    generateDrawings();
  }, [generateDrawings]);

  const renderDrawings = () => {
    return [...drawings].reverse().map((drawing) => {
      return <Series key={drawing.numbers.join('-')} numbers={drawing.numbers} extra={drawing.extra} />;
    });
  };
  return (
    <IonCard>
      <IonCardContent>{renderDrawings()}</IonCardContent>
    </IonCard>
  );
};

export default DrawingsGenerator;
