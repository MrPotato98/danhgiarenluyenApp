import React from 'react';
import Login from '../components/login/index';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigators/app.navigation';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const LoginScreen = ({navigation}: Props) => {
  return <Login navigation={navigation} />;
};

export default LoginScreen;
