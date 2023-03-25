import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import CustomDrawer from './navigation/CustomDrawer';
import SplashScreen from './screens/Welcome/Welcome.js';
// import { OnboardingScreen1, OnboardingScreen2, OnboardingScreen3 } from './screens/Onboarding/Onboarding.js';
import Onboarding from './screens/Onboarding/Onboarding.js';
import HelpCenter from './screens/HelpCenter/HelpCenter.js';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './stores/rootReducer';
import Header from './components/Header';

const Stack = createStackNavigator();

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HelpCenter"
          screenOptions={{ headerShown: false }}
        >
         {/* <Stack.Screen name="Home" component={CustomDrawer} /> */}
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="HelpCenter" component={HelpCenter} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App