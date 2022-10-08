import { IonCard, IonGrid, IonIcon, IonItem, IonLabel, IonRow } from '@ionic/react';
import { diamondOutline, filterOutline, trashBinOutline } from 'ionicons/icons';
import { IRuleBase } from 'rules/RuleBase';
import { ActionType, useStore } from 'stores/store';
import './FlowEnd.css';
const FlowEnd: React.FC = () => {
  return (
    // <IonCard>
    <IonGrid class="flow-step">
      <IonRow style={{ justifyContent: 'center' }}>
        <IonLabel class="flow-start-border">
          <IonIcon size="large" icon={filterOutline} color="primary" />
        </IonLabel>
      </IonRow>
    </IonGrid>

    // </IonCard>
  );
};

export default FlowEnd;
