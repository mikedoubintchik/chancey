import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonToolbar,
} from '@ionic/react';
import './GetLuckyCard.css';
import { create, createOutline, createSharp, informationCircle, pencilOutline, time } from 'ionicons/icons';
import Series from 'components/series/Series';

interface GetLuckyCardProps {}

const GetLuckyCard: React.FC<GetLuckyCardProps> = ({}) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => {}}>
              <IonIcon slot="icon-only" icon={time}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => {}}>
              <IonIcon slot="icon-only" icon={pencilOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonCardHeader>
      <IonCardContent className="get-lucky-card-content">
        <Series numbers={[1, 2, 3, 4, 5]} extra={4}></Series>
        <IonButton onClick={() => {}} className="my-custom-button">
          Get Lucky
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default GetLuckyCard;
