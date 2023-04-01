import Link from "next/link";
import { useQuery, gql } from "@apollo/client"

const TEST_QUERY = gql`
 query {
   PageItems {
     items {
       name 
      } 
    } 
  }
`;

const AppHeader: React.FC = () => {
  const { loading, error, data } = useQuery(TEST_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <header className="flex justify-between">
      <nav className="flex gap-2">
        {data.PageItems.items.map((item: { name: string, __typename: string}) => (
          <Link href={`/${item.name}`} key={item.name}>
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  )
};

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="">{children}</main>
    </div>
  );
}

export default Layout;
