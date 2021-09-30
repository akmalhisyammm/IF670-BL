import React from 'react';

export interface Friend {
  id: string;
  name: string;
  photo: string;
}

interface Context {
  friends: Friend[];
  addFriend: (friendName: string, friendPhoto: string) => void;
  updateFriend: (id: string, friendName: string, friendPhoto: string) => void;
  deleteFriend: (id: string) => void;
}

const FriendsContext = React.createContext<Context>({
  friends: [],
  addFriend: () => {},
  updateFriend: () => {},
  deleteFriend: () => {},
});

export default FriendsContext;
