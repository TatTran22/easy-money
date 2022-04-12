import { ChakraProvider } from '@chakra-ui/react'
import theme from '~/src/utils/theme'
import { UserContextProvider } from '~/src/hooks/AuthUser'
import type { NextComponentType, NextPageContext } from 'next'
import type { NextRouter } from 'next/router'

export interface AppRenderProps {
  pageProps: object
  err?: Error
  Component: NextComponentType<NextPageContext, AppRenderProps, object>
  router: NextRouter
}

export default function App({ Component, pageProps }: AppRenderProps) {
  return (
    <UserContextProvider>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </UserContextProvider>
  )
}
