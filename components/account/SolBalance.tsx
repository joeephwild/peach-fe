import { useMemo } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import useSolBalance from 'hooks/useSolBalance'
import { formatNumericValue } from 'utils/numbers'
import { MIN_SOL_BALANCE } from 'utils/constants'
import TokenLogo from '@components/shared/TokenLogo'
import mangoStore from '@store/mangoStore'
import { WRAPPED_SOL_MINT } from '@project-serum/serum/lib/token-instructions'

const SolBalance = () => {
  const { connected } = useWallet()
  const { solBalance, maxSolDeposit } = useSolBalance()
  const group = mangoStore((s) => s.group)

  const solPrice = useMemo(() => {
    // This would typically come from a price feed
    // For now, using a placeholder value
    return 100 // USD per SOL
  }, [])

  const solValueUsd = useMemo(() => {
    return solBalance * solPrice
  }, [solBalance, solPrice])

  const solBank = useMemo(() => {
    if (!group) return undefined
    return group.getFirstBankByMint(WRAPPED_SOL_MINT)
  }, [group])

  const availableForDeposit = useMemo(() => {
    return Math.max(maxSolDeposit, 0)
  }, [maxSolDeposit])

  if (!connected) {
    return (
      <div className="rounded-2xl bg-th-card-bkg p-4 sm:p-6">
      <h3 className="mb-4 text-base sm:text-lg font-semibold text-th-fgd-1">
        SOL Balance
      </h3>
      <div className="py-6 sm:py-8 text-center">
        <p className="text-xs sm:text-sm text-th-fgd-3">
          Connect wallet to view SOL balance
        </p>
      </div>
    </div>
    )
  }

  return (
    <div className="rounded-2xl bg-th-card-bkg p-4 sm:p-6">
      <h3 className="mb-4 text-base sm:text-lg font-semibold text-th-fgd-1">SOL Balance</h3>

      {/* SOL Balance Display */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <TokenLogo bank={solBank} size={24} className="sm:w-8 sm:h-8" />
            <span className="ml-2 text-sm sm:text-base font-medium text-th-fgd-2">SOL</span>
          </div>
          <div className="text-right">
            <p className="text-base sm:text-lg font-bold text-th-fgd-1">
              {formatNumericValue(solBalance, 4)}
            </p>
            <p className="text-xs sm:text-sm text-th-fgd-3">
              ${formatNumericValue(solValueUsd, 2)}
            </p>
          </div>
        </div>
      </div>

      {/* Balance Breakdown */}
      <div className="mb-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm text-th-fgd-3">Available for Deposit</span>
          <span className="text-xs sm:text-sm font-medium text-th-fgd-2">
            {formatNumericValue(availableForDeposit, 4)} SOL
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm text-th-fgd-3">Reserved for Fees</span>
          <span className="text-xs sm:text-sm font-medium text-th-fgd-2">
            {formatNumericValue(MIN_SOL_BALANCE, 4)} SOL
          </span>
        </div>
      </div>

      {/* Collateral Information */}
      <div className="border-t border-th-bkg-3 pt-4">
        <h5 className="mb-2 text-xs sm:text-sm font-medium text-th-fgd-2">
          Collateral Info
        </h5>
        <div className="space-y-1">
          <div className="flex items-center text-xs text-th-fgd-3">
            <div className="mr-2 h-2 w-2 rounded-full bg-th-success" />
            <span className="hidden sm:inline">High-quality collateral asset</span>
            <span className="sm:hidden">High-quality asset</span>
          </div>
          <div className="flex items-center text-xs text-th-fgd-3">
            <div className="mr-2 h-2 w-2 rounded-full bg-th-success" />
            Native Solana token
          </div>
          <div className="flex items-center text-xs text-th-fgd-3">
            <div className="mr-2 h-2 w-2 rounded-full bg-th-warning" />
            <span className="hidden sm:inline">Keep minimum for transaction fees</span>
            <span className="sm:hidden">Keep min for fees</span>
          </div>
        </div>
      </div>

      {/* Low Balance Warning */}
      {solBalance < MIN_SOL_BALANCE * 10 && (
        <div className="bg-th-warning/10 border-th-warning/20 mt-4 rounded-lg border p-3">
          <div className="flex items-center">
            <div className="mr-2 h-4 w-4 flex-shrink-0 rounded-full bg-th-warning" />
            <p className="text-xs text-th-warning">
              <span className="hidden sm:inline">Low SOL balance. Consider adding more SOL for transaction fees.</span>
              <span className="sm:hidden">Low SOL balance. Add more for fees.</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default SolBalance
