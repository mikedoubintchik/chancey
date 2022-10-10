import { IonCard, IonIcon, IonItem, IonLabel, IonLoading, IonProgressBar, IonSpinner } from '@ionic/react';
import { trashBinOutline } from 'ionicons/icons';
import { IRuleBase } from 'rules/RuleBase';
import { ActionType, useStore } from 'stores/store';
import './Rule.css';
interface IRuleProps {
  rule: IRuleBase;
  processing: boolean;
}
const Rule: React.FC<IRuleProps> = ({ rule, processing }) => {
  const { state, dispatch } = useStore();
  console.log('🚀 ~ file: Rule.tsx ~ line 15 ~ processing', processing);

  return (
    <IonCard class="rule-item">
      <IonItem>
        <IonLabel>{rule.getDescription()}</IonLabel>
        {processing ? (
          <IonSpinner color="primary" name="circular"></IonSpinner>
        ) : (
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
        )}
      </IonItem>
    </IonCard>
  );
};

export default Rule;
