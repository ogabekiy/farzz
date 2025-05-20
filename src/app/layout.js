import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata = {
  title: "FARZZ GROUP",
  description: " Недвижимость в Турции Помогаем гражданам стран Центральной Азии приобрести жильё в Стамбуле и по всей Турции.Оформление ВНЖ и гражданства под ключ.Рассрочка, готовые и инвестиционные объекты.Надёжно. Прозрачно. На вашем языке.",
  icons: {
    icon: "/logo.png",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>{children}</body>
    </html>
  )
}
