import type { Metadata } from "next";
import "./globals.css"; // 🔥 YE LINE SABSE ZAROORI HAI TA KI TAILWIND LOAD HO

export const metadata: Metadata = {
  title: "AgentFlow Control Plane UI",
  description: "Enterprise-grade AI agent orchestration network dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950 text-slate-100" suppressHydrationWarning>
  {children}
</body>
    </html>
  );
}