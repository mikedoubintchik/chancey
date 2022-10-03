import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { informationCircle, pencilOutline } from 'ionicons/icons';
import { useState } from 'react';
import './StatsFrame.css';

interface StatsFrameProps {
  title?: string;
  displayComponent?: any;
  editComponent?: any;
  infoComponent?: any;
  mode?: StatsFrameMode;
  onModeChangeRequest: (mode: StatsFrameMode) => void;
}
export enum StatsFrameMode {
  EDIT,
  INFO,
  DISPLAY,
}
const StatsFrame: React.FC<StatsFrameProps> = ({
  title,
  displayComponent,
  editComponent,
  infoComponent,
  mode,
  onModeChangeRequest,
}) => {
  return (
    <IonCard>
      <IonCardHeader class="stats-frame-header">
        <IonToolbar>
          {infoComponent && (
            <IonButtons slot="start">
              <IonButton onClick={() => onModeChangeRequest(StatsFrameMode.INFO)}>
                <IonIcon slot="icon-only" icon={informationCircle}></IonIcon>
              </IonButton>
            </IonButtons>
          )}
          {title && <IonTitle>{title}</IonTitle>}
          {editComponent && (
            <IonButtons slot="end">
              <IonButton onClick={() => onModeChangeRequest(StatsFrameMode.EDIT)}>
                <IonIcon slot="icon-only" icon={pencilOutline}></IonIcon>
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonCardHeader>
      <IonCardContent>
        {mode === StatsFrameMode.DISPLAY && displayComponent}
        {mode === StatsFrameMode.EDIT && editComponent}
        {mode === StatsFrameMode.INFO && infoComponent}
      </IonCardContent>
    </IonCard>
  );
};

export default StatsFrame;
