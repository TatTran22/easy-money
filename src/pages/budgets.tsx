import { GetServerSideProps, NextPage } from 'next'
import { NextAppPageProps } from '@/types/app'
import siteMeta from '@/data/siteMetadata'
import { Stat } from '@/components/Stat'
import { Box, Container, SimpleGrid } from '@chakra-ui/react'

import Layout from '~/src/components/Layout'

type BudgetPageServerSideProps = {
  meta: {
    title: string
  }
}

const stats = [
  { label: 'Total Subscribers', value: '71,887' },
  { label: 'Avg. Open Rate', value: '56.87%' },
  { label: 'Avg. Click Rate', value: '12.87%' },
]

const IndexPage: NextPage<NextAppPageProps> = () => {
  return (
    <Layout title="Budget">
      <Box as="section" py={{ base: '4', md: '8' }}>
        <Container>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: '5', md: '6' }}>
            {stats.map(({ label, value }) => (
              <Stat key={label} label={label} value={value} />
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </Layout>
  )
}

export default IndexPage

export const getServerSideProps: GetServerSideProps<BudgetPageServerSideProps> = async () => {
  return {
    props: {
      meta: {
        title: siteMeta.title,
      },
    },
  }
}
