import React, {useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {FILE_USER_TOKEN} from '../common/constants';
import {verify} from '../duck/user/action';
import {request} from '../helpers/request.helper';
import {RootState} from '../duck/root.reducer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useDispatch, useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import LoginScreen from '../screens/login/login.screen';
import QRcodeScreen from '../screens/qrcode/qrcode.screen';
import QRCodeScannerScreen from '../screens/qrcodesanner/qrcodescanner.screen';
import SettingScreen from '../screens/setting/setting.screen';
import HomeScreen from '../screens/home/home.screen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export type RootStackParamList = {
  Login: undefined;
  QRcode: undefined;
  QRCodeScanner: undefined;
  Setting: undefined;
  Home: undefined;
};

const AppNavigator = () => {
  const dispatch = useDispatch();
  const user = useSelector((states: RootState) => states.user);
  const getUser = useCallback(async () => {
    let token = await AsyncStorage.getItem(FILE_USER_TOKEN);
    if (token) {
      try {
        let res: any = await request('account/verify', {
          method: 'POST',
        });
        // console.log(res.data);
        if (res.data.success) {
          await dispatch(verify({...res.data}));
        }
      } catch (error) {
        AsyncStorage.setItem(FILE_USER_TOKEN, '');
        dispatch(verify({info: {}, token: null, success: false}));
        // console.log(error.data);
      }
    }
    await SplashScreen.hide();
  }, [dispatch]);

  useEffect(() => {
    // if (user.info) return;
    getUser();
  }, []);
  // console.log(user);
  return (
    <NavigationContainer>
      {!user.isValidToken ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeNav}
            options={{
              tabBarLabel: 'Lịch chấm công',
              tabBarIcon: ({color, focused}) => (
                <View>
                  <Icon
                    size={focused ? 32 : 24}
                    name="calendar-check"
                    color={color}
                  />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="QRCodeScanner"
            component={QRCodeScannerNav}
            options={{
              tabBarLabel: 'Quét mã',
              tabBarIcon: ({color, focused}) => (
                <View>
                  <Icon
                    size={focused ? 32 : 24}
                    name="camera-retro"
                    color={color}
                  />
                </View>
              ),
            }}
          />
          {user.info.job_id === 1 && (
            <Tab.Screen
              name="Mã QR"
              component={QRcodeNav}
              options={{
                tabBarIcon: ({color, focused}) => (
                  <View>
                    <Icon
                      size={focused ? 32 : 24}
                      name="qrcode"
                      color={color}
                    />
                  </View>
                ),
              }}
            />
          )}
          <Tab.Screen
            name="Setting"
            component={SettingNav}
            options={{
              tabBarIcon: ({color, focused}) => (
                <View>
                  <Icon size={focused ? 32 : 24} name="cog" color={color} />
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};
const HomeNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'HomeScreen', gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};
const QRcodeNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="QRcode"
        component={QRcodeScreen}
        options={{title: 'QRcodeScreen', gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};
const QRCodeScannerNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="QRCodeScanner"
        component={QRCodeScannerScreen}
        options={{title: 'QRCodeScannerScreen', gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};
const SettingNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{title: 'QRCodeScannerScreen', gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};
export default React.memo(AppNavigator);
