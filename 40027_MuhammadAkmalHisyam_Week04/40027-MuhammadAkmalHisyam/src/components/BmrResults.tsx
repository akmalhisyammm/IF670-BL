import React from 'react';
import { IonRow, IonCol, IonCard, IonCardContent } from '@ionic/react';

const BmrResults: React.FC<{
  result: number
}> = (props) => (
  <IonRow>
    <IonCol>
      <IonCard className="ion-padding-vertical ion-text-center">
        <IonCardContent>
          <h2>BMR = {props.result.toFixed(2)} Calories/day</h2>
          <h2>Daily calorie needs based on activity level</h2>
          <IonRow className="ion-align-items-center">
            <IonCol size="9" sizeSm="10" sizeLg="11" className="ion-text-start">
              <h2><strong>Activity Level</strong></h2>
            </IonCol>
            <IonCol size="3" sizeSm="2" sizeLg="1">
              <h2><strong>Calorie</strong></h2>
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center">
            <IonCol size="9" sizeSm="10" sizeLg="11" className="ion-text-start">
              <h2>Sedentary: little or no exercise</h2>
            </IonCol>
            <IonCol size="3" sizeSm="2" sizeLg="1">
              <h2>{(props.result * 1.2).toFixed(2)}</h2>
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center">
            <IonCol size="9" sizeSm="10" sizeLg="11" className="ion-text-start">
              <h2>Exercise 1-3 times/week</h2>
            </IonCol>
            <IonCol size="3" sizeSm="2" sizeLg="1">
              <h2>{(props.result * 1.375).toFixed(2)}</h2>
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center">
            <IonCol size="9" sizeSm="10" sizeLg="11" className="ion-text-start">
              <h2>Exercise 4-5 times/week</h2>
            </IonCol>
            <IonCol size="3" sizeSm="2" sizeLg="1">
              <h2>{(props.result * 1.55).toFixed(2)}</h2>
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center">
            <IonCol size="9" sizeSm="10" sizeLg="11" className="ion-text-start">
              <h2>Daily exercise or intense exercise 3-4 times/week</h2>
            </IonCol>
            <IonCol size="3" sizeSm="2" sizeLg="1">
              <h2>{(props.result * 1.725).toFixed(2)}</h2>
            </IonCol>
          </IonRow>
          <IonRow className="ion-align-items-center">
            <IonCol size="9" sizeSm="10" sizeLg="11" className="ion-text-start">
              <h2>Intense exercise 6-7 times/week</h2>
            </IonCol>
            <IonCol size="3" sizeSm="2" sizeLg="1">
              <h2>{(props.result * 1.9).toFixed(2)}</h2>
            </IonCol>
          </IonRow>
        </IonCardContent>
      </IonCard>
    </IonCol>
  </IonRow>
);

export default BmrResults;