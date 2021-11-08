import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MemoriesContext, { Memory } from './memories-context';

const MemoriesContextProvider: React.FC = (props) => {
  const baseUrl = 'http://localhost:8101/api/memories';

  const [memories, setMemories] = useState<Memory[]>([]);
  const [isFetchData, setIsFetchData] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(baseUrl);
        setMemories(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    setIsFetchData(false);
  }, [isFetchData]);

  const addMemory = async (
    base64Data: string,
    title: string,
    location: { lat: number; lng: number },
    type: 'good' | 'bad'
  ) => {
    const formData = new FormData();

    formData.append('title', title);
    formData.append('type', type);
    formData.append('photo', base64Data);
    formData.append('lat', location.lat.toString());
    formData.append('lng', location.lng.toString());

    try {
      await axios.post(baseUrl, formData);
      setIsFetchData(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MemoriesContext.Provider value={{ memories, addMemory }}>
      {props.children}
    </MemoriesContext.Provider>
  );
};

export default MemoriesContextProvider;
