import React, {useState, useEffect, useRef, useCallback} from 'react';
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
import {Agenda} from 'react-native-calendars';
import {
  getTimeSheet,
  getAdminTimeSheet,
  resetData,
} from '../../../duck/time-sheets/action';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const {width, height} = Dimensions.get('window');
const Home: React.FC<Props> = ({navigation}) => {
  const [myTimeSheet, setMyTimeSheet] = useState({});
  const timeSheet = useSelector((states: RootState) => states.timesheet);
  const user = useSelector((states: RootState) => states.user);
  const dispatch = useDispatch();

  const getTimeSheetRequest = useCallback(async () => {
    await dispatch(getTimeSheet());
  }, [dispatch]);

  const getAdminTimeSheetRequest = useCallback(async () => {
    await dispatch(getAdminTimeSheet());
  }, [dispatch]);
  //call API
  useEffect(() => {
    if (user.info && user.info.job_id !== 0) getTimeSheetRequest();
    // if (user.info && user.info.job_id === 1) getAdminTimeSheetRequest();
  }, []);
  const getUserTimeSheet = useCallback(async () => {
    if (timeSheet && timeSheet.result.success === true) {
      let date: any = await timeSheet.result.result.map((i: any) => i.date);
      let checkin: any = await timeSheet.result.result.map((i: any) =>
        moment(new Date(i.checkin)).format('hh:mm:ss a'),
      );
      let checkout: any = await timeSheet.result.result.map((i: any) =>
        i.checkout
          ? moment(new Date(i.checkout)).format('hh:mm:ss a')
          : 'Bạn quên chưa check out',
      );
      let res: any = new Object();
      let arr = [];
      for (var i = 0, length = date.length; i < length; i++) {
        res = date[i];
        arr.push({
          [res]: [
            {
              name:
                'Bạn đi làm vào lúc: ' +
                checkin[i] +
                ' - ' +
                'ra về vào lúc: ' +
                checkout[i],
            },
          ],
        });
      }
      setMyTimeSheet(
        arr.reduce(function (result, item) {
          var key: any = Object.keys(item)[0]; //first property: a, b, c
          result[key] = item[key];
          return result;
        }, {}),
      );
    }
  }, [timeSheet.result]);
  // console.log(timeSheet.admin);

  // const getAdminTimeSheets = useCallback(async () => {
  //   if (timeSheet && timeSheet.admin.success === true) {
  //     let date: any = await timeSheet.admin.result.map((i: any) =>
  //       i.timesheet.map((ii: any) => ii.date),
  //     );
  //     // let checkin: any = await timeSheet.admin.result.map((i: any) =>
  //     //   moment(new Date(i.checkin)).format('hh:mm:ss a'),
  //     // );

  //     //   let checkout: any = await timeSheet.admin.admin.map((i: any) =>
  //     //     i.checkout
  //     //       ? moment(new Date(i.checkout)).format('hh:mm:ss a')
  //     //       : 'Bạn quên chưa check out',
  //     //   );
  //     let res: any = new Object();
  //     let arr = [];
  //     for (var i = 0, length = date.length; i < length; i++) {
  //       if (date[i].length > 0) {
  //         res = date[i];
  //         arr.push({
  //           [res[i]]: [
  //             {
  //               name: 'abc',
  //             },
  //           ],
  //         });
  //       }
  //     }
  //     console.log(
  //       arr.reduce(function (result, item) {
  //         var key: any = Object.keys(item)[0]; //first property: a, b, c
  //         result[key] = item[key];
  //         return result;
  //       }, {}),
  //     );
  //     // setMyTimeSheet(
  //     //   arr.reduce(function (result, item) {
  //     //     var key: any = Object.keys(item)[0]; //first property: a, b, c
  //     //     result[key] = item[key];
  //     //     return result;
  //     //   }, {}),
  //     // );
  //   }
  // }, [timeSheet.admin.success]);
  // useEffect(() => {
  //   if (user.info && user.info.job_id === 1) getAdminTimeSheets();
  // }, [getAdminTimeSheets]);
  useEffect(() => {
    if (user.info && user.info.job_id !== 0) getUserTimeSheet();
  }, [getUserTimeSheet]);
  // console.log(myTimeSheet);

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

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Agenda
          items={Object.keys(myTimeSheet).length === 0 ? {} : myTimeSheet}
          selected={new Date()}
          // loadItemsForMonth={loadItems.bind(this)}
          rowHasChanged={(r1: any, r2: any) => {
            return r1.name !== r2.name;
          }}
          renderItem={renderItem.bind(this)}
          renderEmptyDate={renderEmptyDate.bind(this)}
          minDate={new Date().setDate(new Date().getDate() - 90)}
          maxDate={new Date().setDate(new Date().getDate() + 90)}
          pastScrollRange={3}
          futureScrollRange={3}
          onRefresh={() => {
            dispatch(getTimeSheet());
          }}
          refreshing={false}
          refreshControl={null}
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
