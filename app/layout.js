import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Roboto_Slab } from "next/font/google";
import StoreProvider from "./store/storeProvider";

const playfair = Roboto_Slab({ subsets: ["latin"], weight: ["400", "700"] });

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

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body className={`container ${playfair.className}`} style={{ width: "90%", margin: "auto" }}>
          {children}
        </body>
      </html>
  );
}
