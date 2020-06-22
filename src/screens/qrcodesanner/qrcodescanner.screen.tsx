import React from 'react';
import QRCodeScanner from '../../components/qrCodeScanner/qrCodeScanner/index';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigators/app.navigation';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const QRCodeScannerScreen = ({navigation}: Props) => {
  return <QRCodeScanner navigation={navigation} />;
};

export default QRCodeScannerScreen;
