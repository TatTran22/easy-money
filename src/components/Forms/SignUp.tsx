import {
  Flex,
  Button,
  Box,
  FormControl,
  HStack,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  useToast,
  Link,
  Text,
  useColorModeValue,
  InputRightElement,
  InputLeftElement,
  FormHelperText,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon, EmailIcon, LockIcon } from '@chakra-ui/icons'
import { supabase } from '~/src/utils/supabaseClient'
import { validateEmail, validateName, validatePassword } from '~/src/utils/validateInput'
import { useRouter } from 'next/router'

export function SignUp() {
  const [loading, setLoading] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const toast = useToast()
  const router = useRouter()

  const handleSignUpSubmit = async () => {
    const vldFirstName = validateName(firstName)
    const vldLastName = validateName(lastName)
    const vldEmail = validateEmail(email)
    const vldPassword = validatePassword(password)

    if (!vldFirstName.isValid || !vldLastName.isValid || !vldEmail.isValid || !vldPassword.isValid) {
      if (!vldFirstName.isValid && !toast.isActive('first-name-error')) {
        toast({
          id: 'first-name-error',
          title: vldFirstName.errorMessage,
          status: 'error',
          duration: 7000,
          isClosable: true,
        })
      }

      if (!vldLastName.isValid && !toast.isActive('last-name-error')) {
        toast({
          id: 'last-name-error',
          title: vldLastName.errorMessage,
          status: 'error',
          duration: 7000,
          isClosable: true,
        })
      }

      if (!vldEmail.isValid && !toast.isActive('email-error')) {
        toast({
          id: 'email-error',
          title: vldEmail.errorMessage,
          status: 'error',
          duration: 7000,
          isClosable: true,
        })
      }
      if (!vldPassword.isValid && !toast.isActive('password-error')) {
        toast({
          id: 'password-error',
          title: vldPassword.errorMessage,
          status: 'error',
          duration: 7000,
          isClosable: true,
        })
      }

      return
    }

    try {
      setLoading(true)
      const { error } = await supabase.auth.signUp(
        {
          email: email,
          password: password,
        },
        {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        }
      )
      if (error) throw error
      toast({
        title: 'Success!',
        description: 'You have successfully signed up. Please check your email to verify your account.',
        duration: 7000,
        isClosable: true,
      })
      router.push('/')
    } catch (error: any) {
      console.log(error)
      toast({
        title: error.error_description || error.message,
        status: 'error',
        duration: 10000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <HStack spacing={8} py={12} px={6} align={'center'} justifyContent={'center'}>
      <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8} width={'lg'}>
        <Stack spacing={4}>
          <Flex>
            <FormControl id="first-name" isRequired marginRight={'2'}>
              <FormLabel>First name</FormLabel>
              <InputGroup>
                <Input
                  type="name"
                  name="firstName"
                  aria-label="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl id="last-name" isRequired marginLeft={'2'}>
              <FormLabel>Last name</FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  aria-label="Last name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </InputGroup>
            </FormControl>
          </Flex>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <EmailIcon color="gray.300" />
              </InputLeftElement>
              <Input
                type="email"
                name="email"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
            <FormHelperText>We will never share your email</FormHelperText>
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
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
            <FormHelperText>Use 8 or more characters with a mix of letters, numbers & symbols</FormHelperText>
          </FormControl>
          <FormControl id="confirm-password" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <LockIcon color="gray.300" />
              </InputLeftElement>
              <Input
                name="passwordConfirm"
                aria-label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </InputGroup>
            <FormHelperText>Please confirm your password</FormHelperText>
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button
              isLoading={loading}
              loadingText="Processing..."
              size="lg"
              bg={useColorModeValue('blue.400', 'blue.600')}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={handleSignUpSubmit}
            >
              Sign up
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align={'center'}>
              Already have account?{' '}
              <Link color={'blue.400'} href="/auth/login">
                Login
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </HStack>
  )
}
