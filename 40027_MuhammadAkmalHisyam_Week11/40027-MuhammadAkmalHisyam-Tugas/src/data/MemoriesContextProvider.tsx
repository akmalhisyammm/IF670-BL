import React, { useEffect, useState } from 'react';
import MemoriesContext, { Memory } from './memories-context';

import { getAllMemories, createMemory } from '../services/firebase';

const MemoriesContextProvider: React.FC = (props) => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isFetchData, setIsFetchData] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllMemories();

        setMemories(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    setIsFetchData(false);
  }, [isFetchData]);

  const addMemory = async (
    title: string,
    location: { lat: number; lng: number },
    type: 'good' | 'bad',
    fileName: string,
    base64: string
  ) => {
    const base64Res = await fetch(base64);
    const photoBlob = await base64Res.blob();

    await createMemory(title, type, location, fileName, photoBlob);

    setIsFetchData(true);
  };

  return (
    <MemoriesContext.Provider value={{ memories, addMemory }}>
      {props.children}
    </MemoriesContext.Provider>
  );
};

export default MemoriesContextProvider;
