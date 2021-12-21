import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

import { firebaseApp } from '../config/firebase.config';
import { Memory } from '../data/memories-context';

const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const memoriesCollectionRef = collection(db, 'memories');

const getAllMemories = async () => {
  const memories = await getDocs(memoriesCollectionRef);

  return memories.docs.map((doc) => ({
    ...(doc.data() as Memory),
    id: doc.id,
  }));
};

const createMemory = async (
  title: string,
  type: 'good' | 'bad',
  location: { lat: number; lng: number },
  fileName: string,
  photoBlob: Blob
) => {
  const storageRef = ref(storage, `memories/${fileName}`);

  try {
    await uploadBytes(storageRef, photoBlob);

    const url = await getDownloadURL(storageRef);
    await addDoc(memoriesCollectionRef, {
      title: title,
      type: type,
      location: location,
      fileName: fileName,
      photoUrl: url,
    });
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

export { getAllMemories, createMemory };
