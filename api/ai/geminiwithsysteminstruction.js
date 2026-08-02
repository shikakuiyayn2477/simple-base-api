// api/ai/geminiwithsysteminstruction.js (converted)
import { GoogleGenAI } from '@google/genai';

export default async function handler(c) {
  const url = new URL(c.req.url);
  const text = url.searchParams.get('text');
  const system = url.searchParams.get('system');
  const apikey = url.searchParams.get('apikey');

  if (!text || !system || !apikey) {
    return c.json({ error: "Missing 'text' or 'system' or 'apikey' parameter" }, 400);
  }

  try {
    const ai = new GoogleGenAI({ apiKey: `${apikey}` });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: `${text}`,
      config: {
        systemInstruction: `${system}`,
      },
    });
    return c.json({ text: response?.text ?? null });
  } catch (e) {
    return c.json({ error: e.message || 'Internal error' }, 500);
  }
}
