import axios from 'axios';
import {BASE_API_URL} from '../common/connection';
import {APP_CONSTANTS} from '../common/constants';
import {AsyncStorage} from 'react-native';

/**
 * TODO: Call api
 * @param {String} sourceUrl
 * @param {{ method: 'GET' | 'POST', headers: Headers, filter, params, data}} option
 */

type Options = {
  headers: any;
  params?: any;
};

export const request = async (sourceUrl: any, option: any) => {
  try {
    option = option || {};
    const token = await AsyncStorage.getItem('token');
    const headers = {
      'content-type': 'application/json; charset=utf-8',
      token: token ? token : undefined,
    };
    const method = option.method || 'GET';
    const options: Options = {headers};
    let filter = '';
    if (option.filter) {
      filter = `?filter=${JSON.stringify(option.filter)}`;
    }
    if (option.params) {
      options.params = option.params;
    }
    if (method === 'GET') {
      return new Promise((resolve, reject) => {
        axios
          .get(`${BASE_API_URL}${sourceUrl}${filter}`, options)
          .then((response: any) => {
            resolve(response);
          })
          .catch((err: any) => {
            console.log('Error:', err);
            if (err.response) {
              reject(err.response);
            } else {
              reject({status: 404});
            }
          });
      });
    } else {
      const data = option.data || {};
      // return  axios.post(BASE_API_URL + sourceUrl, { ...data }, { headers: header })
      return new Promise((resolve, reject) => {
        axios
          .post(`${BASE_API_URL}${sourceUrl}`, {...data}, {headers})
          .then((response: any) => {
            resolve(response);
          })
          .catch((err: any) => {
            console.log('Error:', err);
            if (err.response) {
              reject(err.response);
            } else {
              reject({status: 404});
            }
          });
      });
    }
  } catch (err) {
    console.log('Error:', err);
  }
};
