import { useRef, useState } from 'react';
import {
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
  IonAlert, 
  IonPage,
  IonButtons,
  IonBackButton
} from '@ionic/react';

import InputControl from '../components/InputControl';
import BtnControls from '../components/BtnControls';
import BmiResults from '../components/BmiResults';

const BmiCalc: React.FC = () => {
  const [calculatedBMI, setCalculatedBMI] = useState<number>();
  const [description, setDescription] = useState<string>();
  const [calcUnits, setCalcUnits] = useState<'cmkg' | 'ftlbs'>('cmkg');
  const [resultColor, setResultColor] = useState<'success' | 'warning' | 'danger'>();
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
      setResultColor('warning');
    } else if (bmi >= 18.5 && bmi < 25) {
      setDescription('Normal');
      setResultColor('success');
    } else if (bmi >= 25 && bmi < 30) {
      setDescription('Gemuk');
      setResultColor('warning');
    } else {
      setDescription('Obesitas');
      setResultColor('danger');
    }
  };

  const resetInputs = () => {
    weightInputRef.current!.value = '';
    heightInputRef.current!.value = '';
    setCalculatedBMI(undefined);
  };

  const clearError = () => {
    setError('');
  };

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
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonBackButton defaultHref="home" />
            </IonButtons>
            <IonTitle>BMI Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol sizeSm="8" offsetSm="2" sizeMd="6" offsetMd="3">
                <IonGrid className="ion-no-padding">
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
                  <BtnControls
                    onCalculate={calculateBMI}
                    onReset={resetInputs}
                  />
                  {calculatedBMI && (
                    <BmiResults
                      result={calculatedBMI}
                      description={description!}
                      color={resultColor!}
                    />
                  )}
                </IonGrid>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default BmiCalc;
