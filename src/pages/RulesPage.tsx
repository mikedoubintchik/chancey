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

import AddRuleModal from 'components/modals/AddRuleModal';
import useModal from 'hooks/useModal';
import { ReactElement } from 'react';
import { ActionType, useStore } from 'stores/store';
import { IRuleBase } from '../rules/RuleBase';

const RulesPage: React.FC = () => {
  const { state, dispatch } = useStore();
  console.log('🚀 ~ file: RulesPage.tsx ~ line 15 ~ state', state);

  const { isOpen, showModal, hideModal } = useModal();

  interface IRuleProps {
    rule: IRuleBase;
  }

  const Rule: React.FC<IRuleProps> = ({ rule }) => (
    <IonCard>
      <IonItem>
        <IonLabel>{rule.getDescription()}</IonLabel>
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
      </IonItem>
    </IonCard>
  );

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
