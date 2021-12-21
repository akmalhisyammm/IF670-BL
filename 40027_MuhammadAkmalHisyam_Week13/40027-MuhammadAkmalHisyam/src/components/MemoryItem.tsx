import React, { useContext } from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/react';
import { GoogleMap, Marker } from '@react-google-maps/api';

import MemoriesContext from '../data/memories-context';

const MemoryItem: React.FC<{ type: 'good' | 'bad' }> = (props) => {
  const memoriesCtx = useContext(MemoriesContext);
  const memories = memoriesCtx.memories.filter(
    (memory) => memory.type === props.type
  );

  const mapStyles = {
    width: '100%',
    height: '20vh',
  };

  return (
    <IonGrid>
      {memories.length === 0 ? (
        <IonRow>
          <IonCol className="ion-text-center">
            <h2>No {props.type} memories found.</h2>
          </IonCol>
        </IonRow>
      ) : (
        <>
          {memories.map((memory) => (
            <IonRow key={memory.id}>
              <IonCol>
                <IonCard color="primary">
                  <img src={memory.photoUrl} alt={memory.title} width="100%" />
                  <GoogleMap
                    mapContainerStyle={mapStyles}
                    center={memory.location}
                    zoom={14}
                  >
                    <Marker position={memory.location} />
                  </GoogleMap>
                  <IonCardHeader>
                    <IonCardTitle>{memory.title}</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            </IonRow>
          ))}
        </>
      )}
    </IonGrid>
  );
};

export default MemoryItem;
