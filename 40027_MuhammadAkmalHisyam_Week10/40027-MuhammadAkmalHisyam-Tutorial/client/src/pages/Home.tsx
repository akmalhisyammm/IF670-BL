import { useEffect, useRef, useState } from 'react';
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
import axios from 'axios';

interface Student {
  nim: string;
  nama: string;
  prodi: string;
  foto?: string;
}

const Home: React.FC = () => {
  const baseUrl = 'http://localhost:8101/api/students';

  const [students, setStudents] = useState<Array<Student>>([]);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isFetchData, setIsFetchData] = useState<boolean>(false);

  const nim = useRef<HTMLIonInputElement>(null);
  const nama = useRef<HTMLIonInputElement>(null);
  const prodi = useRef<HTMLIonInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(baseUrl);
        setStudents(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    setIsFetchData(false);
  }, [isFetchData]);

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target!.files![0]);
  };

  const insertHandler = async () => {
    const formData = new FormData();

    const inNim = nim.current?.value as string;
    const inNama = nama.current?.value as string;
    const inProdi = prodi.current?.value as string;

    formData.append('nim', inNim);
    formData.append('nama', inNama);
    formData.append('prodi', inProdi);
    formData.append('foto', selectedFile as File);

    try {
      await axios.post(baseUrl, formData);
      setIsFetchData(true);
    } catch (err) {
      console.error(err);
    }

    nim.current!.value = '';
    nama.current!.value = '';
    prodi.current!.value = '';
    setSelectedFile(undefined);
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
              <IonItem key={student.nim}>
                <IonAvatar slot="start">
                  <img
                    src={`http://localhost:8101/${
                      student.foto ?? 'uploads/avatar.png'
                    }`}
                    alt={student.nama}
                  />
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
