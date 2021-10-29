import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Geolocation } from '@capacitor/geolocation';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const Home: React.FC = () => {
  const apiKey = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

  const [lat, setLat] = useState<number>(-6.257377926995551);
  const [lng, setLng] = useState<number>(106.61829861017398);

  const selectPos = (e: google.maps.MapMouseEvent) => {
    if (e.latLng?.lat()) setLat(e.latLng?.lat());
    if (e.latLng?.lng()) setLng(e.latLng?.lng());
  };

  const getCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
    });

    console.log('Current position: ', coordinates);
    console.log('Lat: ', coordinates.coords.latitude);
    console.log('Lng: ', coordinates.coords.longitude);

    setLat(coordinates.coords.latitude);
    setLng(coordinates.coords.longitude);
  };

  const trackPosition = async () => {
    await Geolocation.watchPosition(
      {
        enableHighAccuracy: true,
        timeout: 1000,
      },
      (position, err) => {
        if (position) console.log(position);
        if (err) console.error(err);
      }
    );
  };

  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={getCurrentPosition}>Current Position</IonButton>
        <IonButton onClick={trackPosition}>Track Position</IonButton>
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: lat, lng: lng }}
            zoom={18}
            onClick={selectPos}
          >
            <Marker position={{ lat: lat, lng: lng }} />
          </GoogleMap>
        </LoadScript>
      </IonContent>
    </IonPage>
  );
};

export default Home;
