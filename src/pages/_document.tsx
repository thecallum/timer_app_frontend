import { inter } from '@/components/layout/fonts'
import classNames from 'classnames'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head></Head>
      <body className={classNames([inter.className, 'bg-slate-50 box-border'])}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
