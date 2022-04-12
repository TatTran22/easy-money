import type { NextPage } from 'next'
import Layout from '~/src/components/Layout'
import NotFound from '@/components/NotFound'

const NotFoundPage: NextPage = () => {
  return (
    <Layout title="404">
      <NotFound />
    </Layout>
  )
}

export default NotFoundPage
