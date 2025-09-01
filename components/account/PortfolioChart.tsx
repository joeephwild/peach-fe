import { useMemo, useState } from 'react'
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { formatCurrencyValue } from 'utils/numbers'

type TimePeriod = '24H' | '7D' | '30D' | '3M' | '1Y'

const PortfolioChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('7D')

  // Mock data - replace with actual portfolio history data
  const chartData = useMemo(() => {
    const baseValue = 84000
    const days = selectedPeriod === '24H' ? 1 : selectedPeriod === '7D' ? 7 : 30

    return Array.from({ length: days * 4 }, (_, i) => ({
      time: new Date(Date.now() - (days * 4 - i) * 6 * 60 * 60 * 1000).toISOString(),
      value: baseValue + Math.random() * 10000 - 5000,
    }))
  }, [selectedPeriod])

  const currentValue = chartData[chartData.length - 1]?.value || 0
  const previousValue = chartData[0]?.value || 0
  const change = currentValue - previousValue
  const changePercent = (change / previousValue) * 100

  return (
    <div className="bg-th-card-bkg rounded-2xl p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
        <div>
          <h3 className="text-th-fgd-1 text-base sm:text-lg font-semibold mb-1">Portfolio Value</h3>
          <p className="text-th-fgd-1 text-2xl sm:text-3xl font-bold">
            {formatCurrencyValue(currentValue)}
          </p>
          <p className={`text-sm ${
            change >= 0 ? 'text-th-success' : 'text-th-error'
          }`}>
            {change >= 0 ? '+' : ''}{formatCurrencyValue(change)} ({changePercent.toFixed(2)}%)
          </p>
        </div>

        {/* Time Period Selector */}
        <div className="flex bg-th-bkg-3 rounded-lg p-1 overflow-x-auto">
          {(['24H', '7D', '30D', '3M', '1Y'] as TimePeriod[]).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md transition-colors whitespace-nowrap ${
                selectedPeriod === period
                  ? 'bg-th-active text-white'
                  : 'text-th-fgd-3 hover:text-th-fgd-1'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-48 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F57C00" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#F57C00" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#8E8E8E' }}
              className="sm:text-xs"
              tickFormatter={(value) => {
                const date = new Date(value)
                return selectedPeriod === '24H'
                  ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                  : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#8E8E8E' }}
              className="sm:text-xs"
              tickFormatter={(value) => formatCurrencyValue(value, 0)}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#F57C00"
              strokeWidth={2}
              fill="url(#portfolioGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PortfolioChart
