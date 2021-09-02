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
  IonAlert 
} from '@ionic/react';

import InputControl from './components/InputControl';
import BmiControls from './components/BmiControls';
import BmiResult from './components/BmiResult';

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
  const [calcUnits, setCalcUnits] = useState<'cmkg' | 'ftlbs'>('cmkg');
  const [error, setError] = useState<string>();

  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);
  
  const calculateBMI = () => {
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;

    if(!enteredWeight || !enteredHeight || +enteredHeight <= 0 || +enteredWeight <= 0) {
      setError('Please enter a valid (non-negative) input number');
      return;
    }

    const weightConversionFactor = calcUnits === 'cmkg' ? 1 : 2.2;
    const heightConversionFactor = calcUnits === 'cmkg' ? 1 : 0.0328;

    const convertedWeight = +enteredWeight / weightConversionFactor;
    const convertedHeight = +enteredHeight / heightConversionFactor;

    const bmi = convertedWeight / ((convertedHeight/100) * (convertedHeight/100));
    
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

  const clearError = () => {
    setError('');
  }

  const selectCalcUnitHandler = (selectedValue: 'cmkg' | 'ftlbs') => {
    setCalcUnits(selectedValue);
  };

  return (
    <>
      <IonAlert 
        isOpen={!!error}
        message={error}
        backdropDismiss={false}
        buttons={[{
          text: 'Okay',
          handler: clearError
        }]}
      />
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
                <InputControl 
                  selectedValue={calcUnits}
                  onSelectValue={selectCalcUnitHandler}
                  onReset={resetInputs}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Tinggi Badan ({calcUnits === 'cmkg' ? 'cm' : 'feet'})</IonLabel>
                  <IonInput ref={heightInputRef} />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Berat Badan ({calcUnits === 'cmkg' ? 'kg' : 'lbs'})</IonLabel>
                  <IonInput ref={weightInputRef} />
                </IonItem>
              </IonCol>
            </IonRow>
            <BmiControls
              onCalculate={calculateBMI}
              onReset={resetInputs}
            />
            {calculatedBMI && (
              <BmiResult
                result={calculatedBMI}
                description={description!}
              />
            )}
          </IonGrid>
        </IonContent>
      </IonApp>
    </>
  );
};

export default App;
