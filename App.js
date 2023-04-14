import React, { useCallback, useEffect } from "react";
import 'react-native-gesture-handler'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
// import CustomDrawer from './navigation/CustomDrawer';
import WelcomeScreen from './screens/Welcome/Welcome.js';
// import { OnboardingScreen1, OnboardingScreen2, OnboardingScreen3 } from './screens/Onboarding/Onboarding.js';
import Onboarding from './screens/Onboarding/Onboarding.js';
import Cancellation from './screens/Cancellation/Cancellation.js';
import Ratings from './screens/Ratings/Ratings.js';
import Address from './screens/Address/Address.js';
import NewAddress from './screens/Address/NewAddress.js';

import CustomDrawer from './navigation/CustomDrawer';
//import SplashScreen from './screens/Welcome/Welcome.js';
import HelpCenter from './screens/HelpCenter/HelpCenter.js';
import FoodDetail from './screens/Food/FoodDetail';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import { CreateNewAccount } from "./screens/Authentication/CreateNewAccount";
import { LogInAccount } from "./screens";

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './stores/rootReducer';
import { OTPCodeVerification } from "./screens";
import Header from './components/Header';
import { Authentication } from "./screens";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Stack = createStackNavigator();

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  //import fonts here
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

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Address"
          screenOptions={{ headerShown: false }}
        >
          {/* <Stack.Screen name="Home" component={CustomDrawer} /> */}
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Cancellation" component={Cancellation} />
          {/* <Stack.Screen name="List" component={List} /> */}
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Authentication" component={Authentication} />
          <Stack.Screen name="CreateNewAccount" component={CreateNewAccount} />
          <Stack.Screen name="LogInAccount" component={LogInAccount} />
          <Stack.Screen name="OTPCodeVerification" component={OTPCodeVerification} />
          {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
          <Stack.Screen name="HelpCenter" component={HelpCenter} />
          <Stack.Screen name="CustomDrawer" component={CustomDrawer} />
          <Stack.Screen name="FoodDetail" component={FoodDetail} />
          <Stack.Screen name="Ratings" component={Ratings} />
          <Stack.Screen name="Address" component={Address} />
          <Stack.Screen name="NewAddress" component={NewAddress} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App