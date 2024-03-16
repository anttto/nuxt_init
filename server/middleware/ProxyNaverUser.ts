export default defineEventHandler(async (event) => {
  if (!event.node.req.url?.startsWith('/v1')) return;
  const target = new URL(event.node.req.url?.replace('/v1/**', ''), 'https://openapi.naver.com/**');
  return await proxyRequest(event, target.toString());
});
