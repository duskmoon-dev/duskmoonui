import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DuskMoonUI Next.js Starter',
  description: 'A starter template for Next.js with DuskMoonUI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.Node;
}>) {
  return (
    <html lang="en" data-theme="sunshine">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
