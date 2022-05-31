import React,{useState, useEffect} from "react";
import { View, Text, TextInput, TouchableOpacity, ToastAndroid } from "react-native";
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export var user2 ;
function otpVerification ({route, navigation}){

    let [confirm, setConfirm] = useState(route.params);
    let [code, setCode] = useState();
    user2 = firebase.auth().currentUser;
    //console.log(confirm);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            firestore()
              .collection('Users')
              .doc(user2.uid)
              .set({userId: user2.uid, phoneNumber: user2.phoneNumber});
            setTimeout(function(){
              ToastAndroid.show(
                'Code detected, Registration successful',
                ToastAndroid.LONG,
              );
              setConfirm(null);
              navigation.navigate('signUp2');
            }, 3000);
            
          } else {
            // reset state if you need to
            dispatch({type: 'reset_user'});
          }
        });
    },[confirm]);

    async function confirmVerificationCode(code) {
        try {
          let confrimcode = await confirm.confirm(code);
          if (confrimcode) {
            firestore()
              .collection('Users')
              .doc(user2.uid)
              .set({userId: user2.uid, phoneNumber: user2.phoneNumber});
              setTimeout
            ToastAndroid.show(
              'Registration successful',
              ToastAndroid.LONG,
            );
            setConfirm(null);
            navigation.navigate('signUp2', user2);
          }
        } catch (error) {
          alert(error);
       
        }
    }
    return(
        <View style={{flex:1, backgroundColor:'#cacfcc', justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'#0F1D41', fontSize:22, fontWeight:'bold'}}>A code has been sent to you</Text>
            <Text style={{color:'#0F1D41', fontSize:22, fontWeight:'bold'}}>enter to proceed</Text>
            <TextInput
             style={{
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
                width: 180,
                backgroundColor:'#cacfcc',
                fontSize:20
              }}
              keyboardType="numeric"
              //placeholder="enter code"
              onChangeText={value => setCode(value)}
              value={code}
            />
            <TouchableOpacity style={{height:50, width:180, backgroundColor:'#0F1D41', borderRadius:20, position:'absolute', bottom:90,
               justifyContent:'center', alignItems:'center'}}
               onPress={() => confirmVerificationCode(code)}>
                 <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>confirm</Text>
              </TouchableOpacity>
        </View>
    )
}

export default otpVerification;
