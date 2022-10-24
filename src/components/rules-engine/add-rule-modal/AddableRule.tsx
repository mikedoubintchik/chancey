import { IonButton, IonCard, IonIcon, IonItem, IonLabel, IonRippleEffect } from '@ionic/react';
import Ball from 'components/ball/Ball';
import { informationCircleOutline } from 'ionicons/icons';

import { IRuleBase, RuleTarget } from 'rules/RuleBase';
import { formatPercentage } from 'utils/lottery-utils';

interface IRuleProps {
  rule: IRuleBase;
  onAddRuleRequested(rule: IRuleBase): void;
  onRuleInformationRequested(rule: IRuleBase): void;
}
const AddableRule: React.FC<IRuleProps> = ({ rule, onAddRuleRequested, onRuleInformationRequested }) => {
  const recentCount = 400; //how far back in history to calculate percentage
  return (
    <IonCard onClick={() => onRuleInformationRequested(rule)}>
      <IonItem lines="none">
        <IonLabel color="primary">{rule.name}</IonLabel>
        <IonIcon onClick={() => onRuleInformationRequested(rule)} icon={informationCircleOutline} slot="end" />
      </IonItem>
      <IonItem lines="none">{rule.description}</IonItem>
      <IonItem lines="none">
        <IonLabel color="medium" class="ion-text-wrap">
          This rule applied to {formatPercentage(rule.calculatePercentageForRecentDrawings(recentCount))}% of recent{' '}
          {recentCount} drawings
        </IonLabel>
      </IonItem>
      <IonItem>
        <div className="rule-type-indicator">
          <Ball num={-1} hollow={rule.ruleTarget === RuleTarget.EXTRA} />
          <Ball num={-1} hollow={rule.ruleTarget === RuleTarget.EXTRA} />
          <Ball num={-1} hollow={rule.ruleTarget === RuleTarget.EXTRA} />
          <Ball num={-1} hollow={rule.ruleTarget === RuleTarget.EXTRA} />
          <Ball num={-1} hollow={rule.ruleTarget === RuleTarget.EXTRA} />
          <Ball num={-1} color="#BD4F46" hollow={rule.ruleTarget === RuleTarget.NUMBERS} />
        </div>

        <IonButton
          slot="end"
          shape="round"
          onClick={async (event) => {
            event.stopPropagation();
            onAddRuleRequested(rule);
          }}
        >
          Add Rule
          <IonRippleEffect></IonRippleEffect>
        </IonButton>
      </IonItem>
    </IonCard>
  );
};

export default AddableRule;
