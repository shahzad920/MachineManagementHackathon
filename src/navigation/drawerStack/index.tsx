import React from 'react';
import AppDrawer from '../../screens/Drawer';
import {Dashboard} from '../../screens';
import {Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useMachines} from '../../hooks/useMachines';
import {MachineDashBoard, MachineList} from '../../screens/Machinelists';

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  const {state} = useMachines();
  return (
    <Drawer.Navigator
      drawerContent={props => <AppDrawer {...props} />}
      screenOptions={{
        headerTitleAlign: 'left',
      }}>
      <Drawer.Screen
        name="MachineDashBoard"
        component={MachineDashBoard}
        options={{
          title: 'Dashboard',
        }}
      />
      {state.map(i => (
        <Drawer.Screen
          name={i.id}
          component={MachineList}
          options={{
            title: i.name === '' ? 'Category Name' : i.name,
          }}
        />
      ))}
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Manage Catergories',
        }}
      />
    </Drawer.Navigator>
  );
}
