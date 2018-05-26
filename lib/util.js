import dayjs from 'dayjs';

export function formatData (val) {
  for (let i in val) {
    val[i] = (
      typeof val[i] == "object"
      ? (val[i].length == 1? val[i][0]:dayjs(val[i].join('-')).valueOf())
      : val[i])
  }
  return val
};