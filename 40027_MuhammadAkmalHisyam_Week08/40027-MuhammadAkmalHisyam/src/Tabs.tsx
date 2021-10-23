import React from 'react';
import { Route, Redirect } from 'react-router';
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/react';
import { happy, sad } from 'ionicons/icons';

import BadMemories from './pages/BadMemories';
import GoodMemories from './pages/GoodMemories';

const Tabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/good-memories" component={GoodMemories} />
        <Route path="/tabs/bad-memories" component={BadMemories} />
        <Redirect exact from="/tabs" to="/tabs/good-memories" />
      </IonRouterOutlet>
      <IonTabBar slot="bottom" color="primary">
        <IonTabButton tab="good memories" href="/tabs/good-memories">
          <IonIcon icon={happy} />
          <IonLabel>Good Memories</IonLabel>
        </IonTabButton>
        <IonTabButton tab="bad memories" href="/tabs/bad-memories">
          <IonIcon icon={sad} />
          <IonLabel>Bad Memories</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
