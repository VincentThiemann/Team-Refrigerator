import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainLayout } from '../screens';

const Tab = createBottomTabNavigator();

export default function Tab() {

    return (
        <Tab.Navigator
            initialRouteName="Home"
            backBehavior="none"
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    right: 0,
                    borderTopWidth: 0,
                    backgroundColor: "transparent",
                    elevation: 0
                }
            }}

            tabBar={props => (
                <CustomTabBar
                    props={props}
                />
            )}

        >   
            <Tab.Screen name="Home" component={MainLayout} />
        </Tab.Navigator>
    );
}
