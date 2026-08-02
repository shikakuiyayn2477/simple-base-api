export default async function handler(c) {
  const min = parseInt(c.req.query('min') || 1);
  const max = parseInt(c.req.query('max') || 100);
  
  if (isNaN(min) || isNaN(max)) {
    return c.json({
      error: 'Invalid parameters',
      message: 'min and max must be valid numbers'
    }, 400);
  }
  
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  
  return c.json({
    random: random,
    min: min,
    max: max
  }, 200);
}
