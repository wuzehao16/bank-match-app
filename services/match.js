// import { stringify } from 'qs';
import request from '../lib/request';

export async function queryDetail(params) {
  return request(`/app/selectModelUserDetail?matchNo=${params}`);
}

export async function add(params) {
<<<<<<< HEAD
  return request(`/app/getMatchModeResult`, {
=======
  return request('http://ad.ibankmatch.com:8611/app/getMatchModeResult', {
>>>>>>> f28de01e8a899a29aae224d844a8eb27cab1a1df
    method: 'POST',
    body: {
      ...params,
      matchJson:JSON.stringify(params.matchJson)
    },
  });
}
