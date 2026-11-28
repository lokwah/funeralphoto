// llms.txt：俾 AI 讀嘅網站簡介同頁面清單
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, PRICES } from '../data/site';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('guide')).filter((p) => !p.data.draft).sort((a, b) => a.data.order - b.data.order);
  const u = (p: string) => `${SITE.url}${p}`;
  const body = `# ${SITE.name}

> 香港車頭相、靈堂相、先人相、石碑相、瓷相及寵物遺照數碼修復服務，由 ${SITE.company} 營運。一口價 HK$${PRICES.single}／張（一人），雙人合葬瓷相 HK$${PRICES.double}，包最多 3 次修改，交付 2250×3000（3:4）高清 JPG 電子檔。只提供電子檔，不設實體沖印、相框或石碑製作。

聯絡：WhatsApp ${SITE.phoneDisplay}；Email ${SITE.email}

## 服務
- [車頭相・靈堂相・先人相修復](${u('/services/portrait/')})：HK$${PRICES.single}／一人一張
- [雙人合葬・瓷相](${u('/services/double/')})：HK$${PRICES.double}；男左女右排位（面向墓碑時男右女左）
- [其他服務](${u('/services/other/')})：上門長者肖像拍攝 HK$${PRICES.elder}、寵物遺照 HK$${PRICES.pet}、USB-C 隨身碟 HK$${PRICES.usb}、悼念冊設計

## 資料
- [常見問題](${u('/faq/')})
- [相片修復服務規則](${u('/rules/')})
- [點樣訂購](${u('/order/')})
- [關於我哋](${u('/about/')})
${posts.length ? `\n## 實用指南\n${posts.map((p) => `- [${p.data.title}](${u(`/guide/${p.id}/`)})：${p.data.description}`).join('\n')}\n` : ''}`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
