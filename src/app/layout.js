import { Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/header';
import Footer from '../components/footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'SEO Agency – Boost Your Rankings',
  description: 'The #1 agency for SEO, AEO & GEO.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} antialiased h-full bg-white`} suppressHydrationWarning>
        <div className="flex flex-col min-h-full">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}