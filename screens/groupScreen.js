import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, FlatList, Modal, ToastAndroid} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import globalstyles from '../globalstyles';
import { Groupid } from './home';
import {firebase} from '@react-native-firebase/auth';

export var GroupData;

function groupScreen({route, navigation}) {
  const [groupdata,setgroupdata] = useState({});
  const [usersInfo, setUsersInfo] = useState([]);
  let [delModal, setDelmodal] = useState(false);
  let [inviteMemModal, setInviteMemModal] = useState(false);
  const groupid = route.params;
  let user2 = firebase.auth().currentUser;

  useEffect(() => {
    
    const subscriber = firestore()
      .collection('classGroups')
      .doc(groupid)
      .onSnapshot(documentSnapshot => {
        setgroupdata(documentSnapshot.data());
      });
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);
//function to leave the group
  function LeaveGroup (){
    console.log('deleting')
    firestore()
        .collection('Users')
        .doc(`${user2.uid}`)
        .update({groupId:null, groupName:null});
      
        ToastAndroid.show('left the group', ToastAndroid.SHORT);
        navigation.navigate('StudySmart');
     
  }
  //function to invite member
  
GroupData = groupdata;

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .where('groupId', '==', Groupid)
      .onSnapshot(snapshot =>
        setUsersInfo(
          snapshot.docs.map(doc => ({
            UserId: doc.data().userId,
            UserName: doc.data().name,
            PhoneNo: doc.data().phoneNumber,
          })),
        ),
      );
      console.log(usersInfo)
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  //leaving group

  return (
    <View style={globalstyles.container}>
      <View
        style={{
          backgroundColor: '#0F1D41',
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          padding: 8,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            //marginTop: 15,
          }}>
          <View
            style={{
              backgroundColor: '#D3DAEE',
              height: 70,
              width: 70,
              borderRadius: 35,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'tomato', fontSize: 20}}>
              {'CS'}
            </Text>
          </View>
          <Text style={{color: 'white', fontSize: 20, fontFamily: 'georgia'}}>
            {groupdata.Group_Name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'dodgerblue', fontSize: 18}}>
              Year {groupdata.StudyYear}
            </Text>
            <Text style={{color: 'tomato', fontSize: 18, paddingLeft: 8}}>
              Sem {groupdata.semister}
            </Text>
          </View>
          <TouchableOpacity
        style={{
          borderRadius: 35,
          width: '75%',
          backgroundColor: 'white',
          alignSelf: 'center',
          alignItems: 'center',
          height: 50,
          justifyContent: 'center',
          marginBottom:10, marginTop:7
        }}
        onPress={() => navigation.navigate('groupinfo')}>
        <Text
          style={{
            color: '#0F1D41',
            fontFamily: 'georgia',
            fontSize: 25,
            fontStyle: 'italic',
            fontWeight: 'bold',
          }}>
          Class resources
        </Text>
      </TouchableOpacity>
        </View>
        
      </View>
      <View style={{paddingLeft:10}}>
          <Text style={{color: 'tomato', fontSize: 18}}>
            ClassModerator
          </Text>
          <Text style={{color: 'dodgerblue', fontSize: 16, paddingLeft:15}}>
            {groupdata.name}
          </Text>
          <Text style={{color: 'dodgerblue', fontSize: 16, paddingLeft:15}}>
            {groupdata.ModeratorPhoneNo}
          </Text>
        </View>
      <View style={{padding: 10}}>
        <Text style={{color: 'tomato', fontSize: 18, fontFamily: 'georgia'}}>
          Members
        </Text>
        <FlatList
          data={usersInfo}
          keyExtractor={item => item.UserId}
          renderItem={({item}) => (
            <TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                
                <Text
                  style={{
                    color: 'dodgerblue',
                    fontSize: 15,
                    paddingLeft: 10,
                    fontWeight: 'bold',
                  }}>
                  {item.UserName}
                </Text>
              </View>
              <Text
                style={{color: 'dodgerblue', fontSize: 15, paddingLeft: 10}}>
                {item.PhoneNo}
              </Text>
            </TouchableOpacity>
          )}
        />
        
      </View>
      <Modal visible={delModal} transparent={true}>
        <View style={{flex:1, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
        <View style={{backgroundColor:'#0F1D41', width:'80%', borderRadius:20, padding:10}}>
          <Text style={{color:'white', fontSize:18}}>Are you sure you want to leave the group?</Text>
          <View style={{flexDirection:'row', justifyContent:'space-between', padding:17}}>
            <TouchableOpacity onPress={()=>setDelmodal(false)} >
              <Text style={{color:'white', fontSize:18}}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>LeaveGroup()}>
              <Text style={{color:'red', fontSize:18}}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
      </Modal>
      <Modal visible={inviteMemModal} transparent={true}>
        <View style={{flex:1, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
        <View style={{backgroundColor:'#0F1D41', width:'80%', borderRadius:20, padding:10}}>
          <Text style={{color:'white', fontSize:15}}>Copy and send this code to your friend</Text>
          <Text style={{color:'white', fontSize:15, padding:15}} selectable>{groupid}</Text>
            <TouchableOpacity onPress={()=>setInviteMemModal(false)} >
              <Text style={{color:'white', fontSize:15}}>close</Text>
            </TouchableOpacity>
        </View>
        </View>
      </Modal>
      <View style={{position:'absolute', bottom:10, paddingLeft:10}}>
      <TouchableOpacity onPress={()=>setInviteMemModal(true)}>
            <Text style={{color: 'dodgerblue', fontSize: 18}}>
              Invite member
            </Text>
            </TouchableOpacity>
          <TouchableOpacity onPress={()=>setDelmodal(true)}>
            <Text style={{color: 'dodgerblue', fontSize: 18}}>Leave Group</Text>
          </TouchableOpacity>
          
          
        </View>
    </View>
  );
}

export default groupScreen;
