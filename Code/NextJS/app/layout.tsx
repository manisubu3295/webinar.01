import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AAMEC Billing — Next.js",
  description: "AAMEC Billing System demo — Next.js frontend calling an external backend",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
