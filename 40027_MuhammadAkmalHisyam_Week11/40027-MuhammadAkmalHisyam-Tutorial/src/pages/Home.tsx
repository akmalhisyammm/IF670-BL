import React, { useEffect, useRef, useState } from 'react';
import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

import { firebaseApp } from '../firebaseConfig';

interface Student {
  id: string;
  nim: string;
  nama: string;
  prodi: string;
  foto: string;
  fotoUrl: string;
}

const Home: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [fileName, setFileName] = useState<string>('');
  const [students, setStudents] = useState<Array<Student>>([]);
  const [isFetchData, setIsFetchData] = useState<boolean>(false);

  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  const nim = useRef<HTMLIonInputElement>(null);
  const nama = useRef<HTMLIonInputElement>(null);
  const prodi = useRef<HTMLIonInputElement>(null);

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, 'students'));
      console.log('querySnapshot: ', querySnapshot);

      setStudents(
        querySnapshot.docs.map((doc) => ({
          ...(doc.data() as Student),
          id: doc.id,
        }))
      );

      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        console.log('doc: ', doc);
      });
    };

    getData();
    setIsFetchData(false);
  }, [db, isFetchData]);

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target!.files![0]);
    setFileName(event.target!.files![0].name);
  };

  const insertHandler = async () => {
    const storageRef = ref(storage, fileName);

    uploadBytes(storageRef, selectedFile as Blob).then(() => {
      console.log('Upload file success!');

      getDownloadURL(ref(storage, fileName)).then((url) => {
        addData(url);
      });
    });
  };

  const addData = async (url: string) => {
    try {
      const docRef = await addDoc(collection(db, 'students'), {
        nim: nim.current?.value,
        nama: nama.current?.value,
        prodi: prodi.current?.value,
        foto: fileName,
        fotoUrl: url,
      });

      console.log('Document written with ID: ', docRef.id);

      setIsFetchData(true);
    } catch (e) {
      console.error('Error adding document: ', e);
    }

    nim.current!.value = '';
    nama.current!.value = '';
    prodi.current!.value = '';
    setSelectedFile(undefined);
    setFileName('');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          <IonListHeader>
            <IonLabel>Students</IonLabel>
          </IonListHeader>

          {students.length ? (
            students.map((student) => (
              <IonItem key={student.id}>
                <IonAvatar slot="start">
                  <img src={student.fotoUrl} alt={student.id} />
                </IonAvatar>
                <IonLabel>
                  {student.nim}
                  <br />
                  {student.nama}
                  <br />
                  {student.prodi}
                </IonLabel>
              </IonItem>
            ))
          ) : (
            <p className="ion-text-center">
              Tidak ada mahasiswa yang ditemukan.
            </p>
          )}
        </IonList>

        <IonList>
          <IonListHeader>
            <IonLabel>Add Student</IonLabel>
          </IonListHeader>

          <IonItem>
            <IonLabel position="floating">NIM</IonLabel>
            <IonInput ref={nim} />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Nama</IonLabel>
            <IonInput ref={nama} />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Prodi</IonLabel>
            <IonInput ref={prodi} />
          </IonItem>
          <IonItem>
            <input type="file" onChange={fileChangeHandler} />
          </IonItem>

          <IonButton onClick={insertHandler}>Simpan</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
