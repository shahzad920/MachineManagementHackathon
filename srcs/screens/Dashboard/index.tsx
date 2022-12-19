/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useMemo, useCallback, useRef, useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import {Button, IconButton, Text} from 'react-native-paper';
import {Block, MaterialTextField} from '../../component';
import {useMachines} from '../../hooks/useMachines';
import {Colors, Metrics} from '../../theme';
import BottomSheet from '@gorhom/bottom-sheet';

let data_type = [
  {id: 0, title: 'TEXT', type: 'TEXT'},
  {id: 1, title: 'NUMBER', type: 'NUMBER'},
  {id: 1, title: 'DATE', type: 'DATE'},
  {id: 1, title: 'CHECKBOX', type: 'CHECKBOX'},
];
const Dashboard = () => {
  const {actions, state} = useMachines();

  // state
  const [categoryField, setCategoryField] = useState<cField>({});

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['1%', '40%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  function _onSelectType(item) {
    actions.AddCategoryField({id: categoryField.id, type: item.type});

    bottomSheetRef.current.close();
  }

  const _renderItem = ({item}: object) => {
    return (
      <Pressable onPress={() => _onSelectType(item)}>
        <Block mHorizontal={Metrics.baseMargin} pVertical={Metrics.baseMargin}>
          <Text style={{fontSize: 16}}>{item.title}</Text>
        </Block>
      </Pressable>
    );
  };

  const _renderSeparator = ({item}: object) => {
    return (
      <Block
        center
        height={1}
        width={Metrics.screenWidth - 32}
        bgColor={Colors.GREY}></Block>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}} contentInsetAdjustmentBehavior="automatic">
        <Block>
          {state.map(i => {
            return (
              <Block
                style={{
                  backgroundColor: 'white',
                  padding: 8,
                  margin: 4,
                }}>
                <Text style={{height: 'auto', fontSize: 22}}>{i.name}</Text>
                <MaterialTextField
                  label={'Category Name'}
                  value={i.name}
                  onChangeText={name => actions.EditCategory({id: i.id, name})}
                />
                {i.fields.map(feild => (
                  <View style={{flexDirection: 'row'}}>
                    <MaterialTextField
                      label={'Field'}
                      value={feild.name}
                      onChangeText={name =>
                        actions.EditCategoryField({
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
                        {feild.type}
                      </Text>

                      <IconButton
                        icon="delete"
                        iconColor={Colors.BLACK}
                        size={24}
                        onPress={() =>
                          actions.DeleteCategoryField({
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
                    onPress={() => {
                      setCategoryField(i);

                      bottomSheetRef.current?.snapToIndex(1);
                    }}
                    style={{borderRadius: 4}}>
                    ADD NEW FIELD
                  </Button>
                  <Button
                    mode="outlined"
                    onPress={() => actions.DeleteCategory({id: i.id})}
                    icon={'delete'}
                    style={{borderRadius: 4, marginLeft: Metrics.smallMargin}}>
                    REMOVE
                  </Button>
                </Block>
              </Block>
            );
          })}

          <Button
            mode="outlined"
            onPress={() => actions.AddCategory()}
            buttonColor={Colors.PRIMARY}
            textColor={Colors.WHITE}
            style={[styles.btn, {margin: Metrics.baseMargin}]}>
            CREATE NEW CATEGORY
          </Button>
        </Block>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <FlatList
          data={data_type}
          renderItem={_renderItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={_renderSeparator}
        />
      </BottomSheet>
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
