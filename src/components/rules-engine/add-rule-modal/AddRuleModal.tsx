import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonLoading,
  IonPopover,
  IonRippleEffect,
} from '@ionic/react';
import Modal from 'components/modals/Modal';
import usePopover from 'hooks/usePopover';
import { informationCircleOutline } from 'ionicons/icons';
import { ReactElement, useRef, useState } from 'react';
import { ActionType, useStore } from 'stores/store';

import { IRuleBase } from 'rules/RuleBase';
import './AddRuleModal.css';
import { RuleEngineClient } from 'rules/RuleEngineClient';
interface IModal {
  isOpenModal: boolean;
  hideModal: () => void;
}
const AddRuleModal: React.FC<IModal> = ({ isOpenModal, hideModal }) => {
  const { state, dispatch } = useStore();
  console.log('🚀 ~ file: AddRuleModal.tsx ~ line 28 ~ state', state);
  const [showLoading, setShowLoading] = useState(false);
  interface IRuleProps {
    rule: IRuleBase;
  }

  const Rule: React.FC<IRuleProps> = ({ rule }) => {
    const popover = useRef<HTMLIonPopoverElement>(null);
    const { isOpen, showPopover, hidePopover } = usePopover();
    const openPopover = (e: any) => {
      popover.current!.event = e;
      showPopover();
    };
    return (
      <IonCard>
        <IonItem>
          <IonLabel>{rule.description}</IonLabel>
          <IonIcon onClick={openPopover} icon={informationCircleOutline} slot="end" />
        </IonItem>
        <IonPopover ref={popover} isOpen={isOpen} onDidDismiss={hidePopover}>
          <IonContent class="ion-padding">{rule.information}</IonContent>
        </IonPopover>

        <IonCardContent>
          <IonButton
            expand="full"
            onClick={async () => {
              //loadindicator
              setShowLoading(true);
              //calc with async await
              let postProcessingResponse = await RuleEngineClient.instance.processRule(rule.id);
              console.log(
                '🚀 ~ file: AddRuleModal.tsx ~ line 59 ~ onClick={ ~ postProcessingResponse',
                postProcessingResponse,
              );
              // rule.setPostProcessingChances(postProcessingResponse != null ? postProcessingResponse.cacheSize : 0);
              //dispatch
              //hide load indicator
              setShowLoading(false);
              dispatch({
                type: ActionType.ADD_ENGINE_RULE,
                rule: rule,
                postProcessingSnapshots: postProcessingResponse.ruleSnapShots,
              });

              hideModal();
            }}
          >
            Add Rule
            <IonRippleEffect></IonRippleEffect>
          </IonButton>
        </IonCardContent>
      </IonCard>
    );
  };

  const renderRules = (): ReactElement[] =>
    state.rulesBank
      .filter((rule) => {
        //filtering out the user selected rules
        return state.rules.findIndex((userRule) => userRule.id === rule.id) === -1;
      })
      .map((rule) => <Rule key={rule.id} rule={rule} />);

  return (
    <Modal isOpen={isOpenModal} hideModal={hideModal}>
      <h1>Add Rule</h1>
      {renderRules()}
      <IonLoading
        cssClass="loading-indicator"
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={'Adding rule...'}
        spinner="circular"
      />
    </Modal>
  );
};

export default AddRuleModal;
