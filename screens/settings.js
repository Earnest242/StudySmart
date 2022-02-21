import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const settings = () => {
  return (
    <View style={styles.container}>
      <Text style={{color: 'purple'}}>Settings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default settings;
