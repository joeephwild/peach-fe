import { useMemo } from 'react'
import mangoStore from '@store/mangoStore'
import useMangoAccount from 'hooks/useMangoAccount'
import { formatCurrencyValue, formatNumericValue } from 'utils/numbers'
import HealthCard from './HealthCard'
import AssetsLiabilitiesTable from './AssetsLiabilitiesTable'
import PortfolioRank from './PortfolioRank'
import SolBalance from './SolBalance'
import PortfolioChart from './PortfolioChart'

const PortfolioOverview = () => {
  const { mangoAccount } = useMangoAccount()
  const group = mangoStore((s) => s.group)

  const portfolioValue = useMemo(() => {
    if (!mangoAccount || !group) return 0
    return mangoAccount.getEquity(group).toNumber()
  }, [mangoAccount, group])

  const deposits = useMemo(() => {
    if (!mangoAccount || !group) return 0
    return mangoAccount.getAssetsValue(group).toNumber()
  }, [mangoAccount, group])

  const borrows = useMemo(() => {
    if (!mangoAccount || !group) return 0
    return mangoAccount.getLiabsValue(group).toNumber()
  }, [mangoAccount, group])

  const health = useMemo(() => {
    if (!mangoAccount || !group) return 100
    return mangoAccount.getHealthRatioUi(group, 'Maint')
  }, [mangoAccount, group])

  return (
    <div className="p-4 sm:p-6">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          {/* Portfolio Chart */}
          <PortfolioChart />

          {/* Assets & Liabilities Table */}
          <AssetsLiabilitiesTable />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Health Card */}
          <HealthCard />

          {/* Portfolio Rank */}
          <PortfolioRank />

          {/* SOL Balance */}
          <SolBalance />
        </div>
      </div>
    </div>
  )
}

export default PortfolioOverview
