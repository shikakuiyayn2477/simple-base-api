export default function handler(c) {
  return c.json({ 
    message: 'Hello from API!',
    status: 'success',
    timestamp: new Date().toISOString()
  }, 200);
}
