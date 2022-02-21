import 'react-native-gesture-handler';
import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import homeScreen from '../screens/home';
import coursesScreen from '../screens/courses';
import signUp from '../screens/signUp';
import {SignUp2} from '../screens/signUp';
import chatScreen from '../screens/chatScreen';
import {creategroup} from '../screens/creategroup';
import groupScreen from '../screens/groupScreen';
import groupInfo from '../screens/groupInfo';
import units from '../screens/units';
import notespage from '../screens/notes';
import {joinGroup} from '../screens/creategroup';

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
        name="courses"
        component={coursesScreen}
        options={{
          title: 'courses',
          headerTintColor: 'white',
          headerStyle: {backgroundColor: 'dodgerblue'},
        }}
      />
      <Stack.Screen
        name="signUp"
        component={signUp}
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
    </Stack.Navigator>
  );
};

export default AppScreen;
