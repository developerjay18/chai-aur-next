import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Music Website',
  description:
    'Music Website created as a project while learning chai-aur-code NextJS series',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="flex justify-center items-center relative w-full">
          <Navbar />
        </div>
        {children}
      </body>
    </html>
  );
}
