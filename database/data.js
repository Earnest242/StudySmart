import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';
import {user2} from '../screens/signUp';

//var user1 = [{id: null, name1: null, course1: null, year1: null, sem1: null}];

//export var groupdata = {};
export const user1 = firebase.auth().currentUser;
export var groupUserInfo;
export var GroupUnits;
//export var userdata = {};
//export var Groupid;
export var GroupInfo1;

/*export const gettinguserdata = () => {
  getuserdata();
  async function getuserdata() {
    //userdata
    let [user_data, setUser_data] = useState({});

    var fetchUserdata = await firestore()
      .collection('Users')
      .doc(user2.uid)
      .get();
    var data4 = fetchUserdata.data();
    setUser_data(data4);
    userdata = user_data;
    Groupid = user_data.groupId;
  }
};

export const gettingdata = () => {
  // group information
  if (Groupid != null) {
    /*let [Gname, setGname] = useState(null);
    let [GYear, setGyear] = useState();
    let [Gsem, setGsem] = useState();
    let [modId, setmodId] = useState();
    let [modName, setmodname] = useState();
    let [modPhone, setmodPhone] = useState();
    let [groupinfo, setgroupInfo] = useState({});
    //users data
    let [usersInfo, setUsersInfo] = useState([]);
    //group notes
    let [gNotes, setGnotes] = useState([]);

    getGroupData();

    //getting group data
    async function getGroupData() {
      var groupdatafetch = await firestore()
        .collection('classGroups')
        .doc(Groupid)
        .get();
      var data3 = groupdatafetch.data();
      /*setgroupInfo(data3);
      setGname(data3.Group_Name);
      setGyear(data3.StudyYear);
      setGsem(data3.semister);
      setmodname(data3.moderatorName);
      setmodPhone(data3.ModeratorPhoneNo);
      setmodId(data3.moderatorId);
    }
    GroupInfo1 = groupinfo;
    groupdata = {
      Group_Name: Gname,
      StudyYear: GYear,
      semister: Gsem,
      moderatorId: modId,
      moderatorName: modName,
      ModeratorPhoneNo: modPhone,
    };
    //users info

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

    groupUserInfo = usersInfo;

    //getting groupnotes

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

    GroupUnits = gNotes;
  }
};
//userInfo*/
