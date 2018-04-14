import 'isomorphic-unfetch'

export default async function(pathname, token) {
	const res = await fetch(`http://47.106.70.82:8611/app${pathname}`,{
		headers: {
			// 'token': token
			'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkNzk3OWY0MGQzZmE0ZTc0YTFjNGY0NjU4NmEyNWNjNyIsImlhdCI6MTUyMzY5NjIwNiwiZXhwIjoxNTI0MzAxMDA2fQ.VDoxwzV16BXIwmua79y7s2llrfzxxYwjjZszF6swX2z-7XdVDSsPbooW7oIE0nEUZ95TNY_vxoY3FRna1m6fgg'
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
