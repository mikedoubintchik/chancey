import { IonCard, IonGrid, IonIcon, IonItem, IonLabel, IonRow } from '@ionic/react';
import { diamondOutline, infiniteOutline, trashBinOutline } from 'ionicons/icons';
import { IRuleBase } from 'rules/RuleBase';
import { ActionType, useStore } from 'stores/store';
import './FlowStart.css';
const FlowStart: React.FC = () => {
  return (
    // <IonCard>
    <IonGrid class="flow-step">
      <IonRow style={{ justifyContent: 'center' }}>
        <IonLabel class="flow-start-border">
          <IonIcon size="large" icon={infiniteOutline} color="primary" />
        </IonLabel>
      </IonRow>
    </IonGrid>

    // </IonCard>
  );
};

export default FlowStart;
