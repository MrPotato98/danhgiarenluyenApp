import React from 'react';
import QRcode from '../../components/qrcode/qrcode/index';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigators/app.navigation';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const QRcodeScreen = ({navigation}: Props) => {
  return <QRcode navigation={navigation} />;
};

export default QRcodeScreen;
