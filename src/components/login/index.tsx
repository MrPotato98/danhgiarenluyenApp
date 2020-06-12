import React, {useEffect, useCallback, useState} from 'react';
import {
  View,
  Text,
  Button,
  ImageBackground,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../duck/root.reducer';
import {login} from '../../duck/user/action';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigators/app.navigation';
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native-gesture-handler';

import {
  sizeFont,
  sizeWidth,
  moderateScale,
  sizeHeight,
  useScreenDimensions,
} from '../../helpers/size.helper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {COLOR} from '../../common/color';
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};
const {width, height} = Dimensions.get('window');

const Home: React.FC<Props> = ({navigation}) => {
  const screenData = useScreenDimensions();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    action: {
      flexDirection: 'row',
      marginTop: 10,
    },
    footer: {
      flex: 3,
      width: screenData.width,
      height: screenData.isLandscape
        ? screenData.height + moderateScale(135)
        : screenData.height - moderateScale(135),
      backgroundColor: COLOR.white,
      borderTopLeftRadius: sizeWidth(screenData.width / 8 - 10),
      borderTopRightRadius: sizeWidth(screenData.width / 8 - 10),
      paddingHorizontal: moderateScale(screenData.width / 32 - 5),
      paddingVertical: moderateScale(screenData.width / 8 - 10),
    },
    header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50,
    },
    text_header: {
      color: COLOR.white,
      fontWeight: 'bold',
      fontSize: sizeFont(30),
    },
    text_footer: {
      color: '#555555',
      fontSize: sizeFont(18),
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: 'grey',
      fontSize: sizeFont(30),
      fontWeight: 'bold',
    },
    eyeIcon: {
      position: 'absolute',
      top: moderateScale(11),
      right: moderateScale(30),
      width: moderateScale(25),
      height: moderateScale(25),
    },
    input: {
      width: screenData.width - moderateScale(55),
      height: moderateScale(45),
      borderRadius: moderateScale(25),
      fontSize: sizeFont(16),
      paddingLeft: sizeWidth(45),
      backgroundColor: 'rgba(0,0,0,0.35)',
      color: 'rgba(255,255,255,0.7)',
      marginHorizontal: moderateScale(25),
    },
    inputIcon: {
      position: 'absolute',
      top: moderateScale(8),
      left: moderateScale(37),
    },
    button: {
      alignItems: 'center',
      marginTop: 50,
      backgroundColor: '#333333',
      borderRadius: 20,
    },
    signIn: {
      width: screenData.width / 8 + 10,
      height: moderateScale(50),
      justifyContent: 'center',
      alignItems: 'center',
    },
    textSign: {
      fontSize: sizeFont(18),
      fontWeight: 'bold',
    },
  });
  const [toggle, setToggle] = useState(true);

  const dispatch = useDispatch();
  const user = useSelector((states: RootState) => states.user);

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

  useEffect(() => {
    loginRequest('huy@gmail.com', '123');
  }, []);
  const _renderLogin = () => {
    return (
      <View style={styles.footer}>
        <Text
          style={[
            styles.text_footer,
            {
              paddingLeft: sizeWidth(35),
            },
          ]}>
          Email
        </Text>
        <View style={styles.action}>
          <MaterialIcon
            name={'email'}
            size={moderateScale(28)}
            color={COLOR.iconColor}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            placeholderTextColor="white"
            autoCapitalize="none"
          />
        </View>
        <Text
          style={[
            styles.text_footer,
            {
              marginTop: sizeHeight(35),
              paddingLeft: sizeWidth(35),
            },
          ]}>
          Password
        </Text>
        <View style={styles.action}>
          <MaterialIcon
            name={'lock'}
            size={moderateScale(28)}
            color={COLOR.iconColor}
            style={styles.inputIcon}
          />
          <Ionicons
            name="ios-eye-off"
            style={styles.eyeIcon}
            color={COLOR.iconColor}
            size={moderateScale(25)}
          />
          <TouchableOpacity onPress={() => setToggle(!toggle)}>
            {toggle ? (
              <Ionicons
                name="ios-eye-off"
                style={styles.eyeIcon}
                color={COLOR.iconColor}
                size={moderateScale(25)}
              />
            ) : (
              <Ionicons
                name="ios-eye"
                style={styles.eyeIcon}
                color={COLOR.iconColor}
                size={moderateScale(25)}
              />
            )}
          </TouchableOpacity>
          <TextInput
            placeholder="Password"
            style={styles.input}
            placeholderTextColor="white"
            autoCapitalize="none"
            secureTextEntry={toggle ? true : false}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          // onPress={() => {loginHandle( data.username, data.password )}}
        >
          <View style={styles.signIn}>
            <Text
              style={[
                styles.textSign,
                {
                  color: COLOR.white,
                },
              ]}>
              Login
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  console.log(user);

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../../../res/img/background.png')}
        style={styles.image}>
        <StatusBar backgroundColor="#009387" barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.text_header}>Welcome!</Text>
        </View>
        {_renderLogin()}
      </ImageBackground>
      {/* <Button title="asa" onPress={() => navigation.navigate('Detail')} /> */}
    </ScrollView>
  );
};

export default React.memo(Home);
