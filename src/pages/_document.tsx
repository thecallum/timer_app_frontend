import { inter } from '@/components/layout/fonts'
import classNames from 'classnames'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={classNames(['bg-slate-50 box-border', inter.className])}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
