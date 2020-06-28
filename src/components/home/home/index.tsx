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
import {RootState} from '../../../duck/root.reducer';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const {width, height} = Dimensions.get('window');
const Home: React.FC<Props> = ({navigation}) => {
  const [state, setState] = useState({items: {}});
  const user = useSelector((states: RootState) => states.user);
  const dispatch = useDispatch();

  const timeToString = (time: any) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  const loadItems = (day: any) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!state.items[strTime]) {
          state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            state.items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems: any = {};
      Object.keys(state.items).forEach((key) => {
        newItems[key] = state.items[key];
      });
      setState({
        items: newItems,
      });
    }, 1000);
  };
  const renderItem = (item: any) => {
    return (
      <View style={{flex: 1}}>
        <View style={[styles.item, {height: item.height}]}>
          <Text>{item.name}</Text>
        </View>
        {/* <View
          style={{
            height: 1,
            backgroundColor: '#ccc',
            bottom: 1,
            marginEnd: 10,
          }}
        /> */}
      </View>
    );
  };
  const renderEmptyDate = () => {
    return (
      <View style={{flex: 1}}>
        <View style={[styles.emptyDate]}>
          <Text style={{color: COLOR.white}}>This is empty date!</Text>
        </View>
        {/* <View
          style={{height: 1, backgroundColor: '#ccc', bottom: 1, marginEnd: 10}}
        /> */}
      </View>
    );
  };

  //   console.log(user);
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Agenda
          items={{
            '2020-06-22': [{name: 'item 1 - any js object'}],
            '2020-06-23': [{name: 'item 2 - any js object'}],
            '2020-06-25': [],
            '2020-06-27': [
              {name: 'item 3 - any js object'},
              {name: 'any js object'},
            ],
            '2020-06-21': [
              {name: 'item 3 - any js object'},
              {name: 'any js object'},
            ],
            '2020-06-26': [
              {name: 'item 3 - any js object'},
              {name: 'any js object'},
            ],
            '2020-06-28': [
              {name: 'item 3 - any js object'},
              {name: 'any js object'},
            ],
          }}
          selected={'2020-06-22'}
          loadItemsForMonth={loadItems.bind(this)}
          rowHasChanged={(r1: any, r2: any) => {
            return r1.name !== r2.name;
          }}
          renderItem={renderItem.bind(this)}
          renderEmptyDate={renderEmptyDate.bind(this)}
          // theme={{
          //   agendaDayTextColor: 'yellow',
          //   agendaDayNumColor: 'green',
          //   agendaTodayColor: 'red',
          //   agendaKnobColor: 'blue',
          // }}
          displayLoadingIndicator={true}
          monthFormat={'yyyy MM'}
        />
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
    top: moderateScale(5),
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
  item: {
    backgroundColor: COLOR.white,
    flex: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    marginTop: 5,
  },
  emptyDate: {
    backgroundColor: COLOR.appColor,
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 5,
    height: 20,
  },
});
export default React.memo(Home);
