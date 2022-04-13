import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
  FlatList,
  ToastAndroid,
} from 'react-native';
import globalstyles from '../globalstyles';
import firestore from '@react-native-firebase/firestore';
import { GroupData } from './groupScreen';
import { user1 } from '../database/data';

var test = true;

const units = ({route, navigation}) => {
  var units5 = route.params;
  
  const [modalOp, setModalOp] = useState(false);
  const [sunits, setSunits] = useState('');
  const [inCode, setIncode] = useState('');
  const [delModal, setDelModal]=useState(false)
  let [units, setunits]=useState([]);
  let [deleteID, setdeleteID] = useState('');

  //checking for moderator id
  const checkid = () => {
    if ( GroupData.moderatorId == user1.uid ) {
      setModalOp(true);
    } else {
      ToastAndroid.show(
        'Sorry only class moderators can edit',
        ToastAndroid.LONG,
      );
    }
  };

   function addUnits2 (sunits, inCode) {
    if (sunits && inCode !== '') {
      let d = new Date().getTime();
      let unit_Id = `${d}`; 
      try {
        let addunit = firestore()
          .collection('classGroups')
          .doc(GroupData.groupId)
          .collection('units')
          .doc(unit_Id)
          .set({UnitId: unit_Id, UnitCode: inCode.toUpperCase(), UnitName: sunits});
        if (addunit) {
          firestore()
            .collection('classGroups')
            .doc(GroupData.groupId)
            .collection('units')
            .doc(unit_Id)
            .collection('notes')
            .add({});
          ToastAndroid.show('Unit added', ToastAndroid.SHORT);
          setModalOp(false);
        }
      } catch (error) {
        alert('Unable to add unit');
        setModalOp(false);
      }
    } else {
      alert('All fields must be filled');
    }
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('classGroups')
      .doc(GroupData.groupId)
      .collection('units')
      .onSnapshot(snapshot =>
        setunits(
          snapshot.docs.map(doc => ({
            UnitId: doc.data().UnitId,
            UnitCode: doc.data().UnitCode,
            UnitName: doc.data().UnitName,
            notes: doc.data().notes,
          })),
        ),
      );
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);
//del modal
const delMOdal2 =(unitID)=>{
  setDelModal(true);
  setdeleteID(unitID)
}
  //deleting a unit
  function deleteUnit (){
    try{
    const delete45 = firestore().
    collection('classGroups').doc(GroupData.groupId).collection('units').
    doc(deleteID).delete();
    if (delete45){
      ToastAndroid.show('Deleted', ToastAndroid.SHORT);
      setDelModal(null);
    }
    }catch (error){
      alert(error);
    }
  }
  

  return (
    <View style={{flex: 1, backgroundColor: '#0F172A'}}>
      <Modal visible={modalOp} animationType="fade" transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.modalv}>
            <Text
              style={{
                fontSize: 20,
                marginLeft: 10,
                color: 'dodgerblue',
                alignSelf: 'center',
                fontWeight: 'bold',
              }}>
              Fill UP THE FIELDS
            </Text>
            <TextInput
              style={styles.TextIn}
              placeholder="Course Code"
              onChangeText={setIncode}
            />
            <TextInput
              style={styles.TextIn}
              placeholder="Course Title"
              onChangeText={setSunits}
            />
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                //marginLeft: 20,
                justifyContent: 'space-evenly',
              }}>
              <Button title="Cancel" onPress={() => setModalOp(false)} />
              <Button title="Save" onPress={() => addUnits2(sunits, inCode)} />
            </View>
          </View>
        </View>
      </Modal>
      <FlatList
        data={units}
        keyExtractor={item => item.UnitId}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.toucho}
            onPress={() => navigation.navigate('notespage', item)}
            onLongPress={()=>delMOdal2(item.UnitId)}>
            <Text style={styles.Fview1}>
              {item.UnitCode}:{item.UnitName}
            </Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.Flot} onPress={() => checkid()}>
        <Text style={{fontSize: 42, color: 'white'}}>+</Text>
      </TouchableOpacity>
      <Modal visible={delModal} transparent={true}>
        <View style={{flex:1, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
        <View style={{backgroundColor:'white', height:90, width:'80%', borderRadius:20, padding:10}}>
          <Text style={{color:'dodgerblue', fontSize:18}}>Do you want to delete the unit?</Text>
          <View style={{flexDirection:'row', justifyContent:'space-between', padding:17}}>
            <TouchableOpacity onPress={()=>setDelModal(false)} >
              <Text style={{color:'dodgerblue', fontSize:18}}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>deleteUnit(deleteID)}>
              <Text style={{color:'red', fontSize:18}}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
      </Modal>
    </View>
  );
};

export default units;

const styles = StyleSheet.create({
  container3: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  toucho: {
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderRadius: 13,
    justifyContent: 'center',
    height: 65,
  },
  Fview1: {
    fontSize: 17,
    paddingLeft: 10,
    color: 'white',
  },
  Flot: {
    marginBottom: 30,
    marginRight: 13,
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'dodgerblue',
    height: 60,
    width: 60,
    borderRadius: 53,
  },
  modalv: {
    height: 300,
    width: 300,
    backgroundColor: 'darkblue',
    borderRadius: 10,
    justifyContent: 'center',
    //lignItems: "center",
    padding: 25,
  },
  TextIn: {
    height: 45,
    width: 250,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 7,
    marginTop: 20,
    paddingLeft: 7,
  },
});
