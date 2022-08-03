import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Button,
  Image,
  ActivityIndicator,
  Platform,Modal, ToastAndroid
} from 'react-native';

const Assignments =()=>{
    return(
    <View style={styles.container56}>
      <TouchableOpacity style={styles.Flot} >
        <Text style={{fontSize: 42, color: 'white'}}>+</Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default Assignments;

const styles = StyleSheet.create({
  container56: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  title: {
    height: 60,
    width: '100%',
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    borderRadius: 1,
  },
  Flot: {
    position: 'absolute',
    bottom: 30,
    //marginBottom: 30,
    right: 13,
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'dodgerblue',
    height: 60,
    width: 60,
    borderRadius: 53,
  },
});
