import { Login, SignUp } from '~/src/components/Forms'
import type { NextPage } from 'next'
import { Divider, Flex, useColorModeValue } from '@chakra-ui/react'
import Layout from '~/src/components/Layout'

const Index: NextPage = () => {
  return (
    <Layout title="Authentication">
      <Flex
        bg={useColorModeValue('gray.100', 'gray.800')}
        justifyContent={'center'}
        flexDirection={{ base: 'column', lg: 'row' }}
      >
        <SignUp />
        <Divider orientation="vertical" />
        <Login />
      </Flex>
    </Layout>
  )
}

export default Index
