import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Button} from 'react-native';
import globalstyles from '../globalstyles';

function groupInfo({route, navigation}) {
  var units4 = route.params;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        style={styles.floatss}
        onPress={() => navigation.navigate('units', units4)}>
        <Text
          style={{
            color: 'white',
            fontSize: 26,
            fontFamily: 'georgia',
            fontStyle: 'italic',
          }}>
          Notes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.floatss}>
        <Text
          style={{
            color: 'white',
            fontSize: 26,
            fontFamily: 'georgia',
            fontStyle: 'italic',
          }}>
          Timetables
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.floatss}>
        <Text
          style={{
            color: 'white',
            fontSize: 26,
            fontFamily: 'georgia',
            fontStyle: 'italic',
          }}>
          Assignments
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  floatss: {
    height: 120,
    width: '80%',
    backgroundColor: '#0F1D41',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default groupInfo;
