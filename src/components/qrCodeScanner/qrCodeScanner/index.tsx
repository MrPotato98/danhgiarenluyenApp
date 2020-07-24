import React, {useState, useEffect, useRef, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../duck/root.reducer';

import moment from 'moment';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Linking,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigators/app.navigation';
import {moderateScale, sizeWidth, sizeFont} from '../../../helpers/size.helper';
import {COLOR} from '../../../common/constants';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

import {check as checkIn, getIsCheck} from '../../../duck/check/action';
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};
const {width, height} = Dimensions.get('window');
const QRcodeScan: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();

  const checkRequest = useCallback(() => {
    dispatch(checkIn());
  }, [dispatch]);

  const isCheck = useCallback(() => {
    dispatch(getIsCheck());
  }, [dispatch]);

  const checkStore = useSelector((states: any) => states.check);

  useEffect(() => {
    isCheck();
  }, [checkStore.result]);

  const date = moment().utcOffset('+07:00').format('DD.MM.YYYY');
  const time = moment().utcOffset('+07:00').format('hh:mm:ss a');
  const [state, setState] = useState({
    result: '',
    scan: true,
    ScanResult: false,
  });
  const _backToCamera = (e: any) => {
    // Linking.openURL('http://localhost:3000');
    setState({
      result: e,
      scan: true,
      ScanResult: false,
    });
  };
  const onSuccess = (e: any) => {
    const check = e.data;

    let dates = new Date();
    let todayDate = new Date(
      dates.getTime() - dates.getTimezoneOffset() * 60000,
    )
      .toISOString()
      .slice(0, 10);

    if (check === todayDate) {
      if (checkStore.isCheck.success) {
        if (
          checkStore.isCheck.result.checkin &&
          !checkStore.isCheck.result.checkout
        ) {
          Alert.alert(
            //title
            'Checkout',
            //body
            'Bạn muốn check out?',
            [
              {text: 'Hủy', onPress: () => {}},
              {text: 'Đồng ý', onPress: () => checkRequest()},
            ],
            {cancelable: true},
          );
        }
        if (
          !checkStore.isCheck.result.checkin &&
          !checkStore.isCheck.result.checkout
        ) {
          checkRequest();
          Alert.alert('Bạn đã checkin thành công');
        }

        if (
          checkStore.isCheck.result.checkin &&
          checkStore.isCheck.result.checkout
        ) {
          Alert.alert('Bạn đã hoàn thành điểm danh rồi');
        }
      }

      // Alert.alert(time, date);
      setState({
        result: e,
        scan: false,
        ScanResult: true,
      });
    } else {
      Alert.alert('Mã không đúng');
    }
  };

  return (
    <>
      {state.scan ? (
        <QRCodeScanner
          reactivate={true}
          // cameraType={'front'}
          onRead={onSuccess}
          // flashMode={RNCamera.Constants.FlashMode.torch}
          showMarker={true}
          markerStyle={{borderColor: '#fff', borderRadius: 10}}
          topContent={
            <View style={styles.container}>
              <Text style={styles.centerText}>
                <Text style={styles.textBold}>Quét mã QR </Text>
                để chấm công
              </Text>
            </View>
          }
          //   bottomContent={
          //     <TouchableOpacity style={styles.buttonTouchable}>
          //       <Text style={styles.buttonText}>Hoàn tất</Text>
          //     </TouchableOpacity>
          //   }
        />
      ) : state.ScanResult === true ? (
        <View style={styles.container}>
          <View style={styles.body}>
            <Text style={styles.centerText}>
              Bạn đã điểm danh thành công vào lúc{' '}
              <Text style={styles.textBold}>{time}</Text> ngày{' '}
              <Text style={styles.textBold}>{date}</Text>
            </Text>
            <TouchableOpacity
              style={styles.submitContainer}
              onPress={_backToCamera}>
              <Text
                style={[
                  styles.centerText,
                  {color: COLOR.white, padding: moderateScale(10)},
                ]}>
                Chấm công
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    alignSelf: 'flex-start',
    marginStart: moderateScale(15),
  },
  body: {
    width: width - moderateScale(30),
    height: height - moderateScale(50),
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.white,
    borderRadius: moderateScale(4),
    paddingHorizontal: moderateScale(10),
  },
  footer: {
    paddingHorizontal: sizeWidth(16),
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: sizeFont(14),
    fontWeight: 'bold',
  },
  centerText: {
    fontSize: sizeFont(18),
    textAlign: 'center',
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: COLOR.appColor,
    fontSize: sizeFont(22),
  },
  submitContainer: {
    backgroundColor: COLOR.appColor,
    fontSize: sizeFont(16),
    borderRadius: moderateScale(4),
    paddingVertical: moderateScale(1),
    marginTop: moderateScale(32),
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFF',
    shadowColor: 'rgba(255, 22, 84, 0.24)',
    shadowOffset: {width: 0, height: 9},
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
  },
});
export default React.memo(QRcodeScan);
