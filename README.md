# 香港車頭相及遺照修復服務 — 網站原始檔案

## 🔧 2026-09-08 第二次更新：真正解決 Mobile Performance 樽頸

**背景**：第一次優化（將圖片改做獨立檔案）之後，PageSpeed Insights 實測 Mobile 分數完全冇改善（LCP 依然 15.7 秒）。經深入診斷，搵到真正原因：

> **`<canvas>` 元素喺 LCP 嘅計算入面完全唔計**（呢個係 W3C 官方規格同 MDN 文件明文寫明）。即係話 hero 動畫用 canvas 畫出嚟，Google 嘅測速工具根本唔會將佢視為「主要內容」。真正拖慢個網站嘅，係頭部載緊嘅 **Google Fonts CSS**——瀏覽器預設會停晒所有畫面渲染，等呢個字體檔案攞完先開始顯示任何嘢，喺慢網環境下呢個延遲會被放大成好幾秒。

**修復方法**：將 Google Fonts 改用「非阻擋式載入」（`media="print"` + `onload` 換頁技巧，業界標準做法）——文字會即刻用系統後備字體顯示（`PingFang HK` / `Microsoft JhengHei`），字體檔案喺背景載緊，載完先無縫換返做 Noto Sans HK，唔會再阻住個網站顯示。已經測試過：就算個字體請求完全失敗，個網站都會即刻顯示晒晒內容，唔會卡住。

**⚠️ 呢次改動因為技術限制，我冇辦法喺你個真實 domain 度直接測試（我嘅執行環境連唔到 fonts.googleapis.com 呢個網域），所以請你部署完之後，**麻煩去 [pagespeed.web.dev](https://pagespeed.web.dev) 打 `https://www.funeralphoto.com.hk/` 重新測一次，將結果話返我知，等我確認呢次係咪真正解決咗問題。**

## 🎨 2026-09-08 品牌 Logo + Favicon
- 全新品牌標記：相框四角（取景器概念，呼應 digital-only 業務性質）+ 中央光芒（承接 hero 動畫嘅光芒意象）
- 已更新網站導覽列同 footer 嘅 logo
- 完整 favicon 套裝：`favicon.ico`（16/32/48 多尺寸）、`favicon-16x16.png`、`favicon-32x32.png`、`apple-touch-icon.png`（iOS 主畫面圖示）、`android-chrome-192x192.png` / `512x512.png`（Android／PWA 用）
- 新增 `site.webmanifest`，等用家可以將網站「加到主畫面」時有正確嘅圖示同名稱

## ⚡ 2026-09-08 第一次效能優化（圖片獨立檔案化）
- 圖片全部改為獨立檔案（`index.html` 由 3.7MB 減到 68KB）
- Hero 動畫改用漸進式載入：第一張影格優先載入並即刻顯示，其餘 79 張喺背景載入，唔再阻住畫面
- Before/After 對比相、長者/寵物示範相加咗 `loading="lazy"`
- Schema 加咗 `url` 欄位，明確指返個網站地址

## 檔案結構
```
funeralphoto/
├── index.html                ← 主頁面
├── favicon.ico                ← 根目錄備用（部分瀏覽器/爬蟲直接讀呢個路徑）
├── site.webmanifest           ← PWA / 加到主畫面設定
├── sitemap.xml                ← 已提交 Search Console
├── robots.txt                  ← 已上傳網頁伺服器
└── assets/
    ├── favicon/                ← 完整 favicon 套裝
    ├── frames/                 ← Hero 區滾動動畫用嘅 80 張影格
    ├── before.jpg / after.jpg
    ├── elder.jpg / pets.jpg / usb.jpg
```

## 上傳去 Vercel 步驟

1. 開返你 Vercel project（`funeralphoto`）
2. 用返你之前部署嘅方法（拖檔案 / git push），將呢個資料夾入面**所有檔案**覆蓋上去
3. 部署完成後：
   - Hard refresh 或者用無痕視窗開 `https://www.funeralphoto.com.hk/`，確認個網站顯示正常
   - 去 [pagespeed.web.dev](https://pagespeed.web.dev) 打個網址測 Mobile 分數，將結果話返我知




全部 86 個檔案，總大小約 2.9MB。呢個版本嘅圖片係獨立檔案（唔係一個好巨型嘅 HTML），方便日後單獨更換某張相，亦令 GitHub repo 睇落更清晰。

## 上傳去 GitHub 步驟

1. 開 `https://github.com/lokwah/funeralphoto`
2. 撳 **Add file → Upload files**
3. 將呢個 `funeralphoto` 資料夾入面嘅所有內容（`index.html` 同埋成個 `assets` 資料夾）一齊拖入去個上傳區
   - GitHub 網頁上傳支援直接拖資料夾，會保留原有目錄結構
   - 如果拖資料夾唔work，可以將個資料夾用 zip 壓縮，用 `git` 指令上傳（見下）
4. 落 commit message（例如 "Deploy website"），撳 **Commit changes**
5. 去 repo 嘅 **Settings → Pages**
   - Source 揀 **Deploy from a branch**
   - Branch 揀 `main`，資料夾揀 `/ (root)`
   - 撳 **Save**
6. 等幾分鐘，網站會喺 `https://lokwah.github.io/funeralphoto/` 出現

## 或者用 git 指令（如果你熟終端機）

```bash
git clone https://github.com/lokwah/funeralphoto.git
cd funeralphoto
# 將 index.html 同 assets/ 資料夾複製入嚟呢個目錄
git add .
git commit -m "Deploy website"
git push
```

## 注意事項

- 網站用咗 Google Fonts（Noto Sans HK + Roboto），需要用家瀏覽器有網絡連線先可以正常顯示字體，GitHub Pages 本身冇呢個限制
- 所有連結（WhatsApp、Google 表單）已經寫死喺 `index.html` 入面，如需更改可以直接搜尋對應網址修改
- 如想改圖，直接更換 `assets/` 入面對應檔案（保持檔名一致），唔使改 `index.html`
