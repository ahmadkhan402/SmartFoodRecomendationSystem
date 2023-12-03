import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useRoute } from '@react-navigation/native';
import { collection, doc, query, onSnapshot, orderBy, addDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Make sure your Firebase configuration is correctly imported

const ChatScreen = () => {

  const [messageList, setMessageList] = useState([]);
  console.log(messageList)
  const route = useRoute();

  useEffect(() => {
    const chatDocId = route.params.id + route.params.data.Id;
    const chatDocRef = doc(db, 'chats', chatDocId);
    const messagesCollectionRef = collection(chatDocRef, 'messages');
    const messagesQuery = query(messagesCollectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const allmessages = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          _id: doc.id, // Ensure each message has a unique _id
          createdAt: data.createdAt.toDate(),
        };
      });
      setMessageList(allmessages);
    });

    return () => unsubscribe();
  }, [route.params.id, route.params.data.Id]);

  const onSend = useCallback(async (messages = []) => {
    const msg = messages[0];

    const userId = route.params.id; 

    const myMsg = {
      ...msg,
      user: {
        _id: userId,
        name: route.params.id, // You may need to adjust this to get the actual user's name
      },
      createdAt: new Date(),
    };

    setMessageList((previousMessages) =>
      GiftedChat.append(previousMessages, myMsg)
    );

    const chatDocId1 = route.params.id + route.params.data.Id;
    const chatDocId2 = route.params.data.Id + route.params.id;

    const messagesCollectionRef1 = collection(doc(db, 'chats', chatDocId1), 'messages');
    const messagesCollectionRef2 = collection(doc(db, 'chats', chatDocId2), 'messages');

    await addDoc(messagesCollectionRef1, myMsg);
    await addDoc(messagesCollectionRef2, myMsg);
  }, [route.params.id, route.params.data.Id]);

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messageList}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: route.params.id,
        }}
      />
    </View>
  );
};

export default ChatScreen;
