import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: {
    default: "FK Rajec",
    template: "%s | FK Rajec",
  },
  description: "Oficiálna stránka FK Rajec — futbalový klub z Rajca, Slovensko. 5. liga JUH skupina B.",
  keywords: ["FK Rajec", "futbal", "Rajec", "Slovensko", "futbalový klub"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
