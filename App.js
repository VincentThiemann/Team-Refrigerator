import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import 'expo-dev-client';
import React, { useEffect, useState } from "react";
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

//import SplashScreen from './screens/Welcome/Welcome.js';
import CustomDrawer from './navigation/CustomDrawer';

import { Authentication, CartTab, CreateNewAccount, FoodDetail, HelpCenter, LogInAccount, Map, Onboarding, Profile, Restaurant, Tracker } from './screens';
import Ratings from './screens/Ratings/Ratings';
// import Notification from './screens/Notifications/Notification';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './stores/rootReducer';

import auth from "@react-native-firebase/auth";
import 'expo-dev-client';
import { useDispatch, useSelector } from 'react-redux';
import firstLauchActions from "./stores/firstLaunch/firstLauchActions";

const Stack = createStackNavigator();

const store = createStore(rootReducer, applyMiddleware(thunk));

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const { isFirstTimeUse } = useSelector(
    state => state?.generalState,
  );
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(firstLauchActions.appStart());
  }, []);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const [fontsLoaded] = useFonts({
    'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('./assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('./assets/fonts/Poppins-Thin.ttf'),
  });

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  if (initializing) return null;

  // import fonts here

  return (

    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        {!user ? (
          <>
            {isFirstTimeUse && (
              <Stack.Screen name="Onboarding" component={Onboarding} />
            )}
            <Stack.Screen name="Authentication" component={Authentication} />
            <Stack.Screen name="CreateNewAccount" component={CreateNewAccount} />
            <Stack.Screen name="LogInAccount" component={LogInAccount} />

          </>
        ) : (
          <>
            <Stack.Screen name="CustomDrawer" component={CustomDrawer} />
            <Stack.Screen name="Cart" component={CartTab} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="HelpCenter" component={HelpCenter} />
            <Stack.Screen name="Food" component={FoodDetail} />
            <Stack.Screen name="Restaurant" component={Restaurant} />
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen name="Tracker" component={Tracker} />
            <Stack.Screen name="Ratings" component={Ratings} />
          </>
        )
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppWrapper