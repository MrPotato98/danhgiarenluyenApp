import React, {useEffect, useCallback, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../duck/root.reducer';
import {login} from '../../../duck/user/action';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigators/app.navigation';
import InputTextField from '../../../common/inputTextField';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale, sizeFont} from '../../../helpers/size.helper';
import {COLOR, FILE_USER_TOKEN} from '../../../common/constants';
import {useNavigationState} from '@react-navigation/native';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const Login = ({navigation}: Props) => {
  const [input, setInput] = useState({email: '', password: ''});
  const [toggle, setToggle] = useState(true);
  const [isSelected, setSelection] = useState(true);

  const dispatch = useDispatch();

  const user = useSelector((states: RootState) => states.user);
  //route name
  const routes = useNavigationState((state) => state.routes);
  const currentRoute = routes[routes.length - 1].name;
  const loginRequest = useCallback(
    (email, password) => {
      dispatch(
        login({
          email,
          password,
        }),
      );
    },
    [dispatch],
  );
  const onSubmit = (email: string, password: string) => {
    // console.log(email);
    if (email && password) {
      loginRequest(email, password);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      if (user.success === true && user.info && currentRoute === 'Login') {
        navigation.replace('QRcode');
      }
    }, 500);
  }, [user.info]);

  const onChange = (text: any, type: string) => {
    setInput({...input, [type]: text});
  };

  // console.log(user);

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          marginTop: 60,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={require('../../../../res/image/logo.png')} />
        <Text
          style={[
            styles.text,
            {marginTop: 10, fontSize: sizeFont(22), fontWeight: '500'},
          ]}>
          Đánh giá rèn luyện
        </Text>
      </View>

      <InputTextField
        style={{
          marginVertical: 20,
        }}
        title="Email"
        name
        onChangeText={(text: any) => onChange(text, 'email')}
      />
      <InputTextField
        style={{
          marginTop: 32,
          marginBottom: 8,
        }}
        title="Password"
        onChangeText={(text: any) => onChange(text, 'password')}
        isSecure={toggle}
        icon={
          <TouchableOpacity
            onPress={() => setToggle(!toggle)}
            style={styles.eyeIcon}>
            {toggle ? (
              <Ionicons
                name="ios-eye-off"
                color={COLOR.iconColor}
                size={moderateScale(20)}
              />
            ) : (
              <Ionicons
                name="ios-eye"
                color={COLOR.iconColor}
                size={moderateScale(20)}
              />
            )}
          </TouchableOpacity>
        }
      />
      <Text style={[styles.text, styles.link, {textAlign: 'right'}]}>
        Forgot Password?
      </Text>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
          tintColors={COLOR.appColor}
          tintColor={COLOR.appColor}
        />
        <Text style={styles.label}>Remember me</Text>
      </View>
      <TouchableOpacity
        style={styles.submitContainer}
        onPress={() => onSubmit(input.email, input.password)}>
        <Text
          style={[
            styles.text,
            {
              color: '#FFF',
              fontWeight: '600',
              fontSize: 16,
            },
          ]}>
          {!user.running && user.isValidToken ? 'Logging...' : 'Login'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: moderateScale(30),
  },
  text: {
    fontFamily: 'Avenir Next',
    color: COLOR.text,
  },
  socialButton: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(12),
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(30),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(171, 180, 189, 0.65)',
    borderRadius: moderateScale(4),
    backgroundColor: '#fff',
    shadowColor: 'rgba(171, 180, 189, 0.35)',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
  },
  socialLogo: {
    width: moderateScale(16),
    height: moderateScale(16),
    marginRight: moderateScale(8),
  },
  link: {
    color: COLOR.appColor,
    fontSize: sizeFont(14),
    fontWeight: '500',
  },
  submitContainer: {
    backgroundColor: COLOR.appColor,
    fontSize: sizeFont(16),
    borderRadius: moderateScale(4),
    paddingVertical: moderateScale(12),
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
  eyeIcon: {
    position: 'absolute',
    top: moderateScale(15),
    right: moderateScale(5),
    width: moderateScale(20),
    height: moderateScale(20),
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: moderateScale(8),
    color: COLOR.appColor,
  },
});
export default React.memo(Login);
