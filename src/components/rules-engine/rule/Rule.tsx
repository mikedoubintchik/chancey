import {
  IonButton,
  IonCard,
  IonCardContent,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonLoading,
  IonProgressBar,
  IonRow,
  IonSpinner,
} from '@ionic/react';
import { arrowUp, closeOutline, trashBinOutline } from 'ionicons/icons';
import { useState } from 'react';
import { IRuleBase } from 'rules/RuleBase';
import { RuleEngineClient } from 'rules/RuleEngineClient';
import { ActionType, useStore } from 'stores/store';
import { formatPercentage } from 'utils/lottery-utils';
import './Rule.css';
interface IRuleProps {
  rule: IRuleBase;
}
const Rule: React.FC<IRuleProps> = ({ rule }) => {
  const { state, dispatch } = useStore();
  const [deleting, setDeleting] = useState(false);

  // console.log('🚀 ~ file: Rule.tsx ~ line 15 ~ processing', processing);

  return (
    <IonCard class="rule-item">
      {/* <IonItem> */}
      <IonCardContent>
        <IonItem lines="none" color="none">
          <IonLabel color="primary">{rule.name}</IonLabel>
          {deleting ? (
            <IonSpinner color="primary" name="circular"></IonSpinner>
          ) : (
            <IonButton
              fill="clear"
              shape="round"
              slot="end"
              onClick={async () => {
                setDeleting(true);
                let postProcessingResponse = await RuleEngineClient.instance.unprocessRule(rule.id);
                // rule.setPostProcessingChances(postProcessingResponse != null ? postProcessingResponse.cacheSize : 0);
                setDeleting(false);

                dispatch({
                  type: ActionType.REMOVE_RULE,
                  rule: rule,
                  postProcessingSnapshots: postProcessingResponse.ruleSnapShots,
                });
              }}
            >
              <IonIcon
                icon={closeOutline}
                // slot="end"
              ></IonIcon>
            </IonButton>
          )}
        </IonItem>
        <IonItem lines="none" style={{ marginBottom: 10 }}>
          {rule.description}
        </IonItem>
        <IonItem lines="none">
          <IonChip color="success" slot="end">
            <IonIcon icon={arrowUp} class="percentage-arrow-icon"></IonIcon>
            {formatPercentage(rule.postProcessingSnapshot?.percentageOfImprovementFromPrevState)}%
          </IonChip>
        </IonItem>
      </IonCardContent>
    </IonCard>
  );
};

export default Rule;
