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
import LotteryDraw from 'components/lottery-draw/LotteryDraw';
import BallEditModal from 'components/modals/BallEditModal';
import { useFirebase } from 'hooks/useFirebase';
import useModal from 'hooks/useModal';
import { informationCircleOutline } from 'ionicons/icons';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useState } from 'react';
import { useStore } from 'stores/store';
import { LotteryDrawModel } from 'types/lottery-draw';
import { TicketPhotoType } from 'types/profile';
import { parseDate, parseMegaMillionsNumbersAndMultiplier } from 'utils/lottery-utils';

const ValidateScanPage: React.FC = () => {
  const { state } = useStore();
  const [ticketNumbers, setTicketNumbers] = useState<LotteryDrawModel>();
  const [ticketDate, setTicketDate] = useState<string>();
  const [drawingDate, setDrawingDate] = useState<string>();
  const [editNumber, setEditNumber] = useState<number>();
  const [editIndex, setEditIndex] = useState<number>();
  const [isBallEditModalOpen, showBallEditModal, hideBallEditModal] = useModal();

  const { readNumbersFromTicket } = useFirebase();

  const setTicketState = useCallback(async () => {
    const newPhoto: TicketPhotoType = {
      fileName: 'asdasd',
      filePath: '',
    };

    const ticketText: any = await readNumbersFromTicket(newPhoto.fileName);
    const numbers = parseMegaMillionsNumbersAndMultiplier(ticketText[0].description);

    if (numbers) {
      // console.log('🚀 ~ file: HomePage.tsx:60 ~ meow ~ result:', numbers);
      // console.log('correct numbers: 02 13 27 42 47 02');
      // @ts-ignore
      setTicketNumbers(numbers);

      const { ticketDate: date, drawingDate: drawing } = parseDate(ticketText[0].description);
      // @ts-ignore
      date && setTicketDate(date);
      // @ts-ignore
      drawing && setDrawingDate(drawing);

      // console.log('🚀 ~ file: HomePage.tsx:76 ~ meow ~ drawingDate:', drawing);
      // console.log('🚀 ~ file: HomePage.tsx:76 ~ meow ~ ticketDate:', date);
      // console.log('correct dates: drawing july 29, ticket july 27');
    }
  }, [readNumbersFromTicket]);

  useEffect(() => {
    setTicketState();
  }, []);

  return (
    <>
      <IonPage id="main-content">
        <Header pageTitle="Validate Ticket" />
        <IonContent fullscreen>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonCard>
                  {!ticketNumbers && (
                    <IonSpinner name="circular" style={{ width: '100%', marginTop: 20, marginBottom: 20 }}></IonSpinner>
                  )}
                  {ticketNumbers && (
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
                          <p>Ticket Date: {ticketDate}</p>
                          <p>Drawing Date: {drawingDate}</p>
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
                              setEditNumber(newBallNumber);
                              const newNumbers = { ...ticketNumbers };

                              // if extra ball
                              if (editIndex === 6) {
                                newNumbers.series.extra = newBallNumber;
                              } else {
                                newNumbers.series.numbers[editIndex - 1] = newBallNumber; // index starts with 1
                              }
                            }}
                          />
                        )}
                        {ticketNumbers && (
                          <LotteryDraw
                            draw={ticketNumbers}
                            onBallClick={(number, isExtra, index) => {
                              setEditNumber(number);
                              setEditIndex(index);
                              showBallEditModal();
                            }}
                          />
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
    </>
  );
};

export default ValidateScanPage;
