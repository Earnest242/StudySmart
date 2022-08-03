import React, {useState, useCallback, useEffect, useLayoutEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import globalstyles from '../globalstyles';
import {GiftedChat} from 'react-native-gifted-chat';
import { user1 } from '../database/data';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';
import { Groupid } from './home';
import {groupdata} from './home';

function chatScreen({route,navigation, props}) {
  var user2 = firebase.auth().currentUser;
  let [messages, setMessages] = useState([]);
  useEffect(() => {
    
    setMessages([
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
console.log(messages)
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
        <TouchableOpacity
          style={{backgroundColor: '#0F1D41',height: 45,width: '100%', justifyContent:'center', alignItems:'center'}}
          onPress={() => navigation.navigate('groupscreen', Groupid)}>
          <Text
            style={{
              color: 'white',
              fontSize: 21,
              //fontFamily: 'georgia',
              //fontStyle: 'italic',
            }}>
            {route.params.groupName}
          </Text>
          <Text
          style={{
            color: 'white',
            fontSize: 10,
            paddingBottom: 4,
          }}>
          Tap for group info...
        </Text>
        </TouchableOpacity>
      <GiftedChat
        isTyping={true}
        textInputStyle={{borderRadius: 20, backgroundColor: 'grey'}}
        messages={messages}
        renderUsernameOnMessage={true}
        onSend={messages => onSend(messages)}
        user={{
          _id: user2.uid,
          name: 'earnest',
          //avatar: auth?.currentUser?.photoURL,
        }}
      />
    </View>
  );
}

export default chatScreen;
