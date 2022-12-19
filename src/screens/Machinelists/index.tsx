import {StyleSheet, Text, ScrollView, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useMachines} from '../../hooks/useMachines';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Block, MaterialTextField, Switch} from '../../component';
import {Button} from 'react-native-paper';
import {Colors, Metrics} from '../../theme';

type Props = {};

export const Machine = ({id}: {id: string}) => {
  const {actions, state} = useMachines();
  const machine = state.find(s => s.id == id);
  return (
    <Block flex p={Metrics.smallMargin}>
      <Block row space="between" middle>
        <Text style={{height: 'auto', fontSize: 22}}>{machine?.name}</Text>
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
      <Block>
        {machine?.machines.map(item => (
          <Block
            mVertical={Metrics.smallMargin}
            bgColor={Colors.WHITE}
            p={Metrics.smallMargin}>
            <MaterialTextField
              label={'Name'}
              value={item.name}
              onChangeText={name =>
                actions.EditMachine({
                  id: machine.id,
                  machineId: item.machineId,
                  name,
                })
              }
            />

            {machine?.fields.map(field =>
              field.type === 'BOOL' ? (
                <Switch
                  label={field.name}
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
                <MaterialTextField
                  label={field.name}
                  value={item.data[field.fieldId]}
                  onChangeText={value =>
                    actions.EditMachineField({
                      id: machine.id,
                      machineId: item.machineId,
                      basedOnFieldId: field.fieldId,
                      value,
                    })
                  }
                />
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
              style={{borderRadius: 4, width: 100}}>
              REMOVE
            </Button>
          </Block>
        ))}
      </Block>
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
          flexDirection: orientation ? 'row' : 'column',
          flexWrap: 'wrap',
        }}>
        {state.map(i => (
          <Block width={'40%'}>
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
