import { Anek_Bangla, Tiro_Bangla } from "next/font/google";
import localFont from "next/font/local";
import { SettingsProvider } from "@/lib/SettingsContext";
import { ThemeProvider } from "@/lib/ThemeProvider";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

import "./globals.css";

export const metadata = {
  title: "কেন্দ্রবাংলা | একটি পরিপূর্ণ বাংলা ওয়েব ম্যাগাজিন",
  description:
    "শিক্ষা, বিজ্ঞান, প্রযুক্তিসহ বিভিন্ন বিষয় নিয়ে সঠিক তথ্য সমৃদ্ধ সহজবোধ্য ফিচার পড়ুন কেন্দ্রবাংলায়।",
};

const anekBangla = Anek_Bangla({
  subsets: ["bengali"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  variable: "--font-anek-bangla",
});

const tiroBangla = Tiro_Bangla({
  subsets: ["bengali"],
  weight: "400",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  variable: "--font-tiro-bangla",
});

// July Font - Local Bangla Font (Default)
const julyFont = localFont({
  src: [
    {
      path: "../assets/fonts/July-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/July-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../assets/fonts/July-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/July-Bold-Italic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  variable: "--font-july",
});

// Inline script to apply font from localStorage BEFORE React hydrates
// This prevents Flash of Unstyled Content (FOUC)
const fontLoaderScript = `
(function() {
  try {
    var saved = localStorage.getItem('siteSettings');
    if (saved) {
      var settings = JSON.parse(saved);
      var font = settings.fontFamily || 'july';
      var activeFont;
      switch(font) {
        case 'tiro-bangla':
          activeFont = 'var(--font-tiro-bangla), "Tiro Bangla", Georgia, serif';
          break;
        case 'anek-bangla':
          activeFont = 'var(--font-anek-bangla), "Anek Bangla", system-ui, sans-serif';
          break;
        case 'july':
        default:
          activeFont = 'var(--font-july), "July", system-ui, sans-serif';
          break;
      }
      document.documentElement.style.setProperty('--active-font', activeFont);
      document.documentElement.setAttribute('data-font', font);
    }
  } catch(e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      className={`${julyFont.variable} ${anekBangla.variable} ${tiroBangla.variable}`}
      suppressHydrationWarning={true}
    >
      <head>
        {/* Blocking script - runs before page renders */}
        <script dangerouslySetInnerHTML={{ __html: fontLoaderScript }} />
      </head>
      <body suppressHydrationWarning={true}>
        {/* Global Aurora Background */}
        <div
          className="fixed inset-0 z-[-1] pointer-events-none transition-all duration-1000 ease-in-out"
          style={{ background: "var(--aurora-gradient)" }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SettingsProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1 pt-20">{children}</main>
              <Footer />
            </div>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
