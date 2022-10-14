import { IonLoading } from '@ionic/react';
import Modal from 'components/modals/Modal';
import { ReactElement, useState } from 'react';
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
  const { state, dispatch } = useStore();
  console.log('🚀 ~ file: AddRuleModal.tsx ~ line 28 ~ state', state);
  const [showLoading, setShowLoading] = useState(false);

  const addRule = async (rule: IRuleBase) => {
    setShowLoading(true);
    //calc with async await
    let postProcessingResponse = await RuleEngineClient.instance.processRule(rule.id);
    console.log('🚀 ~ file: AddRuleModal.tsx ~ line 59 ~ onClick={ ~ postProcessingResponse', postProcessingResponse);

    setShowLoading(false);
    dispatch({
      type: ActionType.ADD_ENGINE_RULE,
      rule: rule,
      postProcessingSnapshots: postProcessingResponse.ruleSnapShots,
    });

    hideModal();
  };
  const renderRules = (): ReactElement[] =>
    state.rulesBank
      .filter((rule) => {
        //filtering out the user selected rules
        return state.rules.findIndex((userRule) => userRule.id === rule.id) === -1;
      })
      .map((rule) => <AddableRule key={rule.id} rule={rule} onAddRuleRequested={addRule} />);

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
    </Modal>
  );
};

export default AddRuleModal;
