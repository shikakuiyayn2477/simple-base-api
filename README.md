# SIMPLE BASE API USING EXPRESS JS
---------
### 📃 T&Cs
1. Not For Sale!!!
2. Don't forget to star this repo!
3. If you have any issues, please create an issue in this repo.

---------

---------
### 📃 NOTE
There may be a module missing for the scraper. If yes, add it to package.json and index.js.
---------

---
# Example setting API name etc in index.js
```javascript
/*
For setting API name etc
*/
const title = "EH PI AY DOANG";
const favicon = "https://raw.githubusercontent.com/upload-file-lab/fileupload7/main/uploads/1764494355026.jpeg?format=png&name=900x900";
const logo = "https://raw.githubusercontent.com/upload-file-lab/fileupload7/main/uploads/1770044887516.png";
const headertitle = "REST EH PI AY";
const headerdescription = "Kumpulan API Endpoint yang mungkin berguna.";
const footer = "© SHIKAKU IYAYN AJAH";
```

---
# 🛠️ How to Add Features to api
Just follow this code structure:
# json result
```javascript
// Each file must export a default async function handler(c)
export default async function handler(c) {
  const url = new URL(c.req.url);
  const text = url.searchParams.get('text'); // for https://example.com/api?text=
  if (!text) return c.json({ error: "Missing 'text' parameter" }, 400);
  try {
    // Your code
    const data = {
      result: `Processed: ${text}`
    };
    return c.json(data);
  } catch (e) {
    return c.json({ error: e.message }, 500);
  }
}
````
## Example
```javascript
// Converted example for api/downloader/videy.js (Hono / ESM)
export default async function handler(c) {
  const url = new URL(c.req.url);
  const param = url.searchParams.get('url');
  if (!param) return c.json({ error: "Missing 'url' parameter" }, 400);
  try {
    const videoId = param.split("=")[1];
    if (!videoId) return c.json({ error: "Invalid 'url' parameter" }, 400);
    const anunyah = `https://cdn.videy.co/${videoId}.mp4`;
    const data = {
      fileurl: anunyah
    };
    return c.json(data);
  } catch (e) {
    return c.json({ error: e.message }, 500);
  }
}
```
# for results in file form
```javascript
// Hono (ESM) example for returning binary file/buffer (image, mp4, etc.)
import axios from 'axios';

export default async function handler(c) {
  const url = new URL(c.req.url).searchParams.get('url');
  if (!url) return c.json({ error: "Missing 'url' parameter" }, 400);
  try {
    // fetch remote file as arraybuffer
    const resp = await axios.get(url, { responseType: 'arraybuffer' });
    const buf = Buffer.from(resp.data);
    c.header('Content-Type', 'image/png'); // set proper mimetype
    return c.body(buf, 200);
  } catch (e) {
    return c.json({ error: e.message }, 500);
  }
}
````
## Example:
```javascript
// Converted example for api/tools/ssweb-hp.js (Hono / ESM)
// Uses axios to call screenshot service and to fetch the resulting image
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
  const url = new URL(c.req.url).searchParams.get('url');
  if (!url) return c.json({ error: "Missing 'url' parameter" }, 400);
  try {
    const resultpic = await ssweb(url, { width: 720, height: 1280 });
    const resp = await axios.get(resultpic, { responseType: 'arraybuffer' });
    const buffernya = Buffer.from(resp.data);
    c.header('Content-Type', 'image/png');
    return c.body(buffernya, 200);
  } catch (e) {
    return c.json({ error: e.message }, 500);
  }
}
```
-----

## 📄 How to add link bio to linkbio.json
```json
{
      "name": "Name bio",
      "url": "link bio"
}
```

## Example
```json
{
      "name": "Facebook",
      "url": "https://web.facebook.com/shikakuiyayn"
}
```
-----

## 🚀 How to *Deploy* to Vercel

1. Fork this repo
2. Log in to [vercel.com](https://vercel.com) with your GitHub account
3. Add a project and select your forked repo to deploy
4. Just wait for it to be ready
5. Once it's ready, you're free to customize or rename it, but don't forget to credit it

-----
