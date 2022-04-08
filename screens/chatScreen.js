import React, {useState, useCallback, useEffect, useLayoutEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import globalstyles from '../globalstyles';
import {GiftedChat} from 'react-native-gifted-chat';
import { user1 } from '../database/data';
import firestore from '@react-native-firebase/firestore';
import { Groupid } from './home';
import {groupdata} from './home';

function chatScreen({route,navigation, props}) {
  let [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        sent: true,
        received: true,
        renderTicks: true,
        user: {
          _id: 2,
          name: 'React Native',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const {_id, createdAt, text, user} = messages[0];
    firestore()
      .collection('classGroups')
      .doc(Groupid)
      .collection('messages')
      .add({_id, createdAt, text, user});
  }, []);

  useLayoutEffect(() => {
    const unsubscribe = firestore()
      .collection('classGroups')
      .doc(Groupid)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot =>
        setMessages(
          snapshot.docs.map(doc => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          })),
        ),
      );
    return unsubscribe;
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          backgroundColor: '#0F1D41',
          height: 45,
          //borderBottomLeftRadius: 8,
          //borderBottomRightRadius: 8,
        }}>
        <TouchableOpacity
          style={{flexDirection: 'row', width: '100%'}}
          onPress={() => navigation.navigate('groupscreen')}>
          <View
            style={{
              backgroundColor: '#D3DAEE',
              height: 30,
              width: 30,
              borderRadius: 15,
              marginLeft: 15,
            }}></View>
          <Text
            style={{
              color: 'white',
              fontSize: 21,
              //fontFamily: 'georgia',
              //fontStyle: 'italic',
              paddingLeft: '17%',
            }}>
            {route.params.groupName}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: 'white',
            fontSize: 10,
            paddingLeft: '39%',
            paddingBottom: 4,
          }}>
          Tap for group info...
        </Text>
      </View>
      <GiftedChat
        isTyping={true}
        textInputStyle={{borderRadius: 20, backgroundColor: 'grey'}}
        messages={messages}
        renderUsernameOnMessage={true}
        onSend={messages => onSend(messages)}
        user={{
          _id: user1.uid,
          name: 'earnest',
          //avatar: auth?.currentUser?.photoURL,
        }}
      />
    </View>
  );
}

export default chatScreen;
