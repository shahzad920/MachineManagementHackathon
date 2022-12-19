/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, View, StyleSheet} from 'react-native';
import {Button, IconButton, Text} from 'react-native-paper';
import {Block, MaterialTextField} from '../../component';
import {useMachines} from '../../hooks/useMachines';
import {Colors, Metrics} from '../../theme';

const Dashboard = () => {
  const {dispatch, state} = useMachines();
  console.log({state});

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Block flex>
          {state.map(i => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 8,
                  margin: 4,
                }}>
                <Text style={{height: 'auto', fontSize: 22}}>{i.name}</Text>
                <MaterialTextField
                  label={'Category Name'}
                  value={i.name}
                  onChangeText={name =>
                    dispatch('EditMachineType')({id: i.id, name})
                  }
                />
                {i.fields.map(feild => (
                  <View style={{flexDirection: 'row'}}>
                    <MaterialTextField
                      label={'Field'}
                      value={feild.name}
                      onChangeText={name =>
                        dispatch('EditMachineTypeField')({
                          id: i.id,
                          fieldId: feild.fieldId,
                          name,
                        })
                      }
                      containerStyle={{flex: 1}}
                    />
                    <Block row center>
                      <Text
                        style={{
                          color: Colors.PRIMARY,
                          fontSize: 16,
                          marginHorizontal: Metrics.smallMargin,
                        }}>
                        {'TEXT'}
                      </Text>

                      <IconButton
                        icon="delete"
                        iconColor={Colors.BLACK}
                        size={24}
                        onPress={() =>
                          dispatch('DeleteMachineTypeField')({
                            id: i.id,
                            fieldId: feild.fieldId,
                          })
                        }
                      />
                    </Block>
                  </View>
                ))}
                <Block row>
                  <Button
                    mode="outlined"
                    onPress={() =>
                      dispatch('AddMachineTypeField')({id: i.id, type: 'TEXT'})
                    }
                    style={{borderRadius: 4}}>
                    ADD NEW FIELD
                  </Button>
                  <Button
                    mode="outlined"
                    onPress={() =>
                      dispatch('AddMachineTypeField')({id: i.id, type: 'TEXT'})
                    }
                    icon={'delete'}
                    style={{borderRadius: 4, marginLeft: Metrics.smallMargin}}>
                    REMOVE
                  </Button>
                </Block>
              </View>
            );
          })}

          <Button
            mode="outlined"
            onPress={() => dispatch('AddMachineType')()}
            buttonColor={Colors.PRIMARY}
            textColor={Colors.WHITE}
            style={[styles.btn, {margin: Metrics.baseMargin}]}>
            CREATE NEW CATEGORY
          </Button>
        </Block>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    width: Metrics.screenWidth,
  },
  btn: {borderRadius: 4},
});

export default Dashboard;
