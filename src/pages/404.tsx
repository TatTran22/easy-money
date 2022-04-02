import type { NextPage } from 'next'
import NextLink from 'next/link'
import { Button, VStack, Heading, Text, Divider } from '@chakra-ui/react'
import Layout from '~/src/components/Layout'

const NotFoundPage: NextPage = () => {
  return (
    <Layout title="404">
      <VStack spacing={2} justify="center" h="100vh">
        <Heading>404 Not found</Heading>
        <Divider />
        <Text>The page you're looking for was not found.</Text>
        <NextLink href="/" passHref>
          <Button colorScheme="green" size="md">
            Return to home
          </Button>
        </NextLink>
      </VStack>
    </Layout>
  )
}

export default NotFoundPage
