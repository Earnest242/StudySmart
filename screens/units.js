import React, {useState} from 'react';
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
import {Groupid} from './home';

var test = true;

const units = ({route, navigation}) => {
  var units5 = route.params;
  const [modalOp, setModalOp] = useState(false);
  const [sunits, setSunits] = useState('');
  const [inCode, setIncode] = useState('');

  var unit_Id = 4387254;

  //checking for moderator id
  const checkid = () => {
    if (test == 'true') {
      setModalOp(true);
    } else {
      ToastAndroid.show(
        'Sorry only class moderators can edit',
        ToastAndroid.LONG,
      );
    }
  };

  const addUnits2 = async () => {
    if (sunits && inCode !== '') {
      unit_Id = unit_Id + new Date().toString();
      try {
        let addunit = await firestore()
          .collection('classGroups')
          .doc(Groupid)
          .collection('units')
          .add({UnitId: unit_Id, UnitCode: inCode, UnitName: sunits});
        if (addunit) {
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
        data={units5}
        keyExtractor={item => item.UnitId}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.toucho}
            onPress={() => navigation.navigate('notespage', item)}>
            <Text style={styles.Fview1}>
              {item.UnitCode}:{item.UnitName}
            </Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.Flot} onPress={() => checkid()}>
        <Text style={{fontSize: 42, color: 'white'}}>+</Text>
      </TouchableOpacity>
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
