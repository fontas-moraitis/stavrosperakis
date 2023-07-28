'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: 'Workshops', value: 'workshops' },
  { label: 'Collection', value: 'collection' },
  { label: 'About', value: 'about' },
  { label: 'Store', value: 'store' },
]

const AppHeader: React.FC = () => {
  const pathname = usePathname();

  return (
    <header
      className={`flex flex-col items-center justify-center gap-4 md:gap-0 md:flex-row md:justify-between md:px-6 py-4 ${pathname === '/' ? 'text-neutral-50' : 'text-neutral-800 backdrop-blur'} bg-transparent fixed top-0 left-0 z-50 w-screen overflow-hidden`}
    >
      <Link href="/" className="animate-[slideDown_1.5s_ease-in-out] font-medium text-lg tracking-widest p-1 rounded-md whitespace-nowrap">STAVROS PERAKIS</Link>
      <nav className="animate-[slideDown_2s_ease-in-out] flex gap-8 overflow-x-scroll no-scrollbar text-center">
        {
          NAV_ITEMS.map((item: { label: string; value: string; }) => (
            <Link
              href={`/${item.value}`}
              key={item.value}
              className={`h-8 transition-colors duration-300 ease-in-out p-1 rounded-md font-normal focus:text-amber-700 hover:text-amber-400 ${pathname == '/' + item.value ? 'text-amber-700' : ''}`}
            >
              {item.label === 'Store' ? 'Cart' : item.label}
            </Link>
          ))
        }
      </nav>
    </header >
  )
};

export default AppHeader;