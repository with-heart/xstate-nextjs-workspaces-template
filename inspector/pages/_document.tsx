import Document, {Head, Html, Main, NextScript} from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head></Head>
        <body style={{margin: 0}}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
