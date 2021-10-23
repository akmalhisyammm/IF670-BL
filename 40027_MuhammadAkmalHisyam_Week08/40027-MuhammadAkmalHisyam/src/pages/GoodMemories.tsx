import React from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { isPlatform } from '@ionic/core';
import { addOutline } from 'ionicons/icons';
import MemoryItem from '../components/MemoryItem';

const GoodMemories: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          {!isPlatform('android') && (
            <IonButtons slot="end">
              <IonButton routerLink="/new-memory">
                <IonIcon icon={addOutline} />
              </IonButton>
            </IonButtons>
          )}
          <IonTitle>Good Memories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <MemoryItem type="good" />
        {isPlatform('android') && (
          <IonFab horizontal="end" vertical="bottom" slot="fixed">
            <IonFabButton color="secondary" routerLink="/new-memory">
              <IonIcon icon={addOutline} />
            </IonFabButton>
          </IonFab>
        )}
      </IonContent>
    </IonPage>
  );
};

export default GoodMemories;
