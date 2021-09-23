import React, { useRef } from 'react';
import {
  IonAvatar,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { ban, create, trash } from 'ionicons/icons';

export const FRIENDS_DATA = [
  {
    id: 'f1',
    name: 'John Thor',
  },
  {
    id: 'f2',
    name: 'John Ness',
  },
  {
    id: 'f3',
    name: 'John Doe',
  },
];

const Meet: React.FC = () => {
  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);

  const callFriendHandler = () => {
    console.log('Calling...');
  };

  const blockFriendHandler = () => {
    slidingOptionsRef.current?.closeOpened();
    console.log('Blocking...');
  };

  const deleteFriendHandler = () => {
    slidingOptionsRef.current?.closeOpened();
    console.log('Deleting...');
  };

  const editFriendHandler = () => {
    slidingOptionsRef.current?.closeOpened();
    console.log('Editing...');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Meet</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {FRIENDS_DATA.map((friend) => (
            <IonItemSliding key={friend.id} ref={slidingOptionsRef}>
              <IonItemOptions side="start">
                <IonItemOption color="danger" onClick={blockFriendHandler}>
                  <IonIcon icon={ban} slot="icon-only" />
                </IonItemOption>
                <IonItemOption color="warning" onClick={deleteFriendHandler}>
                  <IonIcon icon={trash} slot="icon-only" />
                </IonItemOption>
              </IonItemOptions>
              <IonItemOptions side="end">
                <IonItemOption color="warning" onClick={editFriendHandler}>
                  <IonIcon icon={create} slot="icon-only" />
                </IonItemOption>
              </IonItemOptions>
              <IonItem lines="full" button onClick={callFriendHandler}>
                <IonAvatar className="ion-margin-horizontal">
                  <img
                    src={`https://i.pravatar.cc/300?img=${friend.id}`}
                    alt={`avatar-${friend.id}`}
                  />
                </IonAvatar>
                <IonLabel>{friend.name}</IonLabel>
              </IonItem>
            </IonItemSliding>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Meet;
