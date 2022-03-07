import { useState } from 'react'
import { supabase } from '~/src/utils/supabaseClient'
import { Login, SignUp } from '~/src/components/Forms'
import type { NextPage } from 'next'
import { Divider, Heading, Grid, useToast, Text, Flex, useColorModeValue } from '@chakra-ui/react'
import { Session } from '@supabase/supabase-js'
import Layout from '~/src/components/Layout'

const Auth: NextPage = () => {
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

export default Auth
