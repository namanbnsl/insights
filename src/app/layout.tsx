import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "insights",
  description: "Smart Education App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(font.className, "flex flex-col min-h-screen")}>
        <div>{children}</div>
      </body>
    </html>
  );
}
