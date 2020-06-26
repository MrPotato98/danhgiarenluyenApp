import React, {useState, useEffect, useRef} from 'react';
import moment from 'moment';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigators/app.navigation';
import {moderateScale, sizeWidth, sizeFont} from '../../../helpers/size.helper';
import {COLOR} from '../../../common/constants';
import {useDispatch, useSelector} from 'react-redux';
import {logOut} from '../../../duck/user/action';
import {RootState} from '../../../duck/root.reducer';
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};
const {width, height} = Dimensions.get('window');
const Setting: React.FC<Props> = ({navigation}) => {
  const user = useSelector((states: RootState) => states.user);
  const dispatch = useDispatch();
  const _Logout = () => {
    dispatch(logOut());
  };
  useEffect(() => {
    if (user.isValidToken === false && !user.info) {
      navigation.navigate('Login');
    }
  }, [user.isValidToken]);
  //   console.log(user);
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <TouchableOpacity style={styles.submitContainer} onPress={_Logout}>
          <Text
            style={[
              styles.centerText,
              {color: COLOR.white, padding: moderateScale(10)},
            ]}>
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
export default React.memo(Setting);
