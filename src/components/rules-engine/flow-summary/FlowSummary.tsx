import { IonCard, IonItem } from '@ionic/react';
import { useStore } from 'stores/store';
import './FlowSummary.css';

interface IFlowSummaryProps {
  postRuleCombsCount: number;
}
const FlowSummary: React.FC<IFlowSummaryProps> = ({ postRuleCombsCount }) => {
  const { state } = useStore();
  return (
    // <IonCard>
    <IonCard class="rule-item">
      <IonItem>Your chances to win the lottery are 1:{postRuleCombsCount}!</IonItem>
      <IonItem>
        This improves your chances by {Math.round((1 - postRuleCombsCount / state.initialChances) * 100)}%
      </IonItem>
    </IonCard>

    // </IonCard>
  );
};

export default FlowSummary;
