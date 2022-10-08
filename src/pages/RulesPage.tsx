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
import { add, trashBinOutline } from 'ionicons/icons';

import AddRuleModal from 'components/rules-engine/add-rule-modal/AddRuleModal';
import useModal from 'hooks/useModal';
import { ReactElement } from 'react';
import { ActionType, useStore } from 'stores/store';
import { IRuleBase } from '../rules/RuleBase';
import Rule from 'components/rules-engine/rule/Rule';

const RulesPage: React.FC = () => {
  const { state, dispatch } = useStore();
  console.log('🚀 ~ file: RulesPage.tsx ~ line 15 ~ state', state);

  const { isOpen, showModal, hideModal } = useModal();

  const renderRules = (): ReactElement[] => state.rules.map((rule: IRuleBase) => <Rule key={rule.id} rule={rule} />);

  return (
    <>
      <SideMenu />
      <IonPage id="main-content">
        <Header />
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Rules</IonTitle>
            </IonToolbar>
          </IonHeader>
          {renderRules()}
          <IonButton expand="full" onClick={showModal}>
            <IonIcon slot="icon-only" icon={add}></IonIcon>
            <IonRippleEffect></IonRippleEffect>
          </IonButton>
        </IonContent>
        <AddRuleModal isOpenModal={isOpen} hideModal={hideModal} />
      </IonPage>
    </>
  );
};

export default RulesPage;
