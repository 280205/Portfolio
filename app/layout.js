import { Bodoni_Moda, Inter, JetBrains_Mono } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
  adjustFontFallback: false,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Nitin Pandey — Software Engineer",
  description:
    "Portfolio of Nitin Pandey — Software Engineer building intelligent applications, scalable web experiences, and high-performance products.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bodoniModa.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-ink text-text antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
