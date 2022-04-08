import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import globalstyles from '../globalstyles';
//import {Groupid} from './creategroup';
//import {groupdata} from './home';
//import {groupUserInfo} from './home';
//import {GroupUnits} from './home';

function groupScreen({navigation}) {
  return (
    <View style={globalstyles.container}>
      <View
        style={{
          backgroundColor: '#0F1D41',
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          padding: 8,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 25,
          }}>
          <View
            style={{
              backgroundColor: '#D3DAEE',
              height: 70,
              width: 70,
              borderRadius: 35,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'tomato', fontSize: 20}}>
              {groupdata.Group_Name.charAt[0]}
            </Text>
          </View>
          <Text style={{color: 'white', fontSize: 20, fontFamily: 'georgia'}}>
            {groupdata.Group_Name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'dodgerblue', fontSize: 18}}>
              Year {groupdata.StudyYear}
            </Text>
            <Text style={{color: 'tomato', fontSize: 18, paddingLeft: 8}}>
              Sem {groupdata.StudyYear}
            </Text>
          </View>
        </View>
        <View>
          <Text style={{color: 'dodgerblue', fontSize: 18}}>
            ClassModerator
          </Text>
          <Text style={{color: 'white', fontSize: 18}}>
            {groupdata.moderatorName}
          </Text>
          <Text style={{color: 'white', fontSize: 18}}>
            {groupdata.ModeratorPhoneNo}
          </Text>
        </View>
      </View>
      <View style={{padding: 10}}>
        <Text style={{color: 'tomato', fontSize: 18, fontFamily: 'georgia'}}>
          Members
        </Text>
        <FlatList
          data={groupUserInfo}
          keyExtractor={item => item.UserId}
          renderItem={({item}) => (
            <TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    backgroundColor: '#D3DAEE',
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                  }}></View>
                <Text
                  style={{
                    color: 'dodgerblue',
                    fontSize: 15,
                    paddingLeft: 10,
                    fontWeight: 'bold',
                  }}>
                  {item.UserName}
                </Text>
              </View>
              <Text
                style={{color: 'dodgerblue', fontSize: 15, paddingLeft: 10}}>
                {item.PhoneNo}
              </Text>
            </TouchableOpacity>
          )}
        />
        <ScrollView>
          <TouchableOpacity>
            <Text style={{color: 'dodgerblue', fontSize: 15}}>Leave Group</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{color: 'dodgerblue', fontSize: 15}}>
              Invite member
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 15,
          borderRadius: 35,
          width: '75%',
          backgroundColor: '#0F1D41',
          alignSelf: 'center',
          alignItems: 'center',
          height: 50,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontFamily: 'georgia',
            fontSize: 25,
            fontStyle: 'italic',
            fontWeight: 'bold',
          }}
          onPress={() => navigation.navigate('groupinfo', GroupUnits)}>
          Class resources
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default groupScreen;
