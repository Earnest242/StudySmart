/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, StatusBar, Modal, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { user1 } from '../database/data';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//export var groupdata = {};
//export var groupUserInfo;
//export var GroupUnits;
export var userdata;
export var Groupid;

const homeScreen = ({navigation}) => {
  var user2 = firebase.auth().currentUser;
  //getuserdata();

  let [user_data, setUser_data] = useState({});
  let [floatmodal, setfloatmodal] = useState(false);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(user1.uid)
      .onSnapshot(documentSnapshot => {
        console.log('User data55: ', documentSnapshot.data());
        setUser_data(documentSnapshot.data());
      });
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);
  userdata = user_data;
  console.log(userdata);
  Groupid = userdata.groupId;
  console.log(Groupid);

  const joingroupnav = props => {
    navigation.navigate(props);
    setfloatmodal(false);
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor="#0F1D41" />
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#0F1D41',
          height: 57,
          //borderBottomLeftRadius: 12,
          //borderBottomRightRadius: 12,
          //justifyContent:'center',
          alignContent:'center'
        }}>
          
        <TouchableOpacity
          style={{marginLeft: 18, marginTop: 5}}
          onPress={() => navigation.openDrawer()}>
          <Icon name="bars" color="white" size={30} />
        </TouchableOpacity>
        <Text
          style={{
            color: 'white',
            fontSize: 28,
            fontFamily: 'georgia',
            fontStyle: 'italic',
            marginLeft: 25,
          }}>
          icllass
        </Text>
      </View>
      {Groupid != null ? (
        <View>
        <View
          style={{
            marginTop: 10,
            height: 100,
            width: '100%',
            marginLeft: 15,
            //paddingRight: 15,
            //borderRadius: 5,
            flexDirection: 'row',
          }}
          >
          <Text
            style={{
              color: '#0F1D41',
              fontSize: 20,
              fontWeight:'bold',
              fontFamily: 'georgia',
              marginLeft: 75,
              marginTop: 15,
            }}>
            {user_data.groupName}
          </Text>
        </View>
        <View style={{paddingTop:180}}>
          <View style={{flexDirection:'row', justifyContent:'space-around'}}>
            <TouchableOpacity style={{backgroundColor:'#0F1D41', height:90, width:150, borderRadius:15, justifyContent:'center',
          alignItems:'center'}}
          onPress={() => navigation.navigate('chatscreen', user_data)}>
              <Text style={{color:'white', fontSize:20}}>Chatroom</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
      ) : (
        <View
          style={{
            alignSelf: 'center',
            marginTop: '60%',
            alignItems: 'center',
            width: 200,
          }}>
          <AntDesign name="adduser" size={50} color="grey" />
          <Text style={{color: 'grey'}}>
            {' '}
            You don't belong to a group. Tap on the icon below to create or join
            a group
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 35,
          right: 20,
          alignSelf: 'flex-end',
          alignItems: 'center',
          backgroundColor: '#0F1D41',
          height: 60,
          width: 60,
          borderRadius: 53,
        }}
        onPress={() => setfloatmodal(true)}>
        <Text style={{fontSize: 42, color: 'white'}}>+</Text>
      </TouchableOpacity>
      <Modal visible={floatmodal} animationType="slide" transparent={true}>
        <View
          style={{
            position: 'absolute',
            bottom: 100,
            right: 20,
            padding: 6,
            alignSelf: 'flex-end',
            //borderWidth: 1,
            //borderColor: 'grey',
            //height: 140,
            width: 140,
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
          <TouchableOpacity onPress={() => joingroupnav('creategroup')}>
            <Text
              style={{
                color: 'dodgerblue',
                fontSize: 18,
                marginBottom: 15,
                fontFamily: 'georgia',
              }}>
              Create group
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => joingroupnav('joingroup')}>
            <Text
              style={{
                color: 'dodgerblue',
                fontSize: 18,
                marginBottom: 15,
                fontFamily: 'georgia',
              }}>
              Join group
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setfloatmodal(false)}>
            <Text
              style={{
                color: 'dodgerblue',
                fontSize: 18,
                fontFamily: 'georgia',
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default homeScreen;
