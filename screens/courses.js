/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const coursesScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={{color: 'black'}}>Setting up studysmart123534</Text>
      <Button
        title="toggle"
        onPress={() => navigation.navigate('StudySmart')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default coursesScreen;
