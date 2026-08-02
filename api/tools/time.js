export default async function handler(c) {
  const now = new Date();
  return c.json({
    current_time: now.toISOString(),
    unix_timestamp: Math.floor(now.getTime() / 1000),
    readable_time: now.toString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  }, 200);
}
