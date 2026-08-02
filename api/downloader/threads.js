// api/downloader/threads.js (converted)
import axios from 'axios';

async function threads(url) {
  try {
    const apiUrl = `https://snapthreads.net/api/download?url=${encodeURIComponent(url)}`;
    const response = await axios.get(apiUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36",
        "Referer": "https://snapthreads.net/id",
        "Accept": "*/*",
        "X-Requested-With": "XMLHttpRequest"
      }
    });
    if (response.data && response.data.directLink) {
      return {
        success: true,
        download_url: response.data.directLink
      };
    } else {
      return {
        success: false,
        message: "Gagal mengambil link download.",
        error: response.data
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Terjadi kesalahan dalam mengambil data.",
      error: error.response ? error.response.data : error.message
    };
  }
}

export default async function handler(c) {
  const urlObj = new URL(c.req.url);
  const url = urlObj.searchParams.get('url');
  if (!url) return c.json({ error: "Missing 'url' parameter" }, 400);
  try {
    const result = await threads(url);
    return c.json(result);
  } catch (e) {
    return c.json({ error: e.message || 'Internal error' }, 500);
  }
}
