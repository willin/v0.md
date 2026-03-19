import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { getCurrentLocale, getDictionary } from "@/i18n/config";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!["en", "zh"].includes(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale as any);

  return {
    title: dictionary.home.title,
    description: dictionary.home.subtitle,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!["en", "zh"].includes(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale as any);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          {children}
          <Footer locale={locale as 'zh' | 'en'} />
        </ThemeProvider>
      </body>
    </html>
  );
}