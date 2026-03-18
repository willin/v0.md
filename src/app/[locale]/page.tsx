import { getDictionary } from "@/i18n/config";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProfileSection from "@/components/profile/ProfileSection";
import DigitalTwinChat from "@/components/chat/DigitalTwinChat";
import ThemeToggle from "@/components/ThemeToggle";
import LocaleToggle from "@/components/LocaleToggle";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "zh" }];
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!["en", "zh"].includes(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale as any);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gray-50 dark:bg-gray-900">
      <header className="row-start-1 w-full max-w-4xl flex justify-end gap-2">
        <ThemeToggle dictionary={dictionary} />
        <LocaleToggle currentLocale={locale} dictionary={dictionary} />
      </header>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        <ProfileSection dictionary={dictionary} />

        {/* Blog Link */}
        <div className="w-full max-w-4xl mx-auto mb-12">
          <Link
            href={`/${locale}/blog`}
            className="block w-full p-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl text-white text-center font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{ viewTransitionName: 'blog-link' }}
          >
            {locale === 'zh' ? '📝 访问我的博客' : '📝 Visit My Blog'}
          </Link>
        </div>

        <DigitalTwinChat dictionary={dictionary} locale={locale} />
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center w-full">
        <p className="text-center text-sm text-gray-700 dark:text-gray-300">
          © {new Date().getFullYear()} Willin Wang. {locale === 'zh' ? '保留所有权利' : 'All rights reserved.'}
        </p>
      </footer>
    </div>
  );
}
