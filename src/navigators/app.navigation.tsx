import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/login/login.screen';
import SplashScreen from 'react-native-splash-screen';
import QRcodeScreen from '../screens/qrcode/qrcode.screen';
import QRCodeScannerScreen from '../screens/qrcodesanner/qrcodescanner.screen';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Login: undefined;
  QRcode: undefined;
  QRCodeScanner: undefined;
};

const AppNavigator = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="QRcode" component={QRcodeScreen} />
        <Stack.Screen name="QRCodeScanner" component={QRCodeScannerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
