import request from '../lib/request';
import qs from 'qs';


export async function calculatorfetch(params) {
  var str = qs.stringify(params);
  return request(`http://47.106.70.82:8611/app/calculateEqualPrincipalAndInterest?${str}`, {
   // return request('http://192.168.2.100:8611/app/getMatchModeResult', {
    method: 'GET'
  });
}
