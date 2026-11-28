// 全站共用資料：改呢度，全站一齊更新

export const SITE = {
  name: '香港車頭相及遺照修復服務',
  company: 'MySkyblue Production',
  url: 'https://www.funeralphoto.com.hk',
  phone: '+85297854872',
  phoneDisplay: '+852 9785 4872',
  email: 'info@myskyblue.com',
  formUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSf457xOfiPYH9YBGjIJ4xzu6OHuA3pLVe3rDS6pabatgHRIsQ/viewform?usp=headerapp',
  ogImage: '/assets/og-image.jpg',
  // 全站預設更新日期；個別頁面可以自己傳 updated 覆蓋
  updated: '2026-11-28',
};

export const wa = (text = 'Hi') => `https://wa.me/85297854872?text=${encodeURIComponent(text)}`;

export const PRICES = {
  single: 300,
  double: 600,
  elder: 1000,
  pet: 300,
  usb: 330,
  extraRevision: 150,
};

export const NAV = [
  {
    label: '服務',
    href: '/services/portrait/',
    children: [
      { label: '車頭相・靈堂相', href: '/services/portrait/' },
      { label: '雙人合葬・瓷相', href: '/services/double/' },
      { label: '其他服務', href: '/services/other/' },
    ],
  },
  { label: '實用指南', href: '/guide/' },
  { label: '常見問題', href: '/faq/' },
  { label: '關於我哋', href: '/about/' },
];
