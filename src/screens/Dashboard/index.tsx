/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Button} from 'react-native-paper';

import {MaterialTextField} from '../../component';

const Dashboard = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 8}}>
        <MaterialTextField
          label={'Email'}
          value={''}
          onChangeText={text => console.log('test: ', text)}
        />

        <Button
          mode="contained"
          onPress={() => console.log('Pressed')}
          buttonColor={'blue'}>
          Press me
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
