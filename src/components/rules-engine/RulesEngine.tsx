import {
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRippleEffect,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import Header from 'components/Header';
import SideMenu from 'components/SideMenu';
import useModal from 'hooks/useModal';
import { add, diamondOutline, trashBinOutline } from 'ionicons/icons';
import { IRuleBase } from 'rules/RuleBase';
import { ActionType, useStore } from 'stores/store';
import { ReactElement } from 'react';
import Rule from './rule/Rule';
import AddRuleModal from './add-rule-modal/AddRuleModal';
import FlowStart from './flow-start/FlowStart';
import './RulesEngine.css';
import FlowSeparator from './flow-separator/FlowSeparator';
import FlowEnd from './flow-end/FlowEnd';
import FlowSummary from './flow-summary/FlowSummary';
import { getAllCombinations } from 'utils/combinatorics';
interface IRulesEngineProps {}
const RulesEngine: React.FC<IRulesEngineProps> = () => {
  const { state, dispatch } = useStore();
  console.log('🚀 ~ file: RulesPage.tsx ~ line 15 ~ state', state);
  if (state.cache.length === 0) {
    let cache = getAllCombinations();
    dispatch({
      type: ActionType.INITIALIZE_CACHE,
      cache: cache,
    });
  }
  const { isOpen, showModal, hideModal } = useModal();

  const renderRules = (): ReactElement[] =>
    state.rules.map((rule: IRuleBase) => (
      <>
        <Rule key={rule.id} rule={rule} />
        <FlowSeparator></FlowSeparator>
      </>
    ));

  state.rules.map((rule) => {
    console.log(state.cache.length);
    let cache = state.cache.filter((comb) => {
      return rule.validate({ numbers: comb, extra: 0 });
    });
    console.log(cache.length);
  });
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
      <FlowSummary></FlowSummary>
      <AddRuleModal isOpenModal={isOpen} hideModal={hideModal} />
    </>
  );
};

export default RulesEngine;
