import {
  IonButton,
  IonCard,
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
import { arrowUp, trashBinOutline } from 'ionicons/icons';
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

      <IonGrid>
        <IonRow style={{ alignItems: 'center' }}>
          {/*  */}
          <IonCol>
            <IonLabel>
              <h2>{rule.description}</h2>
            </IonLabel>
          </IonCol>
          <IonCol style={{ flex: '0' }}>
            {deleting ? (
              <IonSpinner color="primary" name="circular"></IonSpinner>
            ) : (
              <IonButton
                fill="clear"
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
                  icon={trashBinOutline}
                  // slot="end"
                ></IonIcon>
              </IonButton>
            )}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol></IonCol>
          <IonCol style={{ flex: '0' }}>
            <IonChip color="success">
              <IonIcon icon={arrowUp} class="percentage-arrow-icon"></IonIcon>
              {formatPercentage(rule.postProcessingSnapshot?.percentageOfImprovementFromPrevState)}%
            </IonChip>
          </IonCol>
        </IonRow>
      </IonGrid>

      {/* </IonItem> */}
      {/* <div>

        </div> */}
    </IonCard>
  );
};

export default Rule;
