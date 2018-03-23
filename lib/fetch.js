const fetch = require('node-fetch')

export default async function (pathname) {
	const res = await fetch(`https://api.hnpwa.com/v0${pathname}.json`)
  const body = await res.json();
  // const body = {
  //   msg:ok
  // }
  if (!res.ok) {
    const err = new Error(body.error.message || 'Failed to fetch user');
    err.res = res;
    err.body = body;
    throw err;
  }

  return body;
}
