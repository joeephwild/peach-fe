import { useMemo } from 'react'
import useMangoAccount from 'hooks/useMangoAccount'
import mangoStore from '@store/mangoStore'
import { formatCurrencyValue } from 'utils/numbers'

// Portfolio tiers based on account value
const PORTFOLIO_TIERS = [
  { name: 'Bronze', minValue: 0, maxValue: 1000, color: 'bg-gradient-to-r from-amber-600 to-amber-800', textColor: 'text-amber-200' },
  { name: 'Silver', minValue: 1000, maxValue: 10000, color: 'bg-gradient-to-r from-gray-400 to-gray-600', textColor: 'text-gray-200' },
  { name: 'Gold', minValue: 10000, maxValue: 50000, color: 'bg-gradient-to-r from-yellow-400 to-yellow-600', textColor: 'text-yellow-200' },
  { name: 'Platinum', minValue: 50000, maxValue: 250000, color: 'bg-gradient-to-r from-blue-400 to-blue-600', textColor: 'text-blue-200' },
  { name: 'Diamond', minValue: 250000, maxValue: 1000000, color: 'bg-gradient-to-r from-purple-400 to-purple-600', textColor: 'text-purple-200' },
  { name: 'Elite', minValue: 1000000, maxValue: Infinity, color: 'bg-gradient-to-r from-orange-400 to-orange-600', textColor: 'text-orange-200' },
]

const PortfolioRank = () => {
  const { mangoAccount } = useMangoAccount()
  const group = mangoStore((s) => s.group)

  const portfolioValue = useMemo(() => {
    if (!mangoAccount || !group) return 0
    return mangoAccount.getEquity(group).toNumber()
  }, [mangoAccount, group])

  const currentTier = useMemo(() => {
    return PORTFOLIO_TIERS.find(
      (tier) => portfolioValue >= tier.minValue && portfolioValue < tier.maxValue
    ) || PORTFOLIO_TIERS[0]
  }, [portfolioValue])

  const nextTier = useMemo(() => {
    const currentIndex = PORTFOLIO_TIERS.findIndex((tier) => tier.name === currentTier.name)
    return currentIndex < PORTFOLIO_TIERS.length - 1 ? PORTFOLIO_TIERS[currentIndex + 1] : null
  }, [currentTier])

  const progressPercentage = useMemo(() => {
    if (!nextTier) return 100
    const tierRange = nextTier.minValue - currentTier.minValue
    const currentProgress = portfolioValue - currentTier.minValue
    return Math.min((currentProgress / tierRange) * 100, 100)
  }, [portfolioValue, currentTier, nextTier])

  const remainingToNextTier = useMemo(() => {
    if (!nextTier) return 0
    return Math.max(nextTier.minValue - portfolioValue, 0)
  }, [portfolioValue, nextTier])

  return (
    <div className="bg-th-card-bkg rounded-2xl p-4 sm:p-6">
      <h3 className="text-th-fgd-1 text-base sm:text-lg font-semibold mb-4">Portfolio Rank</h3>
      
      {/* Current Tier Display */}
      <div className="mb-4">
        <div className={`${currentTier.color} rounded-lg p-3 sm:p-4 text-center`}>
          <div className="flex items-center justify-center mb-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
              <span className="text-white font-bold text-xs sm:text-sm">
                {PORTFOLIO_TIERS.findIndex((tier) => tier.name === currentTier.name) + 1}
              </span>
            </div>
            <h4 className={`${currentTier.textColor} text-lg sm:text-xl font-bold`}>
              {currentTier.name}
            </h4>
          </div>
          <p className="text-white/80 text-xs sm:text-sm">
            Portfolio Value: {formatCurrencyValue(portfolioValue)}
          </p>
        </div>
      </div>

      {/* Progress to Next Tier */}
      {nextTier && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-th-fgd-3 text-xs sm:text-sm">Progress to {nextTier.name}</span>
            <span className="text-th-fgd-2 text-xs sm:text-sm font-medium">
              {progressPercentage.toFixed(1)}%
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-th-card-bkg rounded-full h-2 sm:h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 sm:h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <p className="text-th-fgd-4 text-xs text-center">
            {formatCurrencyValue(remainingToNextTier)} remaining to reach {nextTier.name}
          </p>
        </div>
      )}

      {/* Tier Benefits */}
      <div className="border-t border-th-bkg-3 pt-4">
        <h5 className="text-th-fgd-2 text-xs sm:text-sm font-medium mb-2">Tier Benefits</h5>
        <div className="space-y-1">
          <div className="flex items-start text-xs text-th-fgd-3">
            <div className="w-2 h-2 bg-th-success rounded-full mr-2 mt-1 flex-shrink-0" />
            <span className="leading-tight">Enhanced trading features</span>
          </div>
          <div className="flex items-start text-xs text-th-fgd-3">
            <div className="w-2 h-2 bg-th-success rounded-full mr-2 mt-1 flex-shrink-0" />
            <span className="leading-tight">Priority customer support</span>
          </div>
          <div className="flex items-start text-xs text-th-fgd-3">
            <div className="w-2 h-2 bg-th-success rounded-full mr-2 mt-1 flex-shrink-0" />
            <span className="leading-tight">Exclusive market insights</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioRank