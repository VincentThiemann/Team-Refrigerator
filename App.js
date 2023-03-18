import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import CustomDrawer from './navigation/CustomDrawer';
import splash_screen from './screens/Welcome/Welcome.js';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from'react-redux';
import thunk from'redux-thunk';
import rootReducer from './stores/rootReducer';

const Stack = createStackNavigator();

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
    return (
        <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator 
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
          }}
          >
            <Stack.Screen name="Home" component={CustomDrawer} />
            <Stack.Screen name="Splash" component={splash_screen} />
          </Stack.Navigator>
        </NavigationContainer>
        </Provider>
    )
}

export default App