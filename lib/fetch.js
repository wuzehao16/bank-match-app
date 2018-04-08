// const fetch = require('node-fetch')
import 'isomorphic-unfetch'
export default async function (pathname) {
	// console.log(pathname)
	const res = await fetch(`http://47.106.70.82:8611/app${pathname}`,{
		headers: {
			'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkNzk3OWY0MGQzZmE0ZTc0YTFjNGY0NjU4NmEyNWNjNyIsImlhdCI6MTUyMjYzMzczNCwiZXhwIjoxNTIzMjM4NTM0fQ.qq14ADKebQca0nieYISYJuPVyQHBVtwPb4zhtboJaTq52emgwNogK5JoWeVlq-O1c28USsx1U1WqHXhc7yhN9A'
		},
	})
  const body = (await res.json()).data;
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
