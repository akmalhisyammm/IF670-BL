import React from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonText,
  IonToolbar,
} from '@ionic/react';

const Spam: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonText>Spam</IonText>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <h1>Spam</h1>
    </IonContent>
  </IonPage>
);

export default Spam;
