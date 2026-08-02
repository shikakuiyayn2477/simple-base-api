# SIMPLE BASE API (Converted to Hono)

Project ini awalnya menggunakan Express.js — saya sudah mengonversi seluruh server ke Hono (ESM) dan menambahkan halaman 404. Struktur folder dan endpoint tetap dipertahankan agar perubahan mudah diikuti: api/<kategori>/<route>.js, file static (script.js, styles.css, linkbio.json), dan halaman utama.

---
### 📃 T&Cs
1. Not For Sale!!!
2. Jangan lupa bintang di repo ini!
3. Jika ada masalah, buat issue di repo.

---
### Catatan singkat
- Proyek sekarang memakai ESM (`"type": "module"` di package.json). Jika Anda perlu CommonJS, beri tahu saya untuk revert.
- Pastikan menginstal dependensi: `npm install`
- Jika ada modul yang hilang untuk fitur tertentu (scraper, screenshot), tambahkan dependency yang diperlukan.

---
## Contoh konfigurasi di index.js
(Anda masih bisa mengatur nama API, logo, dsb — sama seperti sebelumnya)
```javascript
// index.js
const title = "EH PI AY DOANG";
const favicon = "https://raw.githubusercontent.com/upload-file-lab/fileupload7/main/uploads/1764494355026.jpeg?format=png&name=900x900";
const logo = "https://raw.githubusercontent.com/upload-file-lab/fileupload7/main/uploads/1770044887516.png";
const headertitle = "REST EH PI AY";
const headerdescription = "Kumpulan API Endpoint yang mungkin berguna.";
const footer = "© SHIKAKU IYAYN AJAH";
```

---
## Cara menambahkan fitur di folder `api`
Struktur logika handler API sedikit diadaptasi untuk Hono: setiap file ESM di `api/<kategori>/<file>.js` harus mem-export `default` handler function yang menerima `c` (Hono context). Contoh pola yang digunakan:

- Untuk endpoint yang mengembalikan JSON:
```javascript
// api/yourcat/example.js
export default async function handler(c) {
  const url = new URL(c.req.url);
  const text = url.searchParams.get('text');
  if (!text) return c.json({ error: "Missing 'text' parameter" }, 400);
  try {
    const data = { result: `Anda mengirim: ${text}` };
    return c.json(data);
  } catch (e) {
    return c.json({ error: e.message }, 500);
  }
}
```

- Untuk hasil berupa file/buffer (gambar, MP4, dsb):
```javascript
// api/yourcat/fileexample.js
import axios from 'axios';
export default async function handler(c) {
  const url = new URL(c.req.url).searchParams.get('url');
  if (!url) return c.json({ error: "Missing 'url' parameter" }, 400);
  try {
    const resp = await axios.get(url, { responseType: 'arraybuffer' });
    const buf = Buffer.from(resp.data);
    c.header('Content-Type', 'image/png');
    return c.body(buf, 200);
  } catch (e) {
    return c.json({ error: e.message }, 500);
  }
}
```

- Contoh konversi dari Express yang sudah tersedia di repo:
  - `api/ai/gemini.js` (menggunakan @google/genai)
  - `api/downloader/threads.js`
  - `api/downloader/videy.js`
  - `api/tools/ssweb-hp.js`
  - `api/tools/ssweb-pc.js`

Semua file yang di-convert mengekspor `default` handler sehingga index.js mendaftarkan route otomatis pada `/api/<kategori>/<file>`.

---
## Menjalankan lokal
1. Checkout branch yang sudah diubah: `git fetch && git checkout convert-to-hono`
2. Install dependencies: `npm install`
3. Jalankan server: `npm start`
4. Buka: `http://localhost:3000`

---
## Halaman 404
Saya menambahkan `404.html` di root. Hono akan menyajikan halaman ini untuk path yang tidak ditemukan.

---
## Menambahkan `linkbio.json`
Contoh format (file root `linkbio.json`):
```json
{
  "link_bio": [
    { "name": "Facebook", "url": "https://web.facebook.com/shikakuiyayn" },
    { "name": "GitHub", "url": "https://github.com/shikakuiyayn2477" }
  ]
}
```

---
## Deploy ke Vercel
Langkah dasar sama seperti sebelumnya: fork repo → buat project di Vercel → pastikan Node 18+ (ESM) → deploy. Jika Anda ingin fungsi edge atau konfigurasi khusus, beri tahu saya.

---
Kalau mau, saya bisa:
- Membuat PR terpisah untuk revert ke CommonJS jika Anda butuh, atau
- Menambahkan script dev (nodemon) atau workflow CI, atau
- Menjalankan pengecekan endpoint otomatis.

Beritahu apa yang Anda mau selanjutnya.