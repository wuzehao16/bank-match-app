export default function getCookie(sName,req){
  if (!req.headers['cookie']) {
    return
  }
  var aCookie = req.headers['cookie'].split("; ");
  for (var i=0; i < aCookie.length; i++){
    var aCrumb = aCookie[i].split("=");
    if (sName == aCrumb[0])
    return unescape(aCrumb[1]);
  }
  return "";
}
