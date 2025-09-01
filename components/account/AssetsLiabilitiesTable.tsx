import { Disclosure, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useTranslation } from 'next-i18next'
import { useViewport } from '../../hooks/useViewport'
import { breakpoints } from '../../utils/theme'
import ContentBox from '../shared/ContentBox'
import {
  Table,
  Td,
  Th,
  TrBody,
  TrHead,
} from '../shared/TableElements'
import BankAmountWithValue from '../shared/BankAmountWithValue'
import TableTokenName from '../shared/TableTokenName'
import TableRatesDisplay from '../shared/TableRatesDisplay'
import useMangoAccount from 'hooks/useMangoAccount'
import { useMemo } from 'react'
import { formatTokenSymbol } from 'utils/tokens'
import FormatNumericValue from '../shared/FormatNumericValue'
import { Bank } from '@blockworks-foundation/mango-v4'

const AssetsLiabilitiesTable = () => {
  const { t } = useTranslation(['common', 'account'])
  const { width } = useViewport()
  const showTableView = width ? width > breakpoints.md : false
  const { mangoAccount } = useMangoAccount()

  const tableData = useMemo(() => {
    if (!mangoAccount) return { assets: [], liabilities: [] }

    const assets: Array<{
      bank: Bank
      balance: number
      value: number
      depositRate: number
      borrowRate: number
      symbol: string
      isAsset: boolean
      weight: number
    }> = []
    const liabilities: Array<{
      bank: Bank
      balance: number
      value: number
      depositRate: number
      borrowRate: number
      symbol: string
      isAsset: boolean
      weight: number
    }> = []

    for (const token of mangoAccount.tokensActive()) {
      const bank = token.bank
      const uiBalance = token.uiBalance
      const value = Math.abs(uiBalance * bank.uiPrice)
      const depositRate = bank.getDepositRateUi()
      const borrowRate = bank.getBorrowRateUi()

      const tokenData = {
        bank,
        balance: Math.abs(uiBalance),
        value,
        depositRate,
        borrowRate,
        symbol: formatTokenSymbol(bank.name),
        isAsset: uiBalance > 0,
        weight: uiBalance > 0 ? bank.scaledInitAssetWeight(bank.price).toNumber() * 100 : bank.scaledInitLiabWeight(bank.price).toNumber() * 100
      }

      if (uiBalance > 0) {
        assets.push(tokenData)
      } else if (uiBalance < 0) {
        liabilities.push(tokenData)
      }
    }

    return { assets, liabilities }
  }, [mangoAccount])

  if (!mangoAccount) {
    return (
      <ContentBox hideBorder hidePadding>
        <div className="p-6 text-center text-th-fgd-3">
          {t('account:connect-wallet')}
        </div>
      </ContentBox>
    )
  }

  const { assets, liabilities } = tableData
  const hasAssets = assets.length > 0
  const hasLiabilities = liabilities.length > 0

  return (
    <ContentBox hideBorder hidePadding>
      <div className="px-6 py-4">
        <h3 className="text-base font-medium text-th-fgd-1">
          {t('assets-liabilities')}
        </h3>
      </div>

      {showTableView ? (
        <div className="overflow-x-auto">
          <Table>
            <thead>
              <TrHead>
                <Th className="text-left">{t('asset')}</Th>
                <Th className="text-right">{t('balance')}</Th>
                <Th className="text-right">{t('value')}</Th>
                <Th className="text-right">{t('earning-apy')}</Th>
                <Th className="text-right">{t('borrow-apy')}</Th>
                <Th className="text-right">{t('liq-price')}</Th>
                <Th className="text-right">{t('asset-liability-weight')}</Th>
              </TrHead>
            </thead>
            <tbody>
              {hasAssets && (
                <>
                  <tr>
                    <td colSpan={7} className="px-6 py-2">
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-th-up"></div>
                        <span className="text-sm font-medium text-th-fgd-2">
                          {t('assets')}
                        </span>
                      </div>
                    </td>
                  </tr>
                  {assets.map((data) => {
                    const { bank, balance, value, depositRate, borrowRate, symbol, weight } = data
                    return (
                      <TrBody key={`asset-${symbol}`}>
                        <Td>
                          <TableTokenName bank={bank} symbol={symbol} />
                        </Td>
                        <Td className="text-right">
                          <BankAmountWithValue
                            amount={balance}
                            bank={bank}
                            stacked
                          />
                        </Td>
                        <Td className="text-right">
                          <FormatNumericValue value={value} isUsd />
                        </Td>
                        <Td className="text-right">
                          <span className="text-th-up">
                            <FormatNumericValue value={depositRate} decimals={2} />%
                          </span>
                        </Td>
                        <Td className="text-right">
                          <span className="text-th-down">
                            <FormatNumericValue value={borrowRate} decimals={2} />%
                          </span>
                        </Td>
                        <Td className="text-right">
                          <span className="text-th-fgd-4">None</span>
                        </Td>
                        <Td className="text-right">
                          <FormatNumericValue value={weight} decimals={0} />%/
                          <FormatNumericValue value={weight} decimals={0} />%
                        </Td>
                      </TrBody>
                    )
                  })}
                </>
              )}

              {hasLiabilities && (
                <>
                  <tr>
                    <td colSpan={7} className="px-6 py-2">
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 rounded-full bg-th-down"></div>
                        <span className="text-sm font-medium text-th-fgd-2">
                          {t('liabilities')}
                        </span>
                      </div>
                    </td>
                  </tr>
                  {liabilities.map((data) => {
                    const { bank, balance, value, depositRate, borrowRate, symbol, weight } = data
                    return (
                      <TrBody key={`liability-${symbol}`}>
                        <Td>
                          <TableTokenName bank={bank} symbol={symbol} />
                        </Td>
                        <Td className="text-right">
                          <BankAmountWithValue
                            amount={balance}
                            bank={bank}
                            stacked
                          />
                        </Td>
                        <Td className="text-right">
                          <FormatNumericValue value={value} isUsd />
                        </Td>
                        <Td className="text-right">
                          <span className="text-th-up">
                            <FormatNumericValue value={depositRate} decimals={2} />%
                          </span>
                        </Td>
                        <Td className="text-right">
                          <span className="text-th-down">
                            <FormatNumericValue value={borrowRate} decimals={2} />%
                          </span>
                        </Td>
                        <Td className="text-right">
                          <span className="text-th-fgd-4">None</span>
                        </Td>
                        <Td className="text-right">
                          <FormatNumericValue value={weight} decimals={0} />%/
                          <FormatNumericValue value={weight} decimals={0} />%
                        </Td>
                      </TrBody>
                    )
                  })}
                </>
              )}

              {!hasAssets && !hasLiabilities && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-th-fgd-3">
                    {t('account:no-assets-liabilities')}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      ) : (
        <div className="border-b border-th-bkg-3">
          {hasAssets && (
            <>
              <div className="px-4 py-2">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-th-up"></div>
                  <span className="text-sm font-medium text-th-fgd-2">
                    {t('assets')}
                  </span>
                </div>
              </div>
              {assets.map((data, i) => {
                const { bank, balance, value, depositRate, borrowRate, symbol, weight } = data
                return (
                  <Disclosure key={`asset-mobile-${symbol}`}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={`w-full border-t border-th-bkg-3 p-4 text-left focus:outline-none ${
                            i === 0 ? 'border-t-0' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <TableTokenName bank={bank} symbol={symbol} />
                              <div className="text-right">
                                <BankAmountWithValue
                                  amount={balance}
                                  bank={bank}
                                  stacked
                                />
                              </div>
                            </div>
                            <ChevronDownIcon
                              className={`${
                                open ? 'rotate-180' : 'rotate-0'
                              } h-6 w-6 shrink-0 text-th-fgd-3`}
                            />
                          </div>
                        </Disclosure.Button>
                        <Transition
                          enter="transition ease-in duration-200"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                        >
                          <Disclosure.Panel>
                            <div className="mx-4 grid grid-cols-2 gap-4 border-t border-th-bkg-3 pb-4 pt-4">
                              <div className="col-span-1">
                                <p className="mb-0.5 text-xs text-th-fgd-3">
                                  {t('value')}
                                </p>
                                <FormatNumericValue value={value} isUsd />
                              </div>
                              <div className="col-span-1">
                                <p className="mb-0.5 text-xs text-th-fgd-3">
                                  {t('rates')}
                                </p>
                                <div className="flex space-x-1.5 font-mono">
                                  <TableRatesDisplay
                                    borrowRate={borrowRate}
                                    depositRate={depositRate}
                                  />
                                </div>
                              </div>
                              <div className="col-span-1">
                                <p className="mb-0.5 text-xs text-th-fgd-3">
                                  {t('liq-price')}
                                </p>
                                <span className="text-th-fgd-4">None</span>
                              </div>
                              <div className="col-span-1">
                                <p className="mb-0.5 text-xs text-th-fgd-3">
                                  {t('asset-liability-weight')}
                                </p>
                                <span className="font-mono">
                                  <FormatNumericValue value={weight} decimals={0} />%/
                                  <FormatNumericValue value={weight} decimals={0} />%
                                </span>
                              </div>
                            </div>
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                )
              })}
            </>
          )}

          {hasLiabilities && (
            <>
              <div className="px-4 py-2">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-th-down"></div>
                  <span className="text-sm font-medium text-th-fgd-2">
                    {t('liabilities')}
                  </span>
                </div>
              </div>
              {liabilities.map((data, i) => {
                const { bank, balance, value, depositRate, borrowRate, symbol, weight } = data
                return (
                  <Disclosure key={`liability-mobile-${symbol}`}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={`w-full border-t border-th-bkg-3 p-4 text-left focus:outline-none ${
                            i === 0 ? 'border-t-0' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <TableTokenName bank={bank} symbol={symbol} />
                              <div className="text-right">
                                <BankAmountWithValue
                                  amount={balance}
                                  bank={bank}
                                  stacked
                                />
                              </div>
                            </div>
                            <ChevronDownIcon
                              className={`${
                                open ? 'rotate-180' : 'rotate-0'
                              } h-6 w-6 shrink-0 text-th-fgd-3`}
                            />
                          </div>
                        </Disclosure.Button>
                        <Transition
                          enter="transition ease-in duration-200"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                        >
                          <Disclosure.Panel>
                            <div className="mx-4 grid grid-cols-2 gap-4 border-t border-th-bkg-3 pb-4 pt-4">
                              <div className="col-span-1">
                                <p className="mb-0.5 text-xs text-th-fgd-3">
                                  {t('value')}
                                </p>
                                <FormatNumericValue value={value} isUsd />
                              </div>
                              <div className="col-span-1">
                                <p className="mb-0.5 text-xs text-th-fgd-3">
                                  {t('rates')}
                                </p>
                                <div className="flex space-x-1.5 font-mono">
                                  <TableRatesDisplay
                                    borrowRate={borrowRate}
                                    depositRate={depositRate}
                                  />
                                </div>
                              </div>
                              <div className="col-span-1">
                                <p className="mb-0.5 text-xs text-th-fgd-3">
                                  {t('liq-price')}
                                </p>
                                <span className="text-th-fgd-4">None</span>
                              </div>
                              <div className="col-span-1">
                                <p className="mb-0.5 text-xs text-th-fgd-3">
                                  {t('asset-liability-weight')}
                                </p>
                                <span className="font-mono">
                                  <FormatNumericValue value={weight} decimals={0} />%/
                                  <FormatNumericValue value={weight} decimals={0} />%
                                </span>
                              </div>
                            </div>
                          </Disclosure.Panel>
                        </Transition>
                      </>
                    )}
                  </Disclosure>
                )
              })}
            </>
          )}

          {!hasAssets && !hasLiabilities && (
            <div className="px-4 py-8 text-center text-th-fgd-3">
              {t('account:no-assets-liabilities')}
            </div>
          )}
        </div>
      )}
    </ContentBox>
  )
}

export default AssetsLiabilitiesTable
