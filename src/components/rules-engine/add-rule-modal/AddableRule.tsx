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
            onAddRuleRequested(rule);
          }}
        >
          Add Rule
          <IonRippleEffect></IonRippleEffect>
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default AddableRule;
