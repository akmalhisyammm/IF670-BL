import { useRef, useState } from 'react';
import { 
  IonApp, 
  IonHeader, 
  IonContent, 
  IonToolbar, 
  IonTitle, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton, 
  IonIcon, 
  IonCard, 
  IonCardContent 
} from '@ionic/react';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';

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
  const [calculatedBMI, setCalculatedBMI] = useState<number>();
  const [description, setDescription] = useState<string>();

  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);
  
  const calculateBMI = () => {
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;

    if(!enteredWeight || !enteredHeight) return;

    const bmi = +enteredWeight / ((+enteredHeight/100) * (+enteredHeight/100));
    
    setCalculatedBMI(bmi);

    if (bmi < 18.5) {
      setDescription('Kurus');
    } else if (bmi >= 18.5 && bmi < 25) {
      setDescription('Normal');
    } else if (bmi >= 25 && bmi < 30) {
      setDescription('Gemuk');
    } else {
      setDescription('Obesitas');
    }
  };

  const resetInputs = () => {
    weightInputRef.current!.value = '';
    heightInputRef.current!.value = '';
    setCalculatedBMI(undefined);
  };

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>BMI Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Tinggi Badan (cm)</IonLabel>
                <IonInput ref={heightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Berat Badan (kg)</IonLabel>
                <IonInput ref={weightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-left">
              <IonButton onClick={calculateBMI}>
                <IonIcon slot="start" icon={calculatorOutline}></IonIcon>
                Calculate
              </IonButton>
            </IonCol>
            <IonCol className="ion-text-right">
              <IonButton onClick={resetInputs}>
                <IonIcon slot="start" icon={refreshOutline}></IonIcon>
                Reset
              </IonButton>
            </IonCol>
          </IonRow>
          {calculatedBMI && (
            <IonRow>
              <IonCol>
                <IonCard className="ion-padding-vertical">
                  <IonCardContent className="ion-text-center">
                    <h2>{calculatedBMI}</h2>
                    <h1>{description}</h1>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </IonContent>
    </IonApp>
  );
};

export default App;
