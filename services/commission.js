import request from '../lib/request';
import qs from 'qs';

export async function fetchDetail(params) {
    var str = qs.stringify(params);
  return request(`/app/getIncomesList?${str}`);
}
