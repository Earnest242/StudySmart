import 'react-native-gesture-handler';
import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import homeScreen from '../screens/home';
import SignUp2 from '../screens/signUp';
import chatScreen from '../screens/chatScreen';
import {creategroup} from '../screens/creategroup';
import groupScreen from '../screens/groupScreen';
import groupInfo from '../screens/groupInfo';
import units from '../screens/units';
import notespage from '../screens/notes';
import {joinGroup} from '../screens/creategroup';
import phoneAuth from '../screens/phoneAuth';
import otpVerification from '../screens/otp';
import timetables from '../screens/timetables';
import Assignments from '../screens/assignemets';

const Stack = createNativeStackNavigator();

const AppScreen = () => {
  return (
    <Stack.Navigator initialRouteName="StudySmart">
      <Stack.Screen
        name="StudySmart"
        component={homeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="signUp2"
        component={SignUp2}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="chatscreen"
        component={chatScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="creategroup"
        component={creategroup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="joingroup"
        component={joinGroup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="groupscreen"
        component={groupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="groupinfo"
        component={groupInfo}
        options={{
          headerShown: true,
          title: 'Class Resources',
          headerTintColor: 'white',
          headerStyle: {backgroundColor: '#0F1D41'},
        }}
      />
      <Stack.Screen
        name="units"
        component={units}
        options={{
          title: 'Units',
          headerTintColor: 'white',
          headerStyle: {backgroundColor: '#0F1D41'},
        }}
      />
      <Stack.Screen
        name="notespage"
        component={notespage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="phoneauthentication"
        component={phoneAuth}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="otpVerification"
        component={otpVerification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="timetables"
        component={timetables}
        options={{
          title: 'Timetables',
          headerTintColor: 'white',
          headerStyle: {backgroundColor: '#0F1D41'},}}
      />
      <Stack.Screen
        name="assignments"
        component={Assignments}
        options={{
          title: 'Asssignmets',
          headerTintColor: 'white',
          headerStyle: {backgroundColor: '#0F1D41'},}}
      />
    </Stack.Navigator>
  );
};

export default AppScreen;
