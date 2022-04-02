import { GetServerSideProps, NextPage } from 'next'
import { NextAppPageProps } from '@/types/app'
import CallToActionWithAnnotation from '~/src/components/CallToActionWithAnnotation'

import Layout from '~/src/components/Layout'

type IndexPageServerSideProps = {
  meta: {
    title: string
  }
}

const IndexPage: NextPage<NextAppPageProps> = ({ meta }) => {
  return (
    <Layout title="Home">
      <CallToActionWithAnnotation />
    </Layout>
  )
}

export default IndexPage

export const getServerSideProps: GetServerSideProps<IndexPageServerSideProps> = async () => {
  return {
    props: {
      meta: {
        title: 'Next.js Starter Kit',
      },
    },
  }
}
