import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ToastAndroid,
  Button,
  StatusBar,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import globalstyles from '../globalstyles';
//import {user2} from './signUp';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {firebase} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import {userdata} from './home';

//export var Groupid = null;

export const creategroup = ({navigation}) => {
  let [GroupName, setGroupName] = useState(null);
  let [yearOfStudy, setyear] = useState(null);
  let [sem, setsemister] = useState(null);
  let [groupId2, setgroupid2] = useState();

  var user2 = firebase.auth().currentUser;

  //CREATE GROUP
  const creategroup2 = () => {
    if (GroupName && yearOfStudy && sem != null) {
      let d = new Date().getTime();
      let group_Id = 'dsKeXjd' + `${user2.uid}` + `${d}`;
      try {
        let createAgroup = firestore()
          .collection('classGroups')
          .doc(group_Id)
          .set({
            groupId: group_Id,
            Group_Name: GroupName,
            moderatorId: user2.uid,
            ModeratorPhoneNo:user2.phoneNumber,
            name: userdata.name,
            StudyYear: yearOfStudy,
            semister: sem,
          });
        if (createAgroup) {
          firestore()
            .collection('classGroups')
            .doc(group_Id)
            .collection('messages')
            .add({});
          firestore()
            .collection('classGroups')
            .doc(group_Id)
            .collection('units')
            .add({});
            firestore()
            .collection('classGroups')
            .doc(group_Id)
            .collection('timetables')
            .add({});
            firestore()
            .collection('classGroups')
            .doc(group_Id)
            .collection('assignments')
            .add({});
          firestore()
            .collection('Users')
            .doc(user2.uid)
            .set({groupId: group_Id, groupName:GroupName}, {merge: true});
          ToastAndroid.show('Group created', ToastAndroid.SHORT);
          //Groupid = group_Id;
          //console.log(Groupid);
          navigation.navigate('StudySmart');
        }
      } catch (error) {
        alert(error);
      }
    } else {
      alert('All fields must be filles');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        //alignItems: 'center',
        flexDirection: 'column',
      }}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          flexDirection: 'row',
          top: 8,
          left: 7,
        }}
        onPress={() => navigation.navigate('StudySmart')}>
        <AntDesign name="arrowleft" size={30} color="#0F1D41" />
        <Text
          style={{
            fontSize: 18,
            color: '#0F1D41',
            paddingLeft: 10,
            fontWeight: 'bold',
          }}>
          Back
        </Text>
      </TouchableOpacity>
      <View style={{marginLeft: 30}}>
        <Text style={globalstyles.text1}>Course Name/Group Name</Text>
        <TextInput
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#0F1D41',
            width: 250,
            color: '#0F1D41',
          }}
          placeholderTextColor="#0F1D41"
          placeholder="e.g education"
          onChangeText={setGroupName}
        />
        <Text style={globalstyles.text1}>Year Of study</Text>
        <TextInput
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#0F1D41',
            width: 250,
            color: '#0F1D41',
          }}
          placeholderTextColor="#0F1D41"
          keyboardType="numeric"
          maxLength={1}
          placeholder="e.g 3"
          onChangeText={setyear}
        />
        <Text style={globalstyles.text1}>Semister</Text>
        <TextInput
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#0F1D41',
            width: 250,
            color: '#0F1D41',
          }}
          placeholderTextColor="#0F1D41"
          keyboardType="numeric"
          maxLength={1}
          placeholder="e.g 1"
          onChangeText={setsemister}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#0F1D41',
          position: 'absolute',
          alignSelf: 'flex-end',
          height: 50,
          width: 250,
          borderColor: '#0F1D41',
          borderWidth: 1,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          bottom: 80,
          right: 50,
        }}
        onPress={() => creategroup2(GroupName, yearOfStudy, sem)}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
          Create
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const joinGroup = ({navigation}) => {
  let [JoinGropiId, setJoinGroupId] = useState('');

  var user2 = firebase.auth().currentUser;

  //JOIN GROUP
  const JoinGroup = async () => {
    if (JoinGropiId !== '') {
      try {
        groupId3 = JoinGropiId;
        let joing = await firestore()
          .collection('Users')
          .doc(user2.uid)
          .set({groupId: JoinGropiId}, {merge: true});
        if (joing) {
          ToastAndroid.show('Joined group', ToastAndroid.SHORT);
          navigation.navigate('StudySmart');
        }
      } catch (error) {
        alert(error);
      }
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
      }}>
      <TouchableOpacity
        style={{flexDirection: 'row', marginTop: 6, marginLeft: 7}}
        onPress={() => navigation.navigate('StudySmart')}>
        <AntDesign name="arrowleft" size={30} color="#0F1D41" />
        <Text
          style={{
            fontSize: 18,
            color: '#0F1D41',
            paddingLeft: 10,
            fontWeight: 'bold',
          }}>
          Back
        </Text>
      </TouchableOpacity>
      <View
        style={{
          alignSelf: 'center',
          marginTop: '70%',
        }}>
        <Text style={{color: '#0F1D41', fontSize: 18, fontWeight: 'bold'}}>
          enter group code
        </Text>
        <TextInput
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#0F1D41',
            width: 250,
            color: '#0F1D41',
          }}
          placeholder="group code"
          placeholderTextColor="#0F1D41"
          onChangeText={setJoinGroupId}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#0F1D41',
          position: 'absolute',
          alignSelf: 'flex-end',
          height: 50,
          width: 250,
          borderColor: '#0F1D41',
          borderWidth: 1,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          bottom: 80,
          right: 50,
        }}
        onPress={() => JoinGroup(JoinGropiId)}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
          Join
        </Text>
      </TouchableOpacity>
    </View>
  );
};
