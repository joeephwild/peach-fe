import { useMemo } from 'react'
import useMangoAccount from 'hooks/useMangoAccount'
import useMangoGroup from 'hooks/useMangoGroup'
import { formatNumericValue } from 'utils/numbers'

const HealthCard = () => {
  const { mangoAccount } = useMangoAccount()
  const { group } = useMangoGroup()

  const healthData = useMemo(() => {
    if (!mangoAccount || !group) {
      return {
        health: 100,
        leverage: 0,
        freeCollateral: 0,
        totalCollateral: 0,
      }
    }

    const health = mangoAccount.getHealthRatioUi(group)
    const leverage = mangoAccount.getLeverage(group)
    const freeCollateral = mangoAccount.getCollateralValue(group)
    const totalCollateral = mangoAccount.getAssetsValue(group)

    return {
      health: health * 100,
      leverage: leverage.toNumber(),
      freeCollateral: freeCollateral.toNumber(),
      totalCollateral: totalCollateral.toNumber(),
    }
  }, [mangoAccount, group])

  const getHealthColor = (health: number) => {
    if (health >= 50) return 'text-th-up'
    if (health >= 25) return 'text-th-warning'
    return 'text-th-down'
  }

  const getHealthBgColor = (health: number) => {
    if (health >= 50) return 'bg-th-up'
    if (health >= 25) return 'bg-th-warning'
    return 'bg-th-down'
  }

  return (
    <div className="rounded-2xl border border-th-bkg-3 bg-th-card-bkg p-4 sm:p-6">
      <div className="mb-4">
        <h3 className="text-sm sm:text-base font-bold text-th-fgd-1">Account Health</h3>
      </div>
      
      <div className="space-y-3 sm:space-y-4">
        {/* Health Percentage */}
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm text-th-fgd-3">Health</span>
          <div className="flex items-center space-x-2">
            <span className={`text-sm sm:text-lg font-bold ${getHealthColor(healthData.health)}`}>
              {formatNumericValue(healthData.health, 1)}%
            </span>
            <div className="h-2 w-12 sm:w-16 rounded-full bg-th-bkg-4">
              <div
                className={`h-full rounded-full ${getHealthBgColor(healthData.health)}`}
                style={{ width: `${Math.min(healthData.health, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Leverage */}
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm text-th-fgd-3">Leverage</span>
          <span className="text-xs sm:text-sm font-medium text-th-fgd-1">
            {formatNumericValue(healthData.leverage, 2)}x
          </span>
        </div>

        {/* Free Collateral */}
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm text-th-fgd-3">Free Collateral</span>
          <span className="text-xs sm:text-sm font-medium text-th-fgd-1">
            ${formatNumericValue(healthData.freeCollateral, 2)}
          </span>
        </div>

        {/* Total Collateral */}
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm text-th-fgd-3">Total</span>
          <span className="text-xs sm:text-sm font-bold text-th-fgd-1">
            ${formatNumericValue(healthData.totalCollateral, 2)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default HealthCard