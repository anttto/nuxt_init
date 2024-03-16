export default defineEventHandler(async (event) => {
  if (!event.node.req.url?.startsWith('/oauth2.0')) return;
  const target = new URL(event.node.req.url?.replace('/oauth2.0/**', ''), 'https://nid.naver.com/**');
  return await proxyRequest(event, target.toString());
});
