import '../styles/globals.css'
import { ThemeProvider } from "gearsui"
import defaultTheme from "gearsui/themes/default.json"
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp
