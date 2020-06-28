import React, {useState, useEffect} from 'react';
import QRCode from 'react-native-qrcode-svg';
import moment from 'moment';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigators/app.navigation';
import {moderateScale, sizeWidth, sizeFont} from '../../../helpers/size.helper';
import {COLOR} from '../../../common/constants';
// import {
//   useScreenDimensions,
//   moderateScale,
//   sizeWidth,
//   sizeFont,
// } from '../../helpers/size.helper';
// import {COLOR} from '../../common/color';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};
const {width, height} = Dimensions.get('window');
const QRcode: React.FC<Props> = ({navigation}) => {
  const [datetime, setdatetime] = useState({date: '', time: ''});
  //   const screenData = useScreenDimensions();
  useEffect(() => {
    let date = moment().utcOffset('+07:00').format('DD.MM.YYYY');
    let time = moment().utcOffset('+07:00').format('hh:mm:ss a');
    let id = setInterval(() => {
      setdatetime({date, time});
    }, 1000);
    return () => clearInterval(id);
  });

  var todayDate = new Date().toISOString().slice(0, 10);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.title}>Mã QR code</Text>
          <Text
            style={[styles.desc, {alignSelf: 'flex-start', color: '#999999'}]}>
            Quét mã để chấm công
          </Text>
        </View>
        <Image
          style={styles.line}
          source={require('../../../../res/icon/line.png')}
        />
        <QRCode value={todayDate} size={moderateScale(120)} />
        <Text style={[styles.desc, {textAlign: 'center'}]}>
          Cập nhật hôm nay, {moment().utcOffset('+07:00').format('hh:mm a')}
        </Text>
        <Image
          style={styles.line}
          source={require('../../../../res/icon/line.png')}
        />
        <View style={styles.footer}>
          <Text
            style={[styles.desc, {alignSelf: 'flex-start', color: '#999999'}]}>
            Ngày chấm công
          </Text>
          <Text style={{fontSize: 20, color: COLOR.appColor}}>
            {datetime.date ? datetime.date : 'Loading ...'}
          </Text>
          <Text
            style={[styles.desc, {alignSelf: 'flex-start', color: '#999999'}]}>
            Giờ chấm công
          </Text>
          <Text style={{fontSize: 20, color: COLOR.appColor}}>
            {datetime.time ? datetime.time : 'Loading ...'}
          </Text>
        </View>
        <View style={[styles.circle, styles.left, styles.top]} />
        <View style={[styles.circle, styles.right, styles.top]} />
        <View style={[styles.circle, styles.left, styles.bottom]} />
        <View style={[styles.circle, styles.right, styles.bottom]} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLOR.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignSelf: 'flex-start',
    marginStart: moderateScale(15),
  },
  body: {
    width: width - moderateScale(30),
    height: height - moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.white,
    borderRadius: moderateScale(4),
  },
  footer: {
    paddingHorizontal: sizeWidth(16),
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: sizeFont(14),
    fontWeight: 'bold',
  },
  line: {
    width: '94%',
    alignSelf: 'center',
    height: 1,
    marginVertical: moderateScale(20),
  },
  desc: {
    marginTop: moderateScale(5),
    width: sizeWidth(170),
    color: COLOR.blur,
  },
  circle: {
    backgroundColor: COLOR.bg,
    position: 'absolute',
    width: sizeWidth(18),
    height: sizeWidth(18),
    borderRadius: sizeWidth(9),
  },
  left: {
    left: sizeWidth(-9),
  },
  top: {
    top: sizeWidth(120),
  },
  bottom: {
    bottom: sizeWidth(163),
  },
  right: {
    right: sizeWidth(-9),
  },
});
export default React.memo(QRcode);
