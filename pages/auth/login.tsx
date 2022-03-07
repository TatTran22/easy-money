import { useState } from 'react'
import { supabase } from '~/src/utils/supabaseClient'
import { Login, SignUp } from '~/src/components/Forms'
import type { NextPage } from 'next'
import { Stack, Flex, Heading, useToast, Text, useColorModeValue } from '@chakra-ui/react'
import { Session } from '@supabase/supabase-js'
import Layout from '~/src/components/Layout'

const Auth: NextPage = () => {
  return (
    <Layout title="Log in">
      <Flex
        bg={useColorModeValue('gray.100', 'gray.800')}
        justifyContent={'space-around'}
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <Stack align={'center'} justifyContent={'center'} minW={'180px'}>
          <Heading fontSize={'4xl'} textAlign={'center'} color={useColorModeValue('gray.800', 'gray.200')}>
            Log in
          </Heading>
          <Text fontSize={'lg'} color={useColorModeValue('gray.600', 'gray.200')} textAlign={'center'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Login />
      </Flex>
    </Layout>
  )
}

export default Auth
