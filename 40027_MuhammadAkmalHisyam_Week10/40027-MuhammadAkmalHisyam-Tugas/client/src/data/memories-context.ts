import React from 'react';

export interface Memory {
  id: string;
  title: string;
  lat: number;
  lng: number;
  type: 'good' | 'bad';
  photo: string;
}

const MemoriesContext = React.createContext<{
  memories: Memory[];
  addMemory: (
    base64Data: string,
    title: string,
    location: { lat: number; lng: number },
    type: 'good' | 'bad'
  ) => void;
}>({
  memories: [],
  addMemory: () => {},
});

export default MemoriesContext;
