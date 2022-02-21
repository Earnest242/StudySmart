/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, StatusBar, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {user2} from './signUp';
import firestore from '@react-native-firebase/firestore';

export var groupdata = {};
export var groupUserInfo;
export var GroupUnits;
export var userdata;
export var Groupid;

const homeScreen = ({navigation}) => {
  getuserdata();

  let [user_data, setUser_data] = useState({});
  let [floatmodal, setfloatmodal] = useState(false);
  //group
  let [GInfo, setGInfo] = useState();
  let [Gname, setGname] = useState(null);
  let [GYear, setGyear] = useState();
  let [Gsem, setGsem] = useState();
  let [modId, setmodId] = useState();
  let [modName, setmodname] = useState();
  let [modPhone, setmodPhone] = useState();
  //users data
  let [usersInfo, setUsersInfo] = useState([]);
  //group notes
  let [gNotes, setGnotes] = useState([]);
  //userdata function

  useEffect(() => {
    getGroupData();
  }, [Groupid]);
  getGroupData();
  async function getuserdata() {
    var fetchUserdata = await firestore()
      .collection('Users')
      .doc(user2.uid)
      .get();
    var data4 = fetchUserdata.data();
    setUser_data(data4);
  }
  userdata = user_data;
  Groupid = userdata.groupId;

  //getting group data
  async function getGroupData() {
    if (Groupid != null) {
      var groupdatafetch = await firestore()
        .collection('classGroups')
        .doc(Groupid)
        .get();
      var data3 = groupdatafetch.data();
      setGname(data3.Group_Name);
      setGyear(data3.StudyYear);
      setGsem(data3.semister);
      setmodname(data3.moderatorName);
      setmodPhone(data3.ModeratorPhoneNo);
      setmodId(data3.moderatorId);

      groupdata = {
        Group_Name: Gname,
        StudyYear: GYear,
        semister: Gsem,
        moderatorId: modId,
        moderatorName: modName,
        ModeratorPhoneNo: modPhone,
      };
    }
  }

  //users info

  if (Groupid != null) {
    firestore()
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
  }

  groupUserInfo = usersInfo;

  //getting groupnotes

  if (Groupid != null) {
    firestore()
      .collection('classGroups')
      .doc(Groupid)
      .collection('units')
      .onSnapshot(snapshot =>
        setGnotes(
          snapshot.docs.map(doc => ({
            UnitId: doc.data().UnitId,
            UnitCode: doc.data().UnitCode,
            UnitName: doc.data().UnitName,
            notes: doc.data().notes,
          })),
        ),
      );
  }

  GroupUnits = gNotes;

  const joingroupnav = props => {
    navigation.navigate(props);
    setfloatmodal(false);
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#0F1D41',
          height: 57,
          //borderBottomLeftRadius: 12,
          //borderBottomRightRadius: 12,
        }}>
        <StatusBar backgroundColor="#0F1D41" />
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
            marginLeft: 70,
          }}>
          Study
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 28,
            fontFamily: 'georgia',
            fontStyle: 'italic',
          }}>
          Smart
        </Text>
      </View>
      {Groupid != null ? (
        <TouchableOpacity
          style={{
            marginTop: 10,
            height: 100,
            width: '100%',
            marginLeft: 15,
            //paddingRight: 15,
            //borderRadius: 5,
            flexDirection: 'row',
          }}
          onPress={() => navigation.navigate('chatscreen')}>
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
              fontSize: 20,
              fontFamily: 'georgia',
              marginLeft: 10,
              marginTop: 4,
            }}>
            {groupdata.Group_Name}
          </Text>
          <Icon
            name="angle-right"
            color="dodgerblue"
            size={28}
            style={{marginLeft: '30%', marginTop: 6}}
          />
        </TouchableOpacity>
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
