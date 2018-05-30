import dayjs from 'dayjs';

export function formatData (val) {
  for (let i in val) {
    if (typeof val[i] == "object") {
      switch (val[i].length) {
        case 1:
          val[i] = val[i][0];
          break;
        case 2:
          val[i] = dayjs(val[i].join('-')).valueOf();
          break;
        case 3:
          val[i] = val[i].join('-')
        default:

      }
    }
  }
  return val
};

export function getCookie(sName,req){
  if (!req) {
    return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
  }
  if (!req.headers['cookie']) {
    return
  }
  var aCookie = req.headers['cookie'].split("; ");
  for (var i=0; i < aCookie.length; i++){
    var aCrumb = aCookie[i].split("=");
    if (sName == aCrumb[0])
    return unescape(aCrumb[1]);
  }
  return '';
}
