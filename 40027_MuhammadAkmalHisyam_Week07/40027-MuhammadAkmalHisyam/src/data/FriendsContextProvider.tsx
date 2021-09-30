import React, { useState } from 'react';
import FriendsContext, { Friend } from './friend-context';

const FriendsContextProvider: React.FC = (props) => {
  const randImageId = () => {
    return Math.floor(Math.random() * 70) + 1;
  };

  const [friends, setFriends] = useState<Friend[]>([
    {
      id: 'f1',
      name: 'John Thor',
      photo: `https://i.pravatar.cc/300?img=${randImageId()}`,
    },
  ]);

  const addFriend = (name: string, photo: string) => {
    const currIdNumber = friends.length
      ? friends[friends.length - 1].id.replace(/[^0-9]/g, '')
      : 0;

    const newFriend: Friend = {
      id: `f${+currIdNumber + 1}`,
      name: name,
      photo: photo + randImageId(),
    };

    const updatedFriends = [...friends, newFriend];

    setFriends(updatedFriends);
  };

  const updateFriend = (id: string, name: string, photo: string) => {
    const updateFriend: Friend = {
      id: id,
      name: name,
      photo: photo + randImageId(),
    };

    const updatedFriends = friends.map((friend) =>
      friend.id === id ? updateFriend : friend
    );

    setFriends(updatedFriends);
  };

  const deleteFriend = (id: string) => {
    const updatedFriends = friends.filter((friend) => friend.id !== id);

    setFriends(updatedFriends);
  };

  return (
    <FriendsContext.Provider
      value={{
        friends,
        addFriend,
        updateFriend,
        deleteFriend,
      }}
    >
      {props.children}
    </FriendsContext.Provider>
  );
};

export default FriendsContextProvider;
