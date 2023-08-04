import AppHeader from '@/components/AppHeader';
import "../styles/globals.css";
import Raleway from 'next/font/local';

const raleway = Raleway({
  src: '../../public/fonts/Raleway-VariableFont_wght.ttf',
  variable: '--main-font',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${raleway.variable}`}>
      <body>
        <AppHeader />
        <main className='grid min-h-[100dvh]'>{children}</main>
      </body>
    </html>
  );
};
