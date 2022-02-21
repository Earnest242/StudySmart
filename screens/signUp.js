import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import globalstyles from '../globalstyles';
import PhoneInput from 'react-native-phone-number-input';
import firestore from '@react-native-firebase/firestore';
//import {user} from '../database/data';

export const user2 = firebase.auth().currentUser;

function signUp(props) {
  const [value, setValue] = useState('');
  let [phoneNumber1, setFormattedValue] = useState('');
  let [confirm, setConfirm] = useState('');
  let [code, setCode] = useState('');
  //const phoneInput = useRef < PhoneInput > null;

  //checking for authentication state change
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firestore()
          .collection('Users')
          .doc(user2.uid)
          .set({userId: user2.uid, phoneNumber: user2.phoneNumber});
        ToastAndroid.show(
          'Congratulations, registration successful',
          ToastAndroid.SHORT,
        );
        setConfirm(null);
        props.navigation.navigate('signUp2');
      } else {
        // reset state if you need to
        dispatch({type: 'reset_user'});
      }
    });
  }, []);

  //phone number confirmation function
  async function signIn(phoneNumber1) {
    try {
      let confirmation = await auth().signInWithPhoneNumber(phoneNumber1);
      if (confirmation) {
        setConfirm(confirmation);
        ToastAndroid.show('OTP code sent, wait for it', ToastAndroid.SHORT);
      }
    } catch (error) {
      alert(error);
    }
  }
  //otp verification
  async function confirmVerificationCode(code) {
    try {
      let confrimcode = await confirm.confirm(code);
      if (confrimcode) {
        firestore()
          .collection('Users')
          .doc(user2.uid)
          .set({userId: user2.uid, phoneNumber: user2.phoneNumber});
        ToastAndroid.show(
          'Congratulations, registration successful',
          ToastAndroid.SHORT,
        );
        setConfirm(null);
        navigation.navigate('signUp2');
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <LinearGradient colors={['#FC466B', '#3F5EFB']} style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: 'georgia',
            fontSize: 24,
            fontStyle: 'italic',
            fontWeight: 'bold',
          }}>
          Sign Up1
        </Text>
        <Text>Enter phone number</Text>
        <View style={{height: 70}}>
          <PhoneInput
            //ref={phoneInput}
            textContainerStyle={{borderRadius: 8}}
            containerStyle={{borderRadius: 8}}
            defaultValue={value}
            defaultCode="KE"
            layout="first"
            onChangeText={text => {
              setValue(text);
            }}
            onChangeFormattedText={text => {
              setFormattedValue(text);
            }}
          />
        </View>
        <View style={{height: 80, width: 180, padding: 10}}>
          <TouchableOpacity
            style={globalstyles.touchable}
            onPress={() => signIn(phoneNumber1)}>
            <Text style={globalstyles.text1}>Get code</Text>
          </TouchableOpacity>
          <TextInput
            style={{
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              width: '100%',
            }}
            keyboardType="numeric"
            placeholder="Enter OTP code"
            onChangeText={value => setCode(value)}
            value={code}></TextInput>
          <TouchableOpacity
            style={globalstyles.touchable}
            onPress={() => confirmVerificationCode(code)}>
            <Text style={globalstyles.text1}>Register</Text>
          </TouchableOpacity>
          <Button
            title="proceed"
            onPress={() => navigation.navigate('signUp2')}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

export var user = [{id: '', name1: '', course1: 'smsm', year1: '', sem1: ''}];

export const SignUp2 = navigation => {
  const [name2, setname] = useState('');
  const [course2, setcourse] = useState('');
  const [year2, setyear] = useState('');
  const [sem2, setsem] = useState('');

  const saveinfo = () => {
    user.name1 = name2;
    user.course1 = course2;
    user.year1 = year2;
    user.sem1 = sem2;
    alert('saved');
  };

  //FUNCTION TO ADD MEMBER TO FIRESTORE

  const addmember = async () => {
    if (name2 && course2 && year2 && sem2 !== '') {
      try {
        let memberadded = await firestore()
          .collection('Users')
          .doc(user2.uid)
          .set(
            {
              name: name2,
              courseName: course2,
              StudyYear: year2,
              semister: sem2,
            },
            {merge: true},
          );
        if (memberadded) {
          ToastAndroid.show(
            'Information saved successfully',
            ToastAndroid.SHORT,
          );
        }
      } catch (error) {
        alert('Unable to upload information');
      }
    } else {
      alert('all fields must be filled');
    }
  };
  //

  return (
    <LinearGradient colors={['white', 'dodgerblue']} style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{width: 200}}>
          <Text style={globalstyles.header1}>Course Name:</Text>
          <TextInput
            placeholder="e.g Computer Science"
            style={globalstyles.textin}
            onChangeText={setcourse}
            value={user.course1}
          />
          <Text style={globalstyles.header1}>Year of study:</Text>
          <TextInput
            placeholder="e.g 3"
            style={globalstyles.textin}
            onChangeText={setyear}
            value={user.year1}
            keyboardType="numeric"
          />
          <Text style={globalstyles.header1}>Semister:</Text>
          <TextInput
            placeholder="e.g 2"
            style={globalstyles.textin}
            onChangeText={setsem}
            value={user.sem1}
            keyboardType="numeric"
          />
          <Text style={globalstyles.header1}>Name:</Text>
          <TextInput
            placeholder="e.g John"
            style={globalstyles.textin}
            onChangeText={setname}
          />
          <Button
            title="save"
            onPress={() => addmember(course2, name2, year2, sem2)}
          />
          <Text style={{color: 'white'}}>{name2}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

//picture name

export default signUp;
