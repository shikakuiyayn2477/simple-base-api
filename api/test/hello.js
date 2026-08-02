export default async function handler(c) {
  return c.json({
    message: 'Hello from Hono API!',
    status: 'success',
    timestamp: new Date().toISOString()
  }, 200);
}
