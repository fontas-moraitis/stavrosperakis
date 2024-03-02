import Raleway from 'next/font/local';
import "../styles/globals.css";
import AppHeader from '@/components/AppHeader';
import { Analytics } from '@vercel/analytics/react';

const raleway = Raleway({
  src: '../../public/fonts/Raleway-VariableFont_wght.ttf',
  variable: '--main-font',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${raleway.variable}`}>
      <body>
        <AppHeader />
        <main className='grid min-h-[100dvh]'>
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
};
