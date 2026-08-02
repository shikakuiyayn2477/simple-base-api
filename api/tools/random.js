export default function handler(c) {
  const min = parseInt(c.req.query('min')) || 1;
  const max = parseInt(c.req.query('max')) || 100;
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  
  return c.json({
    random: random,
    min: min,
    max: max
  }, 200);
}
