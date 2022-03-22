import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  Image,
  useDisclosure,
  useToast,
  useColorMode,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import { AuthSession } from '@supabase/supabase-js'
import { supabase } from '~/src/utils/supabaseClient'
import NAV_ITEMS from '~/src/utils/navItems'
import type { NavItem } from '~/src/utils/navItems'
import { SignOut } from '~/src/hooks/AuthUser'
import siteMeta from '@/data/siteMetadata'

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [session, setSession] = useState<AuthSession | null>(null)
  const { colorMode, toggleColorMode } = useColorMode()

  const handleSignOut = async () => {
    try {
      setLoading(true)
      const { error } = await SignOut()
      if (error) {
        console.log(error)
        throw error
      }
      setSession(null)
      toast({
        title: 'Logout successful',
        status: 'success',
        duration: 7000,
        isClosable: true,
      })
    } catch (error: any) {
      console.error(error)
      toast({
        title: 'Error signing out',
        description: error.message || 'Something went wrong',
        status: 'error',
        duration: 7000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setSession(supabase.auth.session())
    console.log(supabase.auth.session())

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`Supabase auth event: ${event}`)
      setSession(session)
    })

    return () => {
      authListener?.unsubscribe()
    }
  }, [])

  return (
    <Box as={'nav'}>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        position={'relative'}
        justifyContent={{ base: 'center', md: 'start' }}
      >
        <Flex flex={{ base: 1, md: 'auto' }} ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>

        <Flex
          alignItems={'center'}
          position={{ base: 'absolute', md: 'relative' }}
          justifyContent={{ base: 'center', md: 'start' }}
        >
          <Link
            href={'/'}
            color={useColorModeValue('gray.700', 'white')}
            _hover={{
              textDecoration: 'none',
            }}
          >
            <Flex
              alignItems={'center'}
              position={{ base: 'absolute', md: 'relative' }}
              justifyContent={{ base: 'center', md: 'start' }}
            >
              <Image src={'/images/dollar-512x512.png'} alt={siteMeta.title} w={'50px'} h={'50px'} />
              <Text
                textAlign={'center'}
                fontFamily={'heading'}
                marginLeft={'2'}
                fontWeight={'bold'}
                color={useColorModeValue('brand.800', 'white')}
              >
                {siteMeta.title}
              </Text>
            </Flex>
          </Link>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6} marginLeft={'auto'}>
          <Button onClick={toggleColorMode}>{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}</Button>
          {!session ? (
            <Stack isInline spacing={4}>
              <Button as={'a'} fontSize={'sm'} fontWeight={500} variant={'link'} href={'/auth/login'}>
                Sign In
              </Button>
              <Button
                display={{ base: 'none', md: 'inline-flex' }}
                as={'a'}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'teal.400'}
                href={'/auth/signup'}
                _hover={{
                  bg: 'teal.300',
                }}
              >
                Sign Up
              </Button>
            </Stack>
          ) : (
            <Button
              isLoading={loading}
              loadingText="Submitting"
              colorScheme="teal"
              variant="outline"
              onClick={handleSignOut}
            >
              Sign out
            </Button>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  )
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('gray.800', 'white')
  const popoverContentBgColor = useColorModeValue('white', 'gray.800')

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent border={0} boxShadow={'xl'} bg={popoverContentBgColor} p={4} rounded={'xl'} minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('green.50', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text transition={'all .3s ease'} _groupHover={{ color: 'green.400' }} fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'green.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  )
}

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  )
}

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
          <Text>abcde</Text>
        </Stack>
      </Collapse>
    </Stack>
  )
}
