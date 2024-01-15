import { Html, Head, Main, NextScript } from 'next/document'

const DEFAULT_TITLE = 'Time Tracker App'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>{DEFAULT_TITLE}</title>
      </Head>
      <body className="bg-slate-50 box-border">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
