# funeralphoto.com.hk — 給 Claude 嘅工作說明

香港車頭相及遺照修復服務網站（MySkyblue Production）。Owner：Eddy。
回覆用繁體中文 + 香港口語，直接講；唔清楚就先問 Eddy。Eddy 講「開工」先開始做改動。

## 技術
- Astro 5 靜態網站（`npm run build` → `dist/`）
- Hosting 計劃：由 Vercel 搬去 Cloudflare（Vercel Hobby 唔啱商業用途）
  - 先喺 Cloudflare 預覽網址做 UAT，Eddy 滿意先搬 domain
  - Domain 繼續喺 hostingspeed.net 註冊；搬時 nameserver 改做 Cloudflare
  - 搬時要確保 Cloudflare 冇封鎖 AI 爬蟲（GEO 需要）
  - 暫時唔開 email；舊 cPanel DNS 記錄（cpanel/webmail/whm/webdisk/cpcontacts/cpcalendars）搬時清走
- 安全標頭：Cloudflare 用 `public/_headers`；Vercel（過渡期）用 `vercel.json`。兩邊 CSP 要一致
- Google tag：GTM-K87JX333，Google 官方「Install manually」snippet，放喺 `src/layouts/Base.astro` `<head>` 最前，唔好改
- 工作流程：開分支 → push → 預覽網址俾 Eddy 睇 → Eddy 確認先 merge main

## 結構
- `src/data/site.ts`：聯絡、表單連結、價錢、選單（改價錢只改呢度）
- `src/data/faq.ts`：FAQ，按 7 類分組（收費付款、服務範圍、準備相片、製作要求、雙人合葬、時間流程、售後）
- `src/data/rules.ts`：14 條服務規則
- `src/content/guide/*.md`：實用指南文章；`draft: true` = noindex + 唔入 sitemap
- `src/pages/`：首頁、services/{portrait,double,other}、guide、faq、about、order、rules、llms.txt
- 頁面入面 `.todo` 方框 = 待補內容，上線前要清晒

## 設計規則
- 保留原有黑金配色（唔用 Huly／紫色系）；借用 Abetterlou 規則：
  金色只用喺按鈕同重點、按鈕膠囊形、卡片 6–12px 圓角、細線唔用陰影、固定字級
- 字體：思源黑體 HK（Noto Sans HK）400/500/700，正文 16–18px（客人多數係年長家屬）
- FAQ 用深色底
- 唔好出現「報價」；「一口價，不另收費」寫法維持
- 只提供電子檔，唔做打印／相框／瓷相／石碑製作
- 用字：客人講「執相」「靈堂相」「合碑」「瓷相」「車頭相」
- 雙人合葬：男左女右 = 面向墓碑時男右女左

## 內容原則（hk-website-build）
- 每段第一句就答問題；寫客人真正會問嘅問題
- 改內容先改更新日期（`updated`），唔好淨改日期
- AI 寫嘅內容要人手把關
- 案例相要客人同意兼去識別
