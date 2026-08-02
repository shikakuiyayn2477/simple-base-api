// api/ai/gemini.js (converted to Hono-compatible module)
// Export default handler(c)
import { GoogleGenAI } from '@google/genai';

export default async function handler(c) {
  const url = new URL(c.req.url);
  const text = url.searchParams.get('text');
  const apikey = url.searchParams.get('apikey');

  if (!text || !apikey) {
    return c.json({ error: "Missing 'text' or 'apikey' parameter" }, 400);
  }

  try {
    const ai = new GoogleGenAI({ apiKey: `${apikey}` });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: `${text}`
    });
    const replyText = response?.text ?? response?.output?.[0]?.content ?? JSON.stringify(response);
    return c.json({ text: replyText });
  } catch (e) {
    return c.json({ error: e.message || 'Internal error' }, 500);
  }
}
