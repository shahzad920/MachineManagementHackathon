import {StyleSheet, Text, ScrollView, Dimensions, Keyboard} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {useMachines} from '../../hooks/useMachines';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {
  Block,
  DateTimePickerHandler,
  MaterialTextField,
  Separator,
  Switch,
} from '../../component';
import {Button} from 'react-native-paper';
import {Colors, Metrics} from '../../theme';

type Props = {};

export const Machine = ({id}: {id: string}) => {
  // ref
  const dateTimePickerRef = useRef<DateTimePickerHandler>(null);
  // state
  const [date, setDate] = useState<date>({});

  const {actions, state} = useMachines();
  const machine = state.find(s => s.id == id);

  const [orientation, setOrientation] = useState('PORTRAIT');

  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('LANDSCAPE');
      }
    });
  }, []);
  return (
    <Block flex safe>
      <ScrollView>
        <Block flex p={Metrics.smallMargin}>
          <Block row space="between" middle>
            <Text style={{height: 'auto', fontSize: 22}}>
              {machine?.name == '' ? 'New Category' : machine?.name}
            </Text>
            <Button
              mode="contained"
              buttonColor={Colors.PRIMARY}
              textColor={Colors.WHITE}
              onPress={() => {
                if (machine) actions.AddMachine({id: machine.id});
              }}
              style={[styles.btn]}>
              ADD NEW ITEM
            </Button>
          </Block>

          {machine?.machines.length === 0 && (
            <Block center mVertical={Metrics.baseMargin}>
              <Text style={{color: Colors.SECONDARY}}>No Item to display</Text>
            </Block>
          )}

          <Block>
            {machine?.machines.map((item, i) => (
              <Block
                mVertical={Metrics.smallMargin}
                bgColor={Colors.WHITE}
                p={Metrics.smallMargin}
                key={i}>
                {machine?.fields.map((field, i) =>
                  // <Block><Block>
                  field.type === 'BOOL' ? (
                    <Switch
                      label={field.name}
                      value={item.data[field.fieldId]}
                      onValueChange={value =>
                        actions.EditMachineField({
                          id: machine.id,
                          machineId: item.machineId,
                          basedOnFieldId: field.fieldId,
                          value,
                        })
                      }
                    />
                  ) : field.type === 'DATE' ? (
                    <>
                      <MaterialTextField
                        key={date}
                        label={field.name}
                        value={item.data[field.fieldId]}
                        rightIcon={'calendar'}
                        disabled
                        editable={false}
                        // pointerEvents={'none'}
                        onPress={() => {
                          dateTimePickerRef.current.showDatePicker();
                        }}
                      />

                      <DateTimePickerHandler
                        ref={dateTimePickerRef}
                        onConfirm={value => {
                          actions.EditMachineField({
                            id: machine.id,
                            machineId: item.machineId,
                            basedOnFieldId: field.fieldId,
                            value,
                          });
                        }}
                      />
                    </>
                  ) : (
                    <MaterialTextField
                      label={field.name}
                      value={item.data[field.fieldId]}
                      keyboardType={
                        field.type === 'NUMBER' ? 'number-pad' : 'default'
                      }
                      onChangeText={value =>
                        actions.EditMachineField({
                          id: machine.id,
                          machineId: item.machineId,
                          basedOnFieldId: field.fieldId,
                          value,
                        })
                      }
                    />
                  ),
                )}

                <Button
                  mode="text"
                  onPress={() => {
                    if (machine)
                      actions.DeleteMachine({
                        id: machine.id,
                        machineId: item.machineId,
                      });
                  }}
                  icon={'delete'}
                  style={{borderRadius: 4, width: Metrics.widthRatio(100)}}>
                  REMOVE
                </Button>
              </Block>
            ))}
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
};

export const MachineList = ({route}: {route: RouteProp<Props>}) => {
  return <Machine id={route.name} />;
};
export const MachineDashBoard = ({route}: {route: RouteProp<Props>}) => {
  const {state} = useMachines();

  const [orientation, setOrientation] = useState('PORTRAIT');

  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('LANDSCAPE');
      }
    });
  }, []);

  return (
    <Block safe>
      <ScrollView
        contentContainerStyle={{
          flexDirection:
            Metrics.screenWidth > 414 || orientation === 'LANDSCAPE'
              ? 'row'
              : 'column',
          flexWrap: 'wrap',
        }}>
        {state.map(i => (
          <Block key={i} width={orientation === 'LANDSCAPE' ? '50%' : '100%'}>
            <Machine id={i.id} />
          </Block>
        ))}
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  btn: {borderRadius: 4},
});
