import { Fragment, ReactNode } from 'react'
import Head from './Head'
import Footer from './Footer'
import Navbar from './Navbar'
import { Grid } from '@chakra-ui/react'

interface Props {
  children?: ReactNode
  title?: string
}
const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <Fragment>
      <Head title={title} />
      <Navbar />
      <Grid as={'main'}>{children}</Grid>
      <Footer />
    </Fragment>
  )
}

export default Layout
