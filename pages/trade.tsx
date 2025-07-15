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
        'notifications',
        'onboarding',
        'onboarding-tours',
        'profile',
        'search',
        'settings',
        'swap',
        'trade',
        'tv-chart',
      ])),
    },
  }
}

const TradePlaceholder: NextPage = () => {
  const metaTitle = 'Trade (coming back soon)'
  const metaDescription = 'Trading interface temporarily disabled.'

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta name="og:description" content={metaDescription} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
      </Head>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Trading temporarily disabled</h1>
        <p>We&apos;re working on improvements. Please check back later.</p>
      </div>
    </>
  )
}

export default TradePlaceholder
