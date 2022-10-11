import { IonCard, IonIcon, IonItem, IonLabel, IonLoading, IonProgressBar, IonSpinner } from '@ionic/react';
import { trashBinOutline } from 'ionicons/icons';
import { useState } from 'react';
import { IRuleBase } from 'rules/RuleBase';
import { ActionType, useStore } from 'stores/store';
import './Rule.css';
interface IRuleProps {
  rule: IRuleBase;
}
const Rule: React.FC<IRuleProps> = ({ rule }) => {
  const { state, dispatch } = useStore();
  const [deleting, updateDeleting] = useState(false);

  // console.log('🚀 ~ file: Rule.tsx ~ line 15 ~ processing', processing);

  return (
    <IonCard class="rule-item">
      <IonItem>
        <IonLabel>{rule.getDescription()}</IonLabel>
        {deleting ? (
          <IonSpinner color="primary" name="circular"></IonSpinner>
        ) : (
          <IonIcon
            icon={trashBinOutline}
            slot="end"
            onClick={() =>
              //loadindicator
              //calc with async await
              //dispatch
              //hide load indicator
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
