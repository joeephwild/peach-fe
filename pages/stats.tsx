import StatsPage from '@components/stats/StatsPage'
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'account',
        'activity',
        'close-account',
        'common',
        'notifications',
        'onboarding',
        'profile',
        'search',
        'settings',
        'stats',
        'token',
        'trade',
      ])),
    },
  }
}

const metaTitle = 'Stats | TVL, Volume, Fees and More'
const metaDescription = 'All the metrics you need to keep track of Peach.'

const Stats: NextPage = () => {
  return (
    <>
      <Head>
        <title>Stats | Peach</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta name="og:description" content={metaDescription} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
      </Head>
      <StatsPage />
    </>
  )
}

export default Stats
