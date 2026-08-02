export default function handler(c) {
  return c.json({
    status: 'online',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  }, 200);
}
