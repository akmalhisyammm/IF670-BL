import React from 'react';
import { IonRow, IonCol, IonCard, IonCardContent } from '@ionic/react';

const BmiResult: React.FC<{
  result: number,
  description: string
}> = props => {
  return (
    <IonRow>
      <IonCol>
        <IonCard className="ion-padding-vertical">
          <IonCardContent className="ion-text-center">
            <h2>{props.result.toFixed(2)}</h2>
            <h1>{props.description}</h1>
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};

export default BmiResult;