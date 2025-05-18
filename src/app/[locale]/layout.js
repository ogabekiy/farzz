
import "./globals.css";
import { getMessages } from "next-intl/server";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export default async function RootLayout({ children, params }) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
      <div locale={locale}>
        <NextIntlClientProvider messages={messages}>
          {/* navbar or home */}
       
          {children}
        </NextIntlClientProvider>
      </div>
  );
}

