import { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { LoadScript } from '@react-google-maps/api';
import { Capacitor } from '@capacitor/core';
import {
  PushNotifications,
  Token,
  PushNotificationSchema,
  ActionPerformed,
} from '@capacitor/push-notifications';
import { Toast } from '@capacitor/toast';

import Tabs from './components/Tabs';
import NewMemory from './pages/NewMemory';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
  const apiKey = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

  const isPushNotificationsAvailable =
    Capacitor.isPluginAvailable('PushNotifications');
  const nullEntry: any[] = [];
  const [notifications, setNotifications] = useState(nullEntry);

  useEffect(() => {
    if (!isPushNotificationsAvailable) {
      return;
    }

    PushNotifications.checkPermissions().then((res) => {
      if (res.receive !== 'granted') {
        PushNotifications.requestPermissions().then((res) => {
          if (res.receive === 'denied') {
            showToast('Push Notifications permission denied');
          } else {
            showToast('Push Notifications permission granted');
            registerPush();
          }
        });
      } else {
        registerPush();
      }
    });
  });

  const showToast = async (message: string) => {
    await Toast.show({
      text: message,
    });
  };

  const registerPush = () => {
    if (!isPushNotificationsAvailable) {
      return;
    }

    // Register with Apple/Google to receive push via APNS/FCM
    PushNotifications.register();

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', (token: Token) => {
      showToast('Push registration success');
      console.log('Push registration success');
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
      console.log('Push registration error: ', JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        setNotifications((notifications) => [
          ...notifications,
          {
            id: notification.id,
            title: notification.title,
            body: notification.body,
            type: 'foreground',
          },
        ]);

        console.log('notification:', notification);
        console.log('notifications:', notifications);
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        setNotifications((notifications) => [
          ...notifications,
          {
            id: notification.notification.data.id,
            title: notification.notification.data.title,
            body: notification.notification.data.body,
            type: 'action',
          },
        ]);

        console.log('notification:', notification);
        console.log('notifications:', notifications);
      }
    );
  };

  return (
    <IonApp>
      <LoadScript googleMapsApiKey={apiKey}>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/tabs" component={Tabs} />
            <Route path="/new-memory" component={NewMemory} />
            <Redirect exact from="/" to="/tabs" />
          </IonRouterOutlet>
        </IonReactRouter>
      </LoadScript>
    </IonApp>
  );
};

export default App;
