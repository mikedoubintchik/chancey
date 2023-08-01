import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonPage,
  IonPopover,
  IonRow,
  IonSpinner,
  IonToolbar,
} from '@ionic/react';
import Header from 'components/Header';
import LotteryDrawWithoutStats from 'components/lottery-draw-without-stats/LotteryDrawWithoutStats';
import LotteryDraw from 'components/lottery-draw/LotteryDraw';
import LotteryTickets from 'components/lottery-tickets/LotteryTickets';
import BallEditModal from 'components/modals/BallEditModal';
import useModal from 'hooks/useModal';
import { informationCircleOutline } from 'ionicons/icons';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useMockStore } from 'stores/mockStore';
import { useStore } from 'stores/store';
import { LotteryDrawModel, LotteryTicketModel } from 'types/lottery-draw';

const ValidateScanPage: React.FC = () => {
  const { state } = useMockStore(); // use mock store to avoid making API calls
  // const { state } = useStore();
  // console.log('🚀 ~ file: ValidateScanPage.tsx:33 ~ state:', state);
  const [lotteryTicket, setLotteryTicket] = useState<LotteryDrawModel[] | undefined>();
  const [seriesIndex, setSeriesIndex] = useState<number>(0);
  const [editNumber, setEditNumber] = useState<number>();
  const [editIndex, setEditIndex] = useState<number>();
  const [isBallEditModalOpen, showBallEditModal, hideBallEditModal] = useModal();

  useEffect(() => {
    if (state.latestTicket?.values) setLotteryTicket(state.latestTicket?.values);
  }, [state.latestTicket?.values]);

  return (
    <IonPage id="main-content">
      <Header pageTitle="Validate Ticket" />
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <LotteryDrawWithoutStats />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard>
                {!lotteryTicket && (
                  <IonSpinner name="circular" style={{ width: '100%', marginTop: 20, marginBottom: 20 }}></IonSpinner>
                )}
                {lotteryTicket && (
                  <>
                    <IonCardHeader>
                      <IonToolbar>
                        <IonCardTitle className="title-left">
                          Make sure your ticket is correct
                          <IonButton fill="clear" id="click-trigger">
                            <IonIcon icon={informationCircleOutline} />
                          </IonButton>
                        </IonCardTitle>
                        <IonPopover trigger="click-trigger" triggerAction="click">
                          Click on the numbers below to correct mistakes
                        </IonPopover>
                        <p>Drawing Date: {lotteryTicket[0].date.toDateString()}</p>
                        <p>Ticket Date: {state.latestTicket?.ticketDate?.toDateString()}</p>
                      </IonToolbar>
                    </IonCardHeader>
                    <IonCardContent>
                      {editNumber && editIndex && (
                        <BallEditModal
                          isOpenModal={isBallEditModalOpen}
                          hideModal={() => {
                            setEditNumber(undefined);
                            setEditIndex(undefined);
                            hideBallEditModal();
                          }}
                          ballNumber={editNumber}
                          setNewNumber={(newBallNumber) => {
                            console.log('🚀 ~ file: ValidateScanPage.tsx:89 ~ newBallNumber:', newBallNumber);
                            setEditNumber(newBallNumber);
                            // if extra ball
                            if (editIndex === 6) {
                              lotteryTicket[seriesIndex].series.extra = newBallNumber;
                            } else {
                              const updatedLotteryTicket = lotteryTicket.map((ticket) => Object.assign({}, ticket));

                              updatedLotteryTicket[seriesIndex].series.numbers[editIndex - 1] = newBallNumber; // index starts with 1

                              setLotteryTicket(updatedLotteryTicket);
                            }
                          }}
                        />
                      )}
                      {lotteryTicket && (
                        <LotteryTickets
                          draws={lotteryTicket}
                          onBallClick={(number, isExtra, index, seriesIndex) => {
                            setSeriesIndex(seriesIndex);
                            setEditNumber(number);
                            setEditIndex(index);
                            showBallEditModal();
                          }}
                        />
                        // <LotteryDraw
                        //   draw={lotteryTicket[0]}
                        //   onBallClick={(number, isExtra, index) => {
                        //     setEditNumber(number);
                        //     setEditIndex(index);
                        //     showBallEditModal();
                        //   }}
                        // />
                      )}
                    </IonCardContent>
                  </>
                )}
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            {state.ticketPhotos.map((photo, index) => (
              <IonCol size="6" key={nanoid()}>
                <IonImg src={photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ValidateScanPage;
