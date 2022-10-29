import { IonItem, IonLoading, IonModal, IonText } from '@ionic/react';
import Modal from 'components/modals/Modal';
import { ReactElement, useRef, useState } from 'react';
import { IRuleBase } from 'rules/RuleBase';
import { RuleEngineClient } from 'rules/RuleEngineClient';
import { ActionType, useStore } from 'stores/store';

import AddableRule from './AddableRule';
import './AddRuleModal.css';
interface IModal {
  isOpenModal: boolean;
  hideModal: () => void;
}

const AddRuleModal: React.FC<IModal> = ({ isOpenModal, hideModal }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const { state, dispatch } = useStore();
  const [currentRule, setCurrentRule] = useState<IRuleBase | null>(null);
  console.log('🚀 ~ file: AddRuleModal.tsx ~ line 28 ~ state', state);
  const [showLoading, setShowLoading] = useState(false);

  const addRule = async (rule: IRuleBase) => {
    setShowLoading(true);
    //calc with async await
    let postProcessingResponse = await RuleEngineClient.instance.processRule(rule.id);
    // console.log('🚀 ~ file: AddRuleModal.tsx ~ line 59 ~ onClick={ ~ postProcessingResponse', postProcessingResponse);

    setShowLoading(false);
    dispatch({
      type: ActionType.ADD_ENGINE_RULE,
      rule: rule,
      postProcessingSnapshots: postProcessingResponse.ruleSnapShots,
    });

    hideModal();
  };
  const showRuleInformation = async (rule: IRuleBase) => {
    setCurrentRule(rule);
    await modal.current?.present();
  };

  const renderRules = (): ReactElement[] =>
    state.rulesBank
      .filter((rule) => {
        //filtering out the user selected rules
        return state.rules.findIndex((userRule) => userRule.id === rule.id) === -1;
      })
      .map((rule) => (
        <AddableRule
          key={rule.id}
          rule={rule}
          onAddRuleRequested={addRule}
          onRuleInformationRequested={showRuleInformation}
        />
      ));

  return (
    <Modal isOpen={isOpenModal} hideModal={hideModal} title="Add Rule">
      {renderRules()}
      <IonLoading
        cssClass="loading-indicator"
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={'Adding rule...'}
        spinner="circular"
      />
      <IonModal
        // isOpen={isInfoModalOpen}
        ref={modal}
        title="Information"
        initialBreakpoint={0.75}
        breakpoints={[0, 0.75]}
      >
        <IonItem lines="none" color="none">
          <IonText color="primary">
            <h3>{currentRule?.name}</h3>
          </IonText>
        </IonItem>
        <IonItem lines="none" color="none">
          <p>
            <IonText color="secondary">
              <h6>{currentRule?.information}</h6>
            </IonText>
          </p>
        </IonItem>
      </IonModal>
    </Modal>
  );
};

export default AddRuleModal;
