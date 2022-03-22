import {
  InputLeftElement,
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Checkbox,
  Link,
  useToast,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  HStack,
  Divider,
  Center,
  Flex,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon, EmailIcon, LockIcon } from '@chakra-ui/icons'
import { FaFacebook, FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useEffect, useState } from 'react'
import { supabase } from '~/src/utils/supabaseClient'
import { validateEmail } from '~/src/utils/validateInput'
import { Provider } from '@supabase/supabase-js'
import { useRouter } from 'next/router'

export function Login() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const toast = useToast()
  const router = useRouter()

  const handleLogin = async () => {
    const vldEmail = validateEmail(email)

    if (!vldEmail.isValid) {
      if (!toast.isActive('email-error')) {
        toast({
          id: 'email-error',
          title: vldEmail.errorMessage,
          status: 'error',
          duration: 7000,
          isClosable: true,
        })
      }

      return
    }

    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email: email, password: password })
      if (error) throw error
      toast({
        title: 'Login successful',
        description: 'You are now logged in',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      router.push('/')
    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function signInWithProvider(provider: Provider | undefined) {
    const { user, session, error } = await supabase.auth.signIn({
      provider: provider,
    })
    console.log(user, session, error)
  }

  useEffect(() => {
    if (supabase.auth.session()) {
      router.push('/')
    }
  }, [])
  return (
    <HStack spacing={8} py={12} px={6} align={'center'} justifyContent={'center'}>
      <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8} width={'lg'}>
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel bg={useColorModeValue('white', 'gray.700')}>Email address</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <EmailIcon color="gray.300" />
              </InputLeftElement>
              <Input
                type="email"
                name="email"
                aria-label="Email address"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl id="password">
            <FormLabel bg={useColorModeValue('white', 'gray.700')}>Password</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <LockIcon color="gray.300" />
              </InputLeftElement>
              <Input
                name="password"
                aria-label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement h={'full'}>
                <Button variant={'ghost'} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={10}>
            <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Link color={'blue.400'}>Forgot password?</Link>
            </Stack>
            <Button
              isLoading={loading}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={handleLogin}
            >
              {email && !password ? 'Login with email' : 'Login'}
            </Button>
          </Stack>
        </Stack>
        <Divider orientation="horizontal" marginY={'4'} />
        <Stack spacing={4}>
          <Center>
            <Text fontSize={'sm'}>Or sign in with</Text>
          </Center>
          <Flex justifyContent={'space-around'}>
            <Button
              colorScheme="facebook"
              leftIcon={<FaFacebook />}
              flex={'1'}
              onClick={() => signInWithProvider('facebook')}
            >
              Facebook
            </Button>
            <Button
              colorScheme="gray"
              leftIcon={<FaGithub />}
              flex={'1'}
              marginX={'4'}
              onClick={() => signInWithProvider('github')}
            >
              Github
            </Button>
            <Button colorScheme="gray" leftIcon={<FcGoogle />} flex={'1'} onClick={() => signInWithProvider('google')}>
              Google
            </Button>
          </Flex>
        </Stack>
        <Stack pt={6}>
          <Text align={'center'}>
            No account?{' '}
            <Link color={'blue.400'} href="/auth/signup">
              Sign up
            </Link>
          </Text>
        </Stack>
      </Box>
    </HStack>
  )
}
