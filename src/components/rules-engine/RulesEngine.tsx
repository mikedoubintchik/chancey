import {
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonProgressBar,
  IonRippleEffect,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import Header from 'components/Header';
import SideMenu from 'components/SideMenu';
import useModal from 'hooks/useModal';
import { add, diamondOutline, infiniteOutline, trashBinOutline } from 'ionicons/icons';
import { IRuleBase } from 'rules/RuleBase';
import { ActionType, useStore } from 'stores/store';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import Rule from './rule/Rule';
import AddRuleModal from './add-rule-modal/AddRuleModal';
import FlowStart from './flow-start/FlowStart';
import './RulesEngine.css';
import FlowSeparator from './flow-separator/FlowSeparator';
import FlowEnd from './flow-end/FlowEnd';
import FlowSummary from './flow-summary/FlowSummary';
import { getAllCombinations } from 'utils/combinatorics';
import { SeriesModel } from 'types/series';

interface IRulesEngineProps {}
const RulesEngine: React.FC<IRulesEngineProps> = () => {
  const { state, dispatch } = useStore();
  const [working, setWorking] = useState<boolean>(true);
  // console.log('🚀 ~ file: RulesPage.tsx ~ line 15 ~ state', state);

  const { isOpen, showModal, hideModal } = useModal();

  const renderRules = (): ReactElement[] =>
    state.rules.map((rule: IRuleBase) => (
      <>
        <Rule key={rule.id} rule={rule} />
        <FlowSeparator></FlowSeparator>
      </>
    ));

  let cache = state.cache;
  state.rules.forEach((rule) => {
    // console.log(state.cache.length);
    let postRuleCache = rule.getPostRuleCache();
    if (postRuleCache == null) {
      console.log('filtering cache');
      cache = rule.filter(cache, true);
    } else {
      cache = postRuleCache;
    }
  });

  const initialize = useCallback(async () => {
    await state.ruleEngineClient.initializeRuleEngine(state.historicalData);
    setWorking(false);
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
      <>
        <FlowStart></FlowStart>
        <FlowSeparator></FlowSeparator>
        {renderRules()}
        <IonCard class="rule-item">
          <IonButton expand="full" onClick={showModal} fill="clear">
            <IonIcon slot="icon-only" icon={add}></IonIcon>
            <IonRippleEffect></IonRippleEffect>
          </IonButton>
        </IonCard>

        <FlowSeparator></FlowSeparator>
        <FlowEnd></FlowEnd>
        <FlowSeparator></FlowSeparator>
        <FlowSummary postRuleCombsCount={cache.length}></FlowSummary>
        <AddRuleModal isOpenModal={isOpen} hideModal={hideModal} />
      </>
    );
  };
  return <>{working ? renderLoadingScreen() : renderRulesEngine()}</>;
};

export default RulesEngine;
