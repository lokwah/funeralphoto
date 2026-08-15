# 香港車頭相及遺照修復服務 — 網站原始檔案

## 檔案結構
```
funeralphoto/
├── index.html              ← 主頁面（GitHub Pages 會自動讀取呢個做首頁）
└── assets/
    ├── frames/              ← Hero 區滾動動畫用嘅 80 張影格
    │   ├── frame-001.jpg
    │   ├── frame-002.jpg
    │   └── ... (共 80 張)
    ├── before.jpg           ← 修復前對比圖
    ├── after.jpg            ← 修復後對比圖
    ├── elder.jpg            ← 上門長者肖像拍攝示範相
    ├── pets.jpg              ← 寵物遺照示範相
    └── usb.jpg               ← USB 隨身碟產品相
```

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
