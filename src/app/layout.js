import { Montserrat } from "next/font/google";
import Script from "next/script";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata = {
  title: "Недвижимость в Турции | FARZZ GROUP - Купить квартиру в Стамбуле",
  description:
    "FARZZ GROUP — Надёжный партнёр для покупки недвижимости в Турции. Помощь в оформлении ВНЖ и гражданства. Рассрочка, готовые и инвестиционные объекты в Стамбуле и других городах. Говорим на вашем языке.",
  keywords: [
    "недвижимость в Турции",
    "купить квартиру в Стамбуле",
    "жилье в Турции",
    "инвестиции в Турции",
    "ВНЖ в Турции",
    "гражданство Турции",
    "недвижимость Стамбул",
    "рассрочка на квартиру",
    "русскоязычный риелтор Турция",
    "купить жилье в Турции",
    "FARRZ GROUP",
    "farzz group",
    "farz group",
    "farzzgroup",
    "Turkiyada ko‘chmas mulk",
    "Turkiyadan uy olish",
    "Istanbuldan kvartira olish",
    "Turkiyada kvartira narxlari",
    "Turkiyada yashash uchun uy",
    "Turkiyada VNZ olish",
    "Turkiyadan kvartira sotib olish",
    "Turkiyada investitsiya qilish",
    "Turkiyada uy olish shartlari",
    "Turkiyada ko‘chmas mulk agentligi",
  ],
  authors: [{ name: "FARZZ GROUP", url: "https://farzzgroup.com" }],
  creator: "FARZZ GROUP",
  publisher: "FARZZ GROUP",
  openGraph: {
    title: "Недвижимость в Турции | FARZZ GROUP",
    description:
      "Купить квартиру в Турции с FARZZ GROUP. Оформление ВНЖ, гражданства, рассрочка. Лучшие объекты в Стамбуле и по всей Турции. Полное сопровождение.",
    url: "https://farzzgroup.com",
    siteName: "FARZZ GROUP",
    images: [
      {
        url: "/hero.jpeg",
        width: 1200,
        height: 630,
        alt: "FARZZ GROUP - Недвижимость в Турции",
      },
    ],
    locale: "ru",
    type: "website",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1350839289344019');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body className={`${montserrat.variable} antialiased`}>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1350839289344019&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
