import 'isomorphic-unfetch'

const baseUrl = (process.env.NODE_ENV === 'production') ? 'https://api.ibankmatch.com:8620' : 'http://ad.ibankmatch.com:8611'

export default async function(pathname, token) {
	const res = await fetch(`${baseUrl}/app${pathname}`,{
		headers: {
			'token': token
		},
	})
  const body = (await res.json()).data;
  if (!res.ok) {
    const err = new Error(body.error.message || 'Failed to fetch user');
    err.res = res;
    err.body = body;
    throw err;
  }

  return body;
}
