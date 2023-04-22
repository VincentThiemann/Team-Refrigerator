import { createDrawerNavigator } from '@react-navigation/drawer';
import  MainLayout  from '../screens/MainLayout';
import React from 'react';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="MainLayout" component={MainLayout} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;