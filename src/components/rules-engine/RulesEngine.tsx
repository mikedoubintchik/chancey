import { IonButton, IonCard, IonIcon, IonLabel, IonRippleEffect } from '@ionic/react';
import useModal from 'hooks/useModal';
import { add, ellipseSharp, infiniteOutline } from 'ionicons/icons';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { IRuleBase } from 'rules/RuleBase';
import { RuleEngineClient } from 'rules/RuleEngineClient';
import { ActionType, useStore } from 'stores/store';
import AddRuleModal from './add-rule-modal/AddRuleModal';
import FlowEnd from './flow-end/FlowEnd';
import FlowSeparator from './flow-separator/FlowSeparator';
import FlowStart from './flow-start/FlowStart';
import FlowSummary from './flow-summary/FlowSummary';
import Rule from './rule/Rule';
import './RulesEngine.css';

interface IRulesEngineProps {}
const RulesEngine: React.FC<IRulesEngineProps> = () => {
  const { state, dispatch } = useStore();
  const [working, setWorking] = useState<boolean>(true);
  // console.log('🚀 ~ file: RulesEngine.tsx ~ line 15 ~ state', state);

  const { isOpen, showModal, hideModal } = useModal();

  const renderRules = (rules: Array<IRuleBase>): ReactElement[] =>
    rules.map((rule: IRuleBase) => (
      <>
        <Rule key={rule.id} rule={rule} />
        <FlowSeparator></FlowSeparator>
      </>
    ));

  const initialize = useCallback(async () => {
    if (RuleEngineClient.instance.isInitialized) {
      setWorking(false);
    } else if (state.historicalData.length > 0) {
      let initResponse = await RuleEngineClient.instance.initializeRuleEngine(state.historicalData);
      dispatch({
        type: ActionType.UPDATE_CHANCES,
        finalChances: initResponse?.cacheSize,
      });
    }
  }, [state]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const renderLoadingScreen = () => {
    return (
      <>
        <div className="loading-container">
          <IonLabel class="loading-label" color="primary">
            Initilizing Rule Engine
          </IonLabel>
          <IonLabel class="flow-start-border loading-icon">
            <IonIcon size="large" icon={infiniteOutline} color="primary" />
          </IonLabel>
        </div>
      </>
    );
  };

  const renderRulesEngine = () => {
    return (
      <div className="rule-engine-root">
        <FlowStart></FlowStart>
        <FlowSeparator></FlowSeparator>
        {state.rules.length > 0 && renderRules(state.rules)}
        <IonCard class="rule-item">
          <IonButton expand="full" onClick={showModal} fill="clear">
            <IonIcon slot="icon-only" icon={add}></IonIcon>
            <IonRippleEffect></IonRippleEffect>
          </IonButton>
        </IonCard>

        <FlowSeparator></FlowSeparator>
        <FlowEnd></FlowEnd>
        <FlowSeparator></FlowSeparator>
        <FlowSummary postRuleCombsCount={state.finalChances}></FlowSummary>
        <AddRuleModal isOpenModal={isOpen} hideModal={hideModal} />
      </div>
    );
  };
  return <>{working ? renderLoadingScreen() : renderRulesEngine()}</>;
};

export default RulesEngine;
