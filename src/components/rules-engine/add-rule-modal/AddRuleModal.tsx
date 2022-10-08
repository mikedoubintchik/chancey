import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonPopover,
  IonRippleEffect,
} from '@ionic/react';
import Modal from 'components/modals/Modal';
import usePopover from 'hooks/usePopover';
import { informationCircleOutline } from 'ionicons/icons';
import { ReactElement, useRef } from 'react';
import { ActionType, useStore } from 'stores/store';

import { IRuleBase } from 'rules/RuleBase';

interface IModal {
  isOpenModal: boolean;
  hideModal: () => void;
}
const AddRuleModal: React.FC<IModal> = ({ isOpenModal, hideModal }) => {
  const popover = useRef<HTMLIonPopoverElement>(null);
  const { isOpen, showPopover, hidePopover } = usePopover();
  const { state, dispatch } = useStore();
  console.log('🚀 ~ file: AddRuleModal.tsx ~ line 28 ~ state', state);

  const openPopover = (e: any) => {
    popover.current!.event = e;
    showPopover();
  };

  interface IRuleProps {
    rule: IRuleBase;
  }

  const Rule: React.FC<IRuleProps> = ({ rule }) => (
    <IonCard>
      <IonItem>
        <IonLabel>Use at least one of the top 10 frequent numbers in the last 400 draws</IonLabel>
        <IonIcon onClick={openPopover} icon={informationCircleOutline} slot="end" />
      </IonItem>
      <IonPopover ref={popover} isOpen={isOpen} onDidDismiss={hidePopover}>
        <IonContent class="ion-padding">{rule.getInformation()}</IonContent>
      </IonPopover>

      <IonCardContent>
        <IonButton
          expand="full"
          onClick={() => {
            dispatch({
              type: ActionType.ADD_RULE,
              rule,
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

  const renderRules = (): ReactElement[] => state.rulesBank.map((rule) => <Rule key={rule.id} rule={rule} />);

  return (
    <Modal isOpen={isOpenModal} hideModal={hideModal}>
      <h1>Add Rule</h1>
      {renderRules()}
    </Modal>
  );
};

export default AddRuleModal;
