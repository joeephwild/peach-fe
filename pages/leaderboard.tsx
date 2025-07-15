import LeaderboardPage from '@components/leaderboard/LeaderboardPage'
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'account',
        'close-account',
        'common',
        'leaderboard',
        'notifications',
        'onboarding',
        'profile',
        'search',
        'settings',
      ])),
    },
  }
}

const metaTitle = 'Leaderboard | Top Traders on Peach'
const metaDescription =
  "Check out the best traders on Peach. Sort by PnL and account value. You can even view accounts to learn trading strategies from Peach's best traders."

const Leaderboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Leaderboard | Peach</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta name="og:description" content={metaDescription} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
      </Head>
      <LeaderboardPage />
    </>
  )
}

export default Leaderboard
