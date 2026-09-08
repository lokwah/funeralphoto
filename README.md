# 香港車頭相及遺照修復服務 — 網站原始檔案

## 🎯 2026-09-08 第三次更新：搵到並修正真正嘅樽頸（有 Google 官方診斷數據支持）

**你幫手做嘅一步好關鍵**：撳開咗 PageSpeed Insights 個「Diagnose performance issues」詳細診斷，入面搵到一個 **Forced reflow**（強制版面重排）警告，仲列明咗確實嘅程式碼行數：

> `updateSideCard()` 函數入面嘅 `heroWrap.getBoundingClientRect()`（第 918 行）單一項就用咗 **823 毫秒**嘅強制同步重排時間。呢個函數喺頁面一載入就即刻執行一次（喺任何畫面內容顯示之前），逼瀏覽器要即刻計算成個 440vh 高（hero 滾動動畫區域）嘅版面。喺平價手機 4倍 CPU 減速嘅情況下，呢個計算變得極慢，直接攔住咗成個網站嘅顯示。

**修復方法**：
- 將 `updateSideCard`（側邊浮動卡片顯示邏輯）由「監聽 scroll 事件 + 每次都攞元素座標」改用 **IntersectionObserver**——呢個係現代瀏覽器 API，唔會強制觸發同步版面重排，效能好好多
- 移除咗頁面載入時「即刻同步執行」嘅版面計算，改為喺瀏覽器下一個影格先執行（`requestAnimationFrame`），唔會阻住第一次畫面顯示
- 埋一齊將另外兩個 scroll 監聽器（hero 動畫、修復流程進度）都加咗 `requestAnimationFrame` 節流，防止同類問題

**本機模擬測試**（Slow 4G + 4倍 CPU 減速，同 PageSpeed 用嘅環境接近）：修復前 first-paint 1700ms，修復後跌到 **464ms**。

**⚠️ 呢次修復係根據 Google 官方工具嘅具體診斷數據（有確實行數、有確實毫秒數）針對性修復，唔再係憑經驗猜測，所以有較高信心呢次會有實質改善。** 但因為技術限制（我嘅執行環境連唔到你個 domain），最終結果都係需要你部署後用返 PageSpeed Insights confirm 先算數。

## 🔧 2026-09-08 第二次更新：非阻擋式字體載入
將 Google Fonts 改用「非阻擋式載入」（`media="print"` + `onload` 換頁技巧）。文字會即刻用系統後備字體顯示，字體檔案背景載入完成先無縫換返做 Noto Sans HK。

## 🎨 2026-09-08 品牌 Logo + Favicon
- 全新品牌標記：相框四角（取景器概念）+ 中央光芒（呼應 hero 動畫）
- 完整 favicon 套裝 + `site.webmanifest`

## ⚡ 2026-09-08 第一次效能優化（圖片獨立檔案化）
- 圖片全部改為獨立檔案（`index.html` 由 3.7MB 減到 68KB）
- Hero 動畫改用漸進式載入，Before/After 對比相、示範相加咗 `loading="lazy"`
- Schema 加咗 `url` 欄位

## 檔案結構
```
funeralphoto/
├── index.html
├── favicon.ico
├── site.webmanifest
├── sitemap.xml
├── robots.txt
└── assets/
    ├── favicon/
    ├── frames/
    ├── before.jpg / after.jpg
    ├── elder.jpg / pets.jpg / usb.jpg
```

## 上傳去 Vercel 步驟

1. 開返你 Vercel project（`funeralphoto`）
2. 將呢個資料夾入面**所有檔案**覆蓋上去
3. 部署完成後：
   - 用無痕視窗確認網站正常顯示
   - 去 [pagespeed.web.dev](https://pagespeed.web.dev) 打個網址測 Mobile 分數
   - **如果撳開「Diagnose performance issues」仲有其他紅色／橙色項目，可以截圖畀我，我哋針對住嗰啲具體項目繼續改**





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
