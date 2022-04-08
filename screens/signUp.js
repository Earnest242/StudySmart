import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ToastAndroid, TouchableOpacity
} from 'react-native';
import globalstyles from '../globalstyles';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUp2 = (props) => {
  const [name2, setname] = useState('');
  let user3 = firebase.auth().currentUser.uid;

  //FUNCTION TO ADD MEMBER TO FIRESTORE

  async function addmember (){
    if (name2 !== '') 
    {
      await firestore()
          .collection('Users')
          .doc(user3)
          .set(
            {
              name: name2,
            },
            {merge: true},
          );
          ToastAndroid.show(
            'Name saved successfully',
            ToastAndroid.LONG,
          );
          props.navigation.navigate('StudySmart')
     } else {
      alert('all fields must be filled');
    }
  };
  //

  return (
      <View
        style={{
          flex: 1,
          backgroundColor:'#cacfcc',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{color:'#0F1D41', fontSize:20, fontWeight:'bold', paddingBottom:40}}>Enter your name</Text>
          <TextInput
            style={{marginBottom:40, backgroundColor:'white', borderRadius:10, width:240, color:'#0F1D41'}}
            onChangeText={setname}
          />
          <TouchableOpacity style={{height:50, width:180, backgroundColor:'#0F1D41', borderRadius:20, position:'absolute', bottom:90,
      justifyContent:'center', alignItems:'center'}}
      onPress={() => addmember(name2)}>
          <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>Save</Text>
        </TouchableOpacity>
      </View>
  );
};

export default SignUp2;
