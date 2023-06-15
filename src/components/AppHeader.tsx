'use client';

import { useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: 'Workshops', value: 'Workshops' },
  { label: 'Collection', value: 'Collection' },
  { label: 'About', value: 'About' },
  { label: 'Store', value: 'Store' },
]

const AppHeader: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    gsap.fromTo("[data-animation='header']", { top: -80, opacity: 0 }, { top: 0, opacity: 1, duration: 1.6, immediateRender: true });
  }, []);

  return (
    <header
      data-animation="header"
      className={`text-lg text-center px-5 py-5 sm:flex sm:gap-0 justify-between sm:px-9 h-[80px] ${pathname === '/' ? 'text-neutral-50' : 'text-neutral-800'} bg-transparent fixed z-50 w-screen`}
    >
      {(
        <>
          <Link href="/" className="font-semibold">STAVROS PERAKIS</Link>
          <nav className="flex justify-between gap-4 mt-4 sm:mt-0 overflow-x-scroll no-scrollbar">
            {
              NAV_ITEMS.map((item: { label: string; value: string; }) => {
                return (
                  <Link
                    href={`/${item.value}`}
                    key={item.value}
                    className={`transition-colors duration-300 ease-in-out hover:text-yellow-700 ${pathname == '/' + item.value ? 'text-yellow-700' : ''}`}
                  >
                    {item.label}
                  </Link>
                );
              })
            }
          </nav>
        </>
      )
      }
    </header >
  );
};

export default AppHeader;