import React from 'react';
import { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }) {

  return (
    <main>
      <Component {...pageProps} />
    </main>
  );
}
