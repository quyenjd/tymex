import { Fragment } from 'react'

import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'

import { cache } from '@emotion/css'
import createEmotionServer from '@emotion/server/create-instance'

const renderStatic = async (html: string) => {
  if (html === undefined) {
    throw new Error('Did you forget to return html from renderToString?')
  }
  const { extractCritical } = createEmotionServer(cache)
  const { ids, css } = extractCritical(html)

  return { html, ids, css }
}

export default class AppDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const page = await ctx.renderPage()
    const { css, ids } = await renderStatic(page.html)
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: (
        <Fragment>
          {initialProps.styles}
          <style data-emotion={`css ${ids.join(' ')}`} dangerouslySetInnerHTML={{ __html: css }} />
        </Fragment>
      ),
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="min-w-[320px]">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
