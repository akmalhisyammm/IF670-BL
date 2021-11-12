import React from 'react';

export interface Memory {
  id: string;
  title: string;
  location: { lat: number; lng: number };
  type: 'good' | 'bad';
  photoUrl: string;
}

const MemoriesContext = React.createContext<{
  memories: Memory[];
  addMemory: (
    title: string,
    location: { lat: number; lng: number },
    type: 'good' | 'bad',
    fileName: string,
    base64: string
  ) => void;
}>({
  memories: [],
  addMemory: () => {},
});

export default MemoriesContext;
