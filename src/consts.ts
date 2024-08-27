// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Willin Wang (v0)' as const;
export const SITE_DESCRIPTION = 'To be Willin is to be Willing.' as const;
export const SITE_DOMAIN = 'https://v0.md' as const;

export const defaultLocale = 'zh' as const;
export const locales = {
  zh: 'zh-CN',
  en: 'en-US'
} as const;

export const languages = {
  zh: { name: '简体中文', flag: '🇨🇳', unicode: '1f1e8-1f1f3' },
  // 'zh-TW': { name: '正體中文', flag: '🇹🇼', unicode: '1f1f9-1f1fc' },
  en: { name: 'English', flag: '🇺🇸', unicode: '1f1fa-1f1f8' }
  // ko: { name: '한국어', flag: '🇰🇷', unicode: '1f1f0-1f1f7' },
  // ja: { name: '日本語', flag: '🇯🇵', unicode: '1f1ef-1f1f5' }
} as const;

export interface NavMenu {
  text: string;
  link: string;
  icon?: string;
  vueIcon?: unknown;
  subMenu?: NavMenu[];
}

export const navMenu: NavMenu[] = [
  {
    text: 'home',
    link: '/',
    icon: 'mingcute:home-3-line'
  },
  {
    text: 'post',
    link: '/posts/',
    icon: 'mingcute:quill-pen-line',
    subMenu: [
      {
        text: 'archives',
        link: '/archives/',
        icon: 'mingcute:timeline-line'
      }
    ]
  },
  {
    text: 'project',
    link: '/project/',
    icon: 'mingcute:file-code-line'
  },
  {
    text: 'about',
    link: '/about/',
    icon: 'mingcute:user-info-line'
  }
] as const;

export const primaryHue = 280;
