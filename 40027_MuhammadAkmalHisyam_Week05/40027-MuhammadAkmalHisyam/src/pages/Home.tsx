import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Calculator</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <h2>40027 - Muhammad Akmal Hisyam</h2>
      <IonButton expand="block" routerLink="/bmi">BMI Calculator</IonButton>
      <IonButton expand="block" routerLink="/bmr">BMR Calculator</IonButton>
    </IonContent>
  </IonPage>
);

export default Home;
