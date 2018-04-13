import 'isomorphic-unfetch'

export default async function(pathname, token) {
	const res = await fetch(`http://47.106.70.82:8611/app${pathname}`,{
		headers: {
			// 'token': token
			'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkNzk3OWY0MGQzZmE0ZTc0YTFjNGY0NjU4NmEyNWNjNyIsImlhdCI6MTUyMzI0OTgyOCwiZXhwIjoxNTIzODU0NjI4fQ.pyE6jvRonxQjrzJxSGKxTV_hKTmJkplNim8Mo0kq__6yFtD-LOOcE3F754UKugla9r4tvxzTTlM2ly-e_X8HHg'
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
