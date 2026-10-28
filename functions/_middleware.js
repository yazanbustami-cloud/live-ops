export async function onRequest({ request, env, next }) {
  if (!env.DASH_USER || !env.DASH_PASS) return next();
  const expected = 'Basic ' + btoa(`${env.DASH_USER}:${env.DASH_PASS}`);
  if (request.headers.get('Authorization') === expected) return next();
  return new Response('Login required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Petra Ride Live Ops", charset="UTF-8"' }
  });
}
