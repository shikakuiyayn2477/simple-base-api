// api/tools/ssweb-hp.js (converted to ESM + axios for fetching image)
import axios from 'axios';

async function ssweb(url, { width = 1280, height = 720, full_page = false, device_scale = 1 } = {}) {
    try {
        if (!url.startsWith('https://')) throw new Error('Invalid url');
        if (isNaN(width) || isNaN(height) || isNaN(device_scale)) throw new Error('Width, height, and scale must be a number');
        if (typeof full_page !== 'boolean') throw new Error('Full page must be a boolean');

        const { data } = await axios.post('https://gcp.imagy.app/screenshot/createscreenshot', {
            url: url,
            browserWidth: parseInt(width),
            browserHeight: parseInt(height),
            fullPage: full_page,
            deviceScaleFactor: parseInt(device_scale),
            format: 'png'
        }, {
            headers: {
                'content-type': 'application/json',
                referer: 'https://imagy.app/full-page-screenshot-taker/',
                'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36'
            }
        });

        return data.fileUrl;
    } catch (error) {
        throw new Error(error.message);
    }
}

export default async function handler(c) {
  const urlObj = new URL(c.req.url);
  const url = urlObj.searchParams.get('url');
  if (!url) return c.json({ error: "Missing 'url' parameter" }, 400);
  try {
    const resultpic = await ssweb(url, { width: 720, height: 1280 });
    const resp = await axios.get(resultpic, { responseType: 'arraybuffer' });
    const buffernya = Buffer.from(resp.data);
    const headers = new Headers();
    // Hono c.raw? use c.body with binary
    c.header('Content-Type', 'image/png');
    return c.body(buffernya, 200);
  } catch (e) {
    return c.json({ error: e.message || 'Internal error' }, 500);
  }
}
