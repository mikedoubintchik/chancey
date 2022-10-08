import { IonCard, IonGrid, IonIcon, IonItem, IonLabel, IonRow } from '@ionic/react';
import { diamondOutline, infiniteOutline, trashBinOutline } from 'ionicons/icons';
import { IRuleBase } from 'rules/RuleBase';
import { ActionType, useStore } from 'stores/store';
import './FlowSummary.css';
const FlowSummary: React.FC = () => {
  return (
    // <IonCard>
    <IonCard class="rule-item">
      <IonItem>Your chances to win the lotter are AWESOME!</IonItem>
    </IonCard>

    // </IonCard>
  );
};

export default FlowSummary;
