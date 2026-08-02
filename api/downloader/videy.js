// api/downloader/videy.js (converted)
export default async function handler(c) {
  const urlObj = new URL(c.req.url);
  const url = urlObj.searchParams.get('url');
  if (!url) return c.json({ error: "Missing 'url' parameter" }, 400);
  try {
    const videoId = url.split('=')[1];
    if (!videoId) return c.json({ error: "Invalid 'url' parameter" }, 400);
    const anunyah = `https://cdn.videy.co/${videoId}.mp4`;
    const data = {
      fileurl: anunyah
    };
    return c.json(data);
  } catch (e) {
    return c.json({ error: e.message || 'Internal error' }, 500);
  }
}
