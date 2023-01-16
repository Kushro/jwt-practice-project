import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from "../components/shared/Header";
import AuthContextProvider from "../contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <AuthContextProvider>
        <Header></Header>
        <Component {...pageProps} />
      </AuthContextProvider>
  )
}
