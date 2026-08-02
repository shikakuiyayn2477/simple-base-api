export default async function handler(c) {
  const message = c.req.query('msg') || 'No message provided';
  const count = parseInt(c.req.query('count') || 1);
  
  const result = Array(Math.max(1, Math.min(count, 10)))
    .fill(message)
    .map((msg, i) => `${i + 1}. ${msg}`);
  
  return c.json({
    message: message,
    count: Math.max(1, Math.min(count, 10)),
    result: result
  }, 200);
}
