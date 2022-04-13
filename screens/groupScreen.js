import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import globalstyles from '../globalstyles';
import { Groupid } from './home';

export var GroupData;

function groupScreen({route, navigation}) {
  const [groupdata,setgroupdata] = useState({});
  const [usersInfo, setUsersInfo] = useState([]);
  const groupid = route.params;

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
      <View>
          <Text style={{color: 'dodgerblue', fontSize: 18}}>
            ClassModerator
          </Text>
          <Text style={{color: 'dodgerblue', fontSize: 18}}>
            {groupdata.name}
          </Text>
          <Text style={{color: 'dodgerblue', fontSize: 18}}>
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
                <View
                  style={{
                    backgroundColor: '#D3DAEE',
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                  }}></View>
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
        <ScrollView>
          <TouchableOpacity>
            <Text style={{color: 'dodgerblue', fontSize: 15}}>Leave Group</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{color: 'dodgerblue', fontSize: 15}}>
              Invite member
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
    </View>
  );
}

export default groupScreen;
