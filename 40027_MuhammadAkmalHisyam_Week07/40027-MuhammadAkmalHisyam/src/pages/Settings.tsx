import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonText,
  IonContent,
  IonButtons,
  IonMenuButton,
} from '@ionic/react';

const Settings: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonText>Settings</IonText>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <h1>Settings</h1>
    </IonContent>
  </IonPage>
);

export default Settings;
