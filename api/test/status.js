export default async function handler(c) {
  return c.json({
    status: 'online',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    platform: process.platform,
    nodeVersion: process.version
  }, 200);
}
