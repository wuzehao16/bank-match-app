import 'isomorphic-unfetch'
import BaseUrl from './url'
export default async function(pathname, token) {
  const res = token
              ? await fetch(`${BaseUrl}/app${pathname}`, {
                headers: {
                  'token': token
                },
              })
              : await fetch(`${BaseUrl}/app${pathname}`)
  const body = (await res.json()).data;
  if (!res.ok) {
    const err = new Error(body.error.message || 'Failed to fetch user');
    err.res = res;
    err.body = body;
    throw err;
  }

  return body;
}
