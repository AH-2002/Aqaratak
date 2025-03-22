import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Roboto_Slab } from "next/font/google";
import { ProfileProvider } from "./context/profileContext";

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
  title: "Aqaratak",
  description: "Discover and explore the best real estate options with Aqar1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`container ${playfair.className}`} style={{ width: "90%", margin: "auto" }}>
        <ProfileProvider>
          {children}
        </ProfileProvider>
      </body>
    </html>
  );
}
