import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/react';
import React, { useContext } from 'react';
import MemoriesContext from '../data/memories-context';

const MemoryItem: React.FC<{ type: string }> = (props) => {
  const memoriesCtx = useContext(MemoriesContext);

  const memories = memoriesCtx.memories.filter(
    (memory) => memory.type === props.type
  );

  return (
    <IonGrid>
      {memories.length === 0 && (
        <IonRow>
          <IonCol className="ion-text-center">
            <h2>No {props.type} memories found.</h2>
          </IonCol>
        </IonRow>
      )}
      {memories.map((memory) => (
        <IonRow key={memory.id}>
          <IonCol>
            <IonCard color="primary">
              <img src={memory.base64Url} alt={memory.title} />
              <IonCardHeader>
                <IonCardTitle>{memory.title}</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
        </IonRow>
      ))}
    </IonGrid>
  );
};

export default MemoryItem;
