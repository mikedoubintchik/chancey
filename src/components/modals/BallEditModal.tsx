import { InputChangeEventDetail, IonButton, IonContent, IonInput, IonLoading } from '@ionic/react';
import Modal from 'components/modals/Modal';
import { useState } from 'react';

interface IBallEditModal {
  isOpenModal: boolean;
  hideModal: () => void;
  ballNumber: number;
  setNewNumber: (newBallNumber: number) => void;
}

const BallEditModal: React.FC<IBallEditModal> = ({ isOpenModal, hideModal, ballNumber, setNewNumber }) => {
  const [showLoading, setShowLoading] = useState(false);
  const [newBallNumber, setNewBallNumber] = useState<number>(ballNumber);

  const handleChange = (event: CustomEvent<InputChangeEventDetail>) => {
    event.detail.value && setNewBallNumber(Number(event.detail.value));
  };

  const handleSave = () => {
    newBallNumber && setNewNumber(Number(newBallNumber));
    hideModal();
  };

  return (
    <Modal isOpen={isOpenModal} hideModal={hideModal} title="Edit Ball">
      <IonLoading
        cssClass="loading-indicator"
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={'Logging in...'}
        spinner="circular"
      />
      <IonContent className="ion-align-items-center ion-padding">
        <IonInput
          label="Ball"
          type="number"
          placeholder={'Enter a ball number'}
          value={newBallNumber}
          onIonChange={handleChange}
        ></IonInput>
        <IonButton onClick={handleSave}>Save</IonButton>
      </IonContent>
    </Modal>
  );
};

export default BallEditModal;
