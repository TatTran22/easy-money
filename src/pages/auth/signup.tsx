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
      <SignUp />
    </Layout>
  </Chakra>
)

export default Auth
export { getServerSideProps } from '~/Chakra'
