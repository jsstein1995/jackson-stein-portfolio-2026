import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { Nav } from "@/components/nav";
import { Footer, PageBottomNote } from "@/components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Name — Product Designer",
  description: "Senior product designer crafting thoughtful digital experiences.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const isPasswordPage = pathname.startsWith("/password");

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        {!isPasswordPage && <Nav />}
        <main>{children}</main>
        {!isPasswordPage && (
          <>
            <PageBottomNote />
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
