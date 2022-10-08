import { IonCard, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { trashBinOutline } from 'ionicons/icons';
import { IRuleBase } from 'rules/RuleBase';
import { ActionType, useStore } from 'stores/store';
import './Rule.css';
interface IRuleProps {
  rule: IRuleBase;
}
const Rule: React.FC<IRuleProps> = ({ rule }) => {
  const { state, dispatch } = useStore();
  console.log('🚀 ~ file: RulesPage.tsx ~ line 15 ~ state', state);

  return (
    <IonCard class="rule-item">
      <IonItem>
        <IonLabel>{rule.getDescription()}</IonLabel>
        <IonIcon
          icon={trashBinOutline}
          slot="end"
          onClick={() =>
            dispatch({
              type: ActionType.REMOVE_RULE,
              id: rule.id,
            })
          }
        ></IonIcon>
      </IonItem>
    </IonCard>
  );
};

export default Rule;
