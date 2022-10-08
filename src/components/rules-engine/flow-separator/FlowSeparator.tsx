import { IonCard, IonGrid, IonIcon, IonItem, IonLabel, IonProgressBar, IonRow } from '@ionic/react';
import { chevronDownOutline, diamondOutline, trashBinOutline } from 'ionicons/icons';
import './FlowSeparator.css';

const FlowSeparator: React.FC = () => {
  return (
    // <IonCard>
    <IonGrid>
      <IonRow style={{ justifyContent: 'center' }}>
        {/* <IonLabel class="center-line"></IonLabel> */}
        <IonProgressBar buffer={0} value={0} class="center-line"></IonProgressBar>
      </IonRow>
    </IonGrid>

    // </IonCard>
  );
};

export default FlowSeparator;
