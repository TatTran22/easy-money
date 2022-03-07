import { ChakraProvider } from '@chakra-ui/react'
import theme from '~/src/utils/theme'
import { AppProps } from 'next/app'
import { UserContextProvider } from '~/src/hooks/AuthUser'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </UserContextProvider>
  )
}

export default MyApp
