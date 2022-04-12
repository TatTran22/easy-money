import { SignUp } from '~/src/components/Forms'
import { Stack, Heading, Text, Flex, useColorModeValue } from '@chakra-ui/react'
import Layout from '~/src/components/Layout'
import { Chakra } from '~/Chakra'

interface PropertiesProps {
  cookies?: string
}

const Auth = ({ cookies }: PropertiesProps) => (
  <Chakra cookies={cookies}>
    <Layout title="Sign Up">
      <Flex
        bg={useColorModeValue('gray.100', 'gray.800')}
        justifyContent={'space-around'}
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <Stack align={'center'} justifyContent={'center'} minW={'180px'}>
          <Heading fontSize={'4xl'} textAlign={'center'} color={useColorModeValue('gray.800', 'gray.200')}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={useColorModeValue('gray.600', 'gray.200')} textAlign={'center'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <SignUp />
      </Flex>
    </Layout>
  </Chakra>
)

export default Auth
export { getServerSideProps } from '~/Chakra'
