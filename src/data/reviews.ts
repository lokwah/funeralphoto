// 客人評價：只用真實 Google 評價原文（唔好改字、唔好自己作）
// 唔加評價 schema：Google 唔會為商家自己網站放嘅評價顯示星星

export const GOOGLE_PROFILE_URL = 'https://share.google/I6xoCrtF8vp2vv8gt';

export const REVIEWS: { name: string; stars: number; text: string; when: string }[] = [
  { name: 'Wong S.', stars: 5, text: '真係一口價，冇再另外收錢。修復速度都算快，一路都有進度跟進，好快交貨', when: '2026 年 9 月' },
  { name: 'Chow C.', stars: 5, text: '我地石碑相要求尺寸幾特別，佢哋係WhatsApp 有問清楚尺寸有無需要改變，冇整完先話唔啱用，慳返好多手尾。', when: '2026 年 9 月' },
  { name: 'Jimmy L.', stars: 5, text: '修飾相效果理想，服務態度好', when: '2026 年 10 月' },
];
