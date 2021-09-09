import React from 'react';
import { IonRow, IonCol, IonCard, IonCardContent } from '@ionic/react';

const BmiResults: React.FC<{
  result: number,
  description: string
}> = (props) => (
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

export default BmiResults;