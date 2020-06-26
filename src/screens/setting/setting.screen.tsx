import React from 'react';
import Setting from '../../components/setting/setting/index';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigators/app.navigation';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const SettingScreen = ({navigation}: Props) => {
  return <Setting navigation={navigation} />;
};

export default SettingScreen;
