import { IonCard, IonItem } from '@ionic/react';
import './FlowSummary.css';

interface IFlowSummaryProps {
  postRuleCombsCount: number;
}
const FlowSummary: React.FC<IFlowSummaryProps> = ({ postRuleCombsCount }) => {
  return (
    // <IonCard>
    <IonCard class="rule-item">
      <IonItem>Your chances to win the lottery are 1:{postRuleCombsCount * 25}!</IonItem>
      <IonItem>This improves your chances by {Math.round((1 - (postRuleCombsCount * 25) / 302575350) * 100)}%</IonItem>
    </IonCard>

    // </IonCard>
  );
};

export default FlowSummary;
