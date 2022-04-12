import { Login } from '~/src/components/Forms'
import type { NextPage } from 'next'
import Layout from '~/src/components/Layout'

const Auth: NextPage = () => {
  return (
    <Layout title="Log in">
      <Login />
    </Layout>
  )
}

export default Auth
