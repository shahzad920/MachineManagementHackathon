import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useMachines } from '../../hooks/useMachines';
const index = props => {
  const {state} =useMachines()
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

/**
 * const index = props => {
  const {state} =useMachines()
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {state.map((i)=>(<DrawerItem label={i.name} />))}
    </DrawerContentScrollView>
  );
};

 */

export default index;
