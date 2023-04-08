import { useLayoutEffect, useEffect } from "react";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import gsap from "gsap";
import { useRouter } from 'next/router';

const NAV_ITEMS = gql`
 query {
   PageItems {
     items {
       name 
      } 
    } 
  }
`;

const AppHeader: React.FC = () => {
  const { loading, error, data } = useQuery(NAV_ITEMS);
  const router = useRouter();

  useEffect(() => {
    gsap.fromTo("[data-animation='header']", { top: -200 }, { top: 0, duration: 1.5 });
  }, []);

  if (error) return <p>Error, header data could not be fetched.</p>;

  return (
    <header data-animation="header" className="flex justify-between p-5 h-[60px] text-neutral-800 bg-transparent fixed z-50 w-screen">
      {loading && (<p />)}
      {data && (
        <>
          <Link href="/" className="font-semibold">STAVROS PERAKIS</Link><nav className="flex gap-3">
            {data?.PageItems.items.map((item: { name: string; __typename: string; }) => {
              if (item.name !== 'Home') {
                return (
                  <Link href={`/${item.name}`} key={item.name} className={`hover:text-yellow-700 ${router.pathname == `${item.name}` ? 'text-yellow-700' : 'text-slate-900'}`}>
                    {item.name}
                  </Link>
                );
              }
            })}
            <Link href='/store' key='store' className="hover:text-yellow-700">Store</Link>
          </nav>
        </>
      )}
    </header>
  );
};

export default AppHeader;