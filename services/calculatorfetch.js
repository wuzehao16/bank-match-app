import request from '../lib/request';
import qs from 'qs';


export async function calculatorfetch(params) {
  var str = qs.stringify(params);
  return request(`/app/calculateEqualPrincipalAndInterest?${str}`, {
    method: 'GET'
  });
}
