import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aqar1 - Find Your Perfect Home",
  description: "Discover and explore the best real estate options with Aqar1",
};

// ✅ Async function to fetch messages safely
export default async function RootLayout({ children, params }) {
  const locale = params?.locale || "en"; // Default locale fallback

  let messages;
  try {
    messages = await getMessages({ locale });
  } catch (error) {
    console.error(`Error loading messages for locale '${locale}':`, error);
    messages = {}; // Fallback to empty messages
  }

  return (
    <html lang={locale}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
