import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {
  DrawerItemList,
  DrawerContentScrollView,
  DrawerContent,
} from '@react-navigation/drawer';
import globalstyles from '../globalstyles';
import { userdata } from '../screens/home';

const Customdrawer = props => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'dodgerblue',
          paddingTop: 10,
        }}>
        <View
          style={{
            height: 90,
            width: 90,
            borderRadius: 45,
            backgroundColor: '#D3DAEE',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'dodgerblue',
              fontSize: 26,
              fontFamily: 'georgia',
              fontStyle: 'italic',
            }}>
            e
          </Text>
        </View>
        <Text style={{color: 'white', fontSize: 18, fontFamily: 'georgia'}}>
          {userdata.name}
        </Text>
        <Text style={{color: 'white', fontSize: 18, fontFamily: 'georgia'}}>
          {userdata.phoneNumber}
        </Text>
      </View>
      <ScrollView>
        <DrawerContent
          {...props}
          contentContainerStyle={{
            backgroundColor: 'blue',
          }}>
          <View style={{height: 110}}>
            <DrawerItemList {...props} />
          </View>
        </DrawerContent>
      </ScrollView>
      <View>
        <Text style={{color: 'black', fontSize: 18}}>...</Text>
      </View>
    </View>
  );
};

export default Customdrawer;
