import { extendTheme, theme as base } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: (props: any) => ({
    body: {
      bg: mode('white', 'lightGreen.400')(props),
    },
  }),
}

const colors = {
  lightGreen: {
    100: '#F9F8EB',
    200: '#A7D7C5',
    300: '#74B49B',
    400: '#5C8D89',
  },
  darkGreen: {
    100: '#382933',
    200: '#3B5249',
    300: '#519872',
    400: '#A4B494',
  },
  palette1: {
    100: '#1D2D50',
    200: '#133B5C',
    300: '#1E5F74',
    400: '#FCDAB7',
  },
}

const fonts = {
  heading: `Josefin Sans, ${base.fonts.heading}`,
}

const components = {
  Button: {
    variants: {
      pill: (props: any) => ({
        ...base.components.Button.variants.outline(props),
        rounded: 'full',
        color: 'gray.500',
      }),
    },
  },
}

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({ config, styles, colors, fonts, components })
export default theme
