import AppHeader from '@/components/AppHeader';

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <AppHeader />
      <main className="">{children}</main>
    </div>
  );
}

export default Layout;
