import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonPopover,
  IonRippleEffect,
} from '@ionic/react';
import usePopover from 'hooks/usePopover';
import { informationCircleOutline } from 'ionicons/icons';
import { useRef } from 'react';

import { IRuleBase } from 'rules/RuleBase';

interface IRuleProps {
  rule: IRuleBase;
  onAddRuleRequested(rule: IRuleBase): void;
}
const AddableRule: React.FC<IRuleProps> = ({ rule, onAddRuleRequested }) => {
  const popover = useRef<HTMLIonPopoverElement>(null);
  const { isOpen, showPopover, hidePopover } = usePopover();

  const openPopover = (e: any) => {
    popover.current!.event = e;
    showPopover();
  };

  return (
    <IonCard>
      <IonCardHeader>
        <IonItem lines="none">
          <IonLabel>{rule.name}</IonLabel>
          <IonIcon onClick={openPopover} icon={informationCircleOutline} slot="end" />
        </IonItem>
      </IonCardHeader>
      <IonCardContent>
        <IonItem lines="none">{rule.description}</IonItem>
        <IonItem>
          <IonButton
            slot="end"
            shape="round"
            // expand="full"
            onClick={async () => {
              //loadindicator
              onAddRuleRequested(rule);
            }}
          >
            Add Rule
            <IonRippleEffect></IonRippleEffect>
          </IonButton>
        </IonItem>
      </IonCardContent>
      <IonPopover ref={popover} isOpen={isOpen} onDidDismiss={hidePopover}>
        <IonContent class="ion-padding">{rule.information}</IonContent>
      </IonPopover>
    </IonCard>
  );
};

export default AddableRule;
