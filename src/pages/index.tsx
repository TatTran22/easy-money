import { NextPage } from 'next'
import { NextAppPageProps } from '@/types/app'
import CallToActionWithAnnotation from '~/src/components/CallToActionWithAnnotation'
import { Chakra } from '~/Chakra'

import Layout from '~/src/components/Layout'

type IndexPageServerSideProps = {
  meta: {
    title: string
  }
  cookies?: string
}

const IndexPage: NextPage<NextAppPageProps> = ({ cookies }: IndexPageServerSideProps) => {
  return (
    <Chakra cookies={cookies}>
      <Layout title="Home">
        <CallToActionWithAnnotation />
      </Layout>
    </Chakra>
  )
}

export default IndexPage
export { getServerSideProps } from '~/Chakra'
