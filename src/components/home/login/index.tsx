import React, {useEffect, useCallback} from 'react';
import {View, Text, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../duck/root.reducer';
import {login} from '../../../duck/user/action';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigators/app.navigation';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const Home = ({navigation}: Props) => {
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

  console.log(user);

  return (
    <View>
      <Text>asdfwsef</Text>
      <Button title="asa" onPress={() => navigation.navigate('Detail')} />
    </View>
  );
};

export default React.memo(Home);
