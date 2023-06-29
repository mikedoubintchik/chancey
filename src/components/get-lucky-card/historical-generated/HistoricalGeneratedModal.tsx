import Modal from 'components/modals/Modal';
import { ReactElement, useRef, useState } from 'react';
import { useStore } from 'stores/store';

import './HistoricalGeneratedModal.css';
import Series from 'components/series/Series';
import { IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonLabel, IonRow } from '@ionic/react';

interface IModal {
  isOpenModal: boolean;
  hideModal: () => void;
}

const HistoricalGeneratedModal: React.FC<IModal> = ({ isOpenModal, hideModal }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const { state, dispatch } = useStore();

  const renderHistoricalGueneratedResults = (): ReactElement[] => {
    if (state.historicalLuckyGeneratedResults && state.historicalLuckyGeneratedResults.length > 0) {
      return state.historicalLuckyGeneratedResults.map((result, index) => (
        <IonCard key={'lucky-guess - ' + index}>
          <IonCardHeader>
            <IonGrid className="lucky-guesses-header-grid">
              <IonRow>
                <IonCol className="lucky-guesses-header-col">
                  <IonLabel>Lucky Guess #{index + 1}</IonLabel>
                </IonCol>
                <IonCol className="lucky-guesses-header-col">
                  <IonLabel className="lucky-guesses-header-date-label">
                    Generatred on {result.date.toLocaleDateString()}
                  </IonLabel>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardHeader>
          <IonCardContent>
            <Series numbers={result.series.numbers} extra={result.series.extra}></Series>
          </IonCardContent>
        </IonCard>
      ));
    } else {
      return [];
    }
  };

  return (
    <Modal isOpen={isOpenModal} hideModal={hideModal} title="Historical Generated Results">
      <div className="lucky-guesses-container">
        {renderHistoricalGueneratedResults()}
        {state.historicalLuckyGeneratedResults && state.historicalLuckyGeneratedResults.length === 0 && (
          <IonLabel className="get-lucky-label">Get Lucky and generate your numbers</IonLabel>
        )}
      </div>
    </Modal>
  );
};

export default HistoricalGeneratedModal;
