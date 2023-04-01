import { ApolloProvider } from "@apollo/react-hooks";
import type { AppProps } from 'next/app'
import client from "@/lib/storyblok";
import Layout from '../components/Layout'

import "../styles/globals.css";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
