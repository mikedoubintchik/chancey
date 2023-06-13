import { IonCard, IonCardContent, IonChip, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { arrowUp } from 'ionicons/icons';
import { IRuleBase } from 'rules/RuleBase';
import { useStore } from 'stores/store';
import { formatPercentage } from 'utils/lottery-utils';
import './FlowSummary.css';

interface IFlowSummaryProps {
  postRuleCombsCount: number;
}
const FlowSummary: React.FC<IFlowSummaryProps> = ({ postRuleCombsCount }) => {
  const { state } = useStore();

  const getChancesView = () => (
    <IonChip color="success" style={{ margin: '0 auto' }}>
      Your chances are improved by {formatPercentage(1 - postRuleCombsCount / state.initialChances)}%
    </IonChip>
  );
  return (
    // <IonCard>
    <IonCard className="rule-item">
      <IonCardContent>
        <IonItem lines="none">
          <IonLabel style={{ whiteSpace: 'unset' }}>
            Your chances to win the lottery are 1:{postRuleCombsCount}!
          </IonLabel>
        </IonItem>
        <IonItem lines="none">
          {postRuleCombsCount > 0 && getChancesView()}
          {postRuleCombsCount < 1 && `Please remove some rules...`}
        </IonItem>
      </IonCardContent>
    </IonCard>

    // </IonCard>
  );
};

export default FlowSummary;
