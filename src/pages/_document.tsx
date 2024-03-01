import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin={''}
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Nova+Square&family=Orbitron&display=swap"
            rel="stylesheet"
          />
        </>
      </Head>
      <body className="bg-slate-50 box-border">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
