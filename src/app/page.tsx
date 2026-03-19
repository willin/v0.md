import { redirect } from 'next/navigation';
import { i18n } from '@/i18n/config';
import { headers } from 'next/headers';

export async function getPreferredLocale(): Promise<string> {
  // In Next.js App Router, we can access headers on the server
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language');
  if (acceptLanguage) {
    // Parse Accept-Language header
    // Format: "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
    const languages = acceptLanguage
      .split(',')
      .map(lang => {
        const [code, qValue] = lang.trim().split(';');
        const quality = qValue ? parseFloat(qValue.replace('q=', '')) : 1.0;
        return { code: code.toLowerCase(), quality };
      })
      .sort((a, b) => b.quality - a.quality);

    for (const { code } of languages) {
      // Check for exact match (e.g., 'zh-cn')
      const normalizedCode = code.toLowerCase();
      if (i18n.locales.includes(normalizedCode as any)) {
        return normalizedCode;
      }

      // Check for language code only (e.g., 'zh' from 'zh-cn')
      const langCode = code.split('-')[0];
      if (i18n.locales.includes(langCode as any)) {
        return langCode;
      }
    }
  }

  // Fall back to default locale
  return i18n.defaultLocale;
}

export default async function RootPage() {
  const locale = await getPreferredLocale();
  redirect(`/${locale}`);
}
