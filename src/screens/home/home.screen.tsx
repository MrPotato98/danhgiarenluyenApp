import React from 'react';
import Home from '../../components/home/home';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigators/app.navigation';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const HomeScreen = ({navigation}: Props) => {
  return <Home navigation={navigation} />;
};

export default HomeScreen;
