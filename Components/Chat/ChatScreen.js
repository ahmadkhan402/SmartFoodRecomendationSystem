import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, Button, Text, StyleSheet } from 'react-native';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'; // Make sure these imports are correct
import { db } from '../../firebase'; // Check the import path

const ChatScreen = ({ userUid, receiverUid }) => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  // Firestore collection reference
  const messagesRef = collection(db, 'messages');

  // Function to send a message
  const sendMessage = async (text, senderUid, receiverUid) => {
    const messageData = {
      text,
      senderUid,
      receiverUid,
      timestamp: serverTimestamp(),
    };

    await addDoc(messagesRef, messageData);
  }

  // Function to listen for new messages
  const listenForMessages = (userUid, callback) => {
    const q = query(
      messagesRef,
      orderBy('timestamp'),
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        const message = doc.data();
        if (
          (message.senderUid === userUid && message.receiverUid === receiverUid) ||
          (message.senderUid === receiverUid && message.receiverUid === userUid)
        ) {
          messages.push(message);
        }
      });
      callback(messages);
    });

    return unsubscribe;
  }

  useEffect(() => {
    const unsubscribe = listenForMessages(userUid, (newMessages) => {
      setMessages(newMessages);
    });
    return () => unsubscribe();
  }, [userUid, receiverUid]);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.timestamp.toMillis().toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              {
                alignSelf: item.senderUid === userUid ? 'flex-end' : 'flex-start',
              },
            ]}
          >
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={messageText}
          onChangeText={setMessageText}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={() => sendMessage(messageText, userUid, receiverUid)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  message: {
    backgroundColor: '#ECECEC',
    padding: 10,
    borderRadius: 10,
    margin: 5,
    maxWidth: '80%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 10,
    paddingLeft: 15,
  },
});

export default ChatScreen;
