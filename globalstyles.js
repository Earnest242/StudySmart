import React from 'react';
import {StyleSheet} from 'react-native';

const globalstyles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: 'white',
  },
  //SIGNUP PAGE

  touchable: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 5,
    height: 40,
  },
  text1: {fontSize: 20, fontWeight: 'bold', padding: 4, color: '#0F1D41'},
  //SIGNUP2 Textin
  textin: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    color: 'dodgerblue',
  },
  header1: {fontSize: 18, fontWeight: 'bold'},
  //avatar
  avatar: {
    backgroundColor: '#D3DAEE',
    height: 30,
    width: 30,
    borderRadius: 15,
  },
});

export default globalstyles;
