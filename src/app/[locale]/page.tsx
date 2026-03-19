import { getDictionary } from "@/i18n/config";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProfileSection from "@/components/profile/ProfileSection";
import DigitalTwinChat from "@/components/chat/DigitalTwinChat";
import { HeaderNav } from "@/components/blog/HeaderNav";

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
    <>
      <HeaderNav locale={locale as any} dictionary={dictionary as any} />
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gray-50 dark:bg-gray-900">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
          <ProfileSection dictionary={dictionary} />

          {/* Blog Link */}
          <div className="w-full max-w-4xl mx-auto mb-12">
            <Link
              href={`/${locale}/blog`}
              className="block w-full p-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl text-white text-center font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{ viewTransitionName: 'blog-link' }}
            >
              {(dictionary as any).blogLink.text}
            </Link>
          </div>

          <DigitalTwinChat dictionary={dictionary} locale={locale} />
        </main>

        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center w-full">
          <p className="text-center text-sm text-gray-700 dark:text-gray-300">
            © {new Date().getFullYear()} Willin Wang. {(dictionary as any).footer.rightsReserved}
          </p>
        </footer>
        </div>
      </>
  );
}
