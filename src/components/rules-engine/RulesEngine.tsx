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
import { add, trashBinOutline } from 'ionicons/icons';
import { IRuleBase } from 'rules/RuleBase';
import { ActionType, useStore } from 'stores/store';
import { ReactElement } from 'react';
import Rule from './rule/Rule';
import AddRuleModal from './add-rule-modal/AddRuleModal';

interface IRulesEngineProps {}
const RulesEngine: React.FC<IRulesEngineProps> = () => {
  const { state, dispatch } = useStore();
  console.log('🚀 ~ file: RulesPage.tsx ~ line 15 ~ state', state);

  const { isOpen, showModal, hideModal } = useModal();

  const renderRules = (): ReactElement[] => state.rules.map((rule: IRuleBase) => <Rule key={rule.id} rule={rule} />);
  return (
    <>
      {renderRules()}
      <IonButton expand="full" onClick={showModal}>
        <IonIcon slot="icon-only" icon={add}></IonIcon>
        <IonRippleEffect></IonRippleEffect>
      </IonButton>
      <AddRuleModal isOpenModal={isOpen} hideModal={hideModal} />
    </>
  );
};

export default RulesEngine;
