import { Frame } from "@/components/Frame";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head />
      <body className="h-screen w-screen">
        <Frame>{children}</Frame>
      </body>
    </html>
  );
}
