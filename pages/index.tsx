import type { NextPage } from 'next'

import CallToActionWithAnnotation from '~/src/components/CallToActionWithAnnotation'

import Layout from '~/src/components/Layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <CallToActionWithAnnotation />
    </Layout>
  )
}

export default Home
