import React,{useState} from "react";
import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import PhoneInput from 'react-native-phone-number-input';
import auth from '@react-native-firebase/auth';

//export const user2 = firebase.auth().currentUser;

function phoneAuth (props){
const [value, setValue] = useState('');
  let [phoneNumber1, setFormattedValue] = useState('');
  //let [confirm, setConfirm] = useState();
    //phone number confirmation function
  async function signIn(phoneNumber1) {
    ToastAndroid.show('Phone number sent for confirmation', ToastAndroid.SHORT)
    try {
      let confirmation = await auth().signInWithPhoneNumber(phoneNumber1);
      if (confirmation) {
        //setConfirm(confirmation);
        setTimeout(function(){
        ToastAndroid.show('OTP code sent, wait for it', ToastAndroid.SHORT);
        props.navigation.navigate('otpVerification',confirmation)
        }, 2000);
      }
    } catch (error) {
      alert(error);
    }
  }
    return(
        <View style={{flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
            <Text style={{color:'#0F1D41',fontWeight:'bold', fontSize:25, fontFamily:'georgia', position:'absolute',
          top:20}}>sign up</Text>
          <Text style={{color:'black', fontSize:18}}>Select country and </Text>
          <Text style={{color:'black', fontSize:18, paddingBottom:30}}>enter mobile phone number</Text>
          <View style={{height: 70,}}>
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
        <TouchableOpacity style={{height:50, width:180, backgroundColor:'#0F1D41', borderRadius:20, position:'absolute', bottom:90,
      justifyContent:'center', alignItems:'center'}}
      onPress={() => signIn(phoneNumber1)}>
          <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>Get code</Text>
        </TouchableOpacity>
        </View>
    )
}
export default phoneAuth;