import React, { useCallback, useState, useEffect } from "react";
import 'react-native-gesture-handler'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';


//import SplashScreen from './screens/Welcome/Welcome.js';
import CustomDrawer from './navigation/CustomDrawer';
import Onboarding from './screens/Onboarding/Onboarding.js';
import HelpCenter from './screens/HelpCenter/HelpCenter.js';
import FoodDetail from './screens/Food/FoodDetail';
import CartTab from './screens/Cart/CartTab'
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { CreateNewAccount } from "./screens/Authentication/CreateNewAccount";
import { LogInAccount } from "./screens";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './stores/rootReducer';
import { OTPCodeVerification } from "./screens";
import { Authentication } from "./screens";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from "@react-native-firebase/auth";
import 'expo-dev-client'

const Stack = createStackNavigator();

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  //import fonts here
  // const [fontsLoaded] = useFonts({
  //   'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf'),
  //   'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  //   'Poppins-ExtraBold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
  //   'Poppins-ExtraLight': require('./assets/fonts/Poppins-ExtraLight.ttf'),
  //   'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
  //   'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
  //   'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
  //   'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  //   'Poppins-Thin': require('./assets/fonts/Poppins-Thin.ttf'),
  // });

  // useEffect(() => {
  //   async function prepare() {
  //     await SplashScreen.preventAutoHideAsync();
  //   }
  //   prepare();
  // }, []);

  // if (!fontsLoaded) {
  //   return undefined;
  // } else {
  //   SplashScreen.hideAsync();
  // }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Authentication"
        >
          {!user ? (
            <>
              <Stack.Screen name="Authentication" component={Authentication} />
              <Stack.Screen name="CreateNewAccount" component={CreateNewAccount} />
              <Stack.Screen name="LogInAccount" component={LogInAccount} />
              <Stack.Screen name="OTPCodeVerification" component={OTPCodeVerification} />
            </>
          ) : (
            <>
              <Stack.Screen name="CustomDrawer" component={CustomDrawer} />
              <Stack.Screen name="Cart" component={CartTab} />
              <Stack.Screen name="HelpCenter" component={HelpCenter} />
              <Stack.Screen name="FoodDetail" component={FoodDetail} />
            </>
          )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App