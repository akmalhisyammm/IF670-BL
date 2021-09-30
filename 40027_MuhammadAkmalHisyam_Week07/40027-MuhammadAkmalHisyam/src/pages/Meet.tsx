import React, { useContext, useRef, useState } from 'react';
import {
  IonAlert,
  IonAvatar,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import { addOutline, ban, create, trash } from 'ionicons/icons';
import { isPlatform } from '@ionic/core';
import FriendsContext from '../data/friend-context';

const Meet: React.FC = () => {
  const [startBlocking, setStartBlocking] = useState(false);
  const [startDeleting, setStartDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedFriend, setSelectedFriend] = useState<{
    id: string;
    name: string;
    photo: string;
  } | null>();

  const friendsCtx = useContext(FriendsContext);

  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);
  const nameRef = useRef<HTMLIonInputElement>(null);

  const callFriendHandler = () => {
    console.log('Calling...');
  };

  const addFriendHandler = (enteredName: string | number) => {
    friendsCtx.addFriend(
      enteredName.toString(),
      'https://i.pravatar.cc/300?img='
    );
    setToastMessage('Added Friend!');
  };

  const editFriendHandler = (enteredName: string | number) => {
    friendsCtx.updateFriend(
      selectedFriend!.id.toString(),
      enteredName.toString(),
      'https://i.pravatar.cc/300?img='
    );
    setToastMessage('Edited Friend!');
  };

  const blockFriendHandler = () => {
    setStartBlocking(false);
    setToastMessage('Blocked Friend!');
  };

  const deleteFriendHandler = () => {
    friendsCtx.deleteFriend(selectedFriend!.id.toString());
    setStartDeleting(false);
    setToastMessage('Deleted Friend!');
  };

  const startAddFriendHandler = () => {
    console.log('Adding...');
    setIsEditing(true);
    setSelectedFriend(null);
  };

  const startEditFriendHandler = (friendId: string) => {
    console.log('Editing...');
    slidingOptionsRef.current?.closeOpened();
    const friend = friendsCtx.friends.find((f) => f.id === friendId);
    setSelectedFriend(friend);
    setIsEditing(true);
  };

  const startBlockFriendHandler = () => {
    console.log('Blocking...');
    slidingOptionsRef.current?.closeOpened();
    setStartBlocking(true);
  };

  const startDeleteFriendHandler = (friendId: string) => {
    console.log('Deleting...');
    slidingOptionsRef.current?.closeOpened();
    const friend = friendsCtx.friends.find((f) => f.id === friendId);
    setSelectedFriend(friend);
    setStartDeleting(true);
  };

  const cancelEditFriendHandler = () => {
    setIsEditing(false);
  };

  const saveFriendHandler = () => {
    const enteredName = nameRef.current!.value;
    if (!enteredName) return;

    selectedFriend
      ? editFriendHandler(enteredName)
      : addFriendHandler(enteredName);

    setIsEditing(false);
  };

  return (
    <>
      <IonAlert
        isOpen={startDeleting}
        header="Are you sure?"
        message="Do you want to delete your friend? This cannot be undone."
        buttons={[
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              setStartDeleting(false);
            },
          },
          { text: 'Yes', handler: deleteFriendHandler },
        ]}
      />
      <IonAlert
        isOpen={startBlocking}
        header="Are you sure?"
        message="Do you want to block your friend? This cannot be undone."
        buttons={[
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              setStartBlocking(false);
            },
          },
          { text: 'Yes', handler: blockFriendHandler },
        ]}
      />
      <IonToast
        isOpen={!!toastMessage}
        message={toastMessage}
        duration={2000}
        onDidDismiss={() => {
          setToastMessage('');
        }}
      />

      <IonModal isOpen={isEditing}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{selectedFriend ? 'Edit Friend' : 'Add Friend'}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Friend Name</IonLabel>
                  <IonInput
                    type="text"
                    ref={nameRef}
                    value={selectedFriend?.name}
                  />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="ion-text-center">
              <IonCol>
                <IonButton
                  fill="clear"
                  color="dark"
                  onClick={cancelEditFriendHandler}
                >
                  Cancel
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton
                  color="secondary"
                  expand="block"
                  onClick={saveFriendHandler}
                >
                  Save
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonModal>

      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            {!isPlatform('android') && (
              <IonButtons slot="end">
                <IonButton onClick={startAddFriendHandler}>
                  <IonIcon icon={addOutline} />
                </IonButton>
              </IonButtons>
            )}
            <IonTitle>Meet</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {friendsCtx.friends.length ? (
              friendsCtx.friends.map((friend) => (
                <IonItemSliding key={friend.id} ref={slidingOptionsRef}>
                  <IonItemOptions side="start">
                    <IonItemOption
                      color="danger"
                      onClick={startBlockFriendHandler}
                    >
                      <IonIcon icon={ban} slot="icon-only" />
                    </IonItemOption>
                    <IonItemOption
                      color="warning"
                      onClick={startDeleteFriendHandler.bind(null, friend.id)}
                    >
                      <IonIcon icon={trash} slot="icon-only" />
                    </IonItemOption>
                  </IonItemOptions>
                  <IonItemOptions side="end">
                    <IonItemOption
                      color="warning"
                      onClick={startEditFriendHandler.bind(null, friend.id)}
                    >
                      <IonIcon icon={create} slot="icon-only" />
                    </IonItemOption>
                  </IonItemOptions>
                  <IonItem lines="full" button onClick={callFriendHandler}>
                    <IonAvatar className="ion-margin-horizontal">
                      <img src={friend.photo} alt={`avatar-${friend.id}`} />
                    </IonAvatar>
                    <IonLabel>{friend.name}</IonLabel>
                  </IonItem>
                </IonItemSliding>
              ))
            ) : (
              <IonItem className="ion-text-center">
                <IonLabel>Friend list is empty!</IonLabel>
              </IonItem>
            )}
          </IonList>
          {isPlatform('android') && (
            <IonFab horizontal="end" vertical="bottom" slot="fixed">
              <IonFabButton color="secondary" onClick={startAddFriendHandler}>
                <IonIcon icon={addOutline} />
              </IonFabButton>
            </IonFab>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Meet;
