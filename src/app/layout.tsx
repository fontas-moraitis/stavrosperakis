import AppHeader from '@/components/AppHeader';
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppHeader />
        <main>{children}</main>
      </body>
    </html>
  );
};
