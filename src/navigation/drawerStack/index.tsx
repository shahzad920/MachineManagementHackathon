import React from 'react';
import AppDrawer from '../../screens/Drawer';
import {Dashboard} from '../../screens';
import {Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (
    <Drawer.Navigator
      drawerContent={props => <AppDrawer {...props} />}
      screenOptions={{
        headerTitleAlign: 'left',
      }}
      initialRouteName={'Dashboard'}>
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'Deshboard',
        }}
      />
    </Drawer.Navigator>
  );
}
