import { useEffect, useRef, useState } from 'react'
import { Download, TrendingUp, TrendingDown, DollarSign, Target, BarChart3, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const CHANNEL_PERF = [
  { channel: 'SEO', dot: 'bg-blue-500', spend: 5000, revenue: 50000, roas: 10, conversions: 500, trend: '+12%', up: true },
  { channel: 'Social', dot: 'bg-pink-500', spend: 3000, revenue: 30000, roas: 10, conversions: 300, trend: '+8%', up: true },
  { channel: 'Email', dot: 'bg-emerald-500', spend: 2000, revenue: 40000, roas: 20, conversions: 400, trend: '+15%', up: true },
  { channel: 'Paid Media', dot: 'bg-amber-500', spend: 25000, revenue: 100000, roas: 4, conversions: 1000, trend: '+5%', up: true },
  { channel: 'PR', dot: 'bg-purple-500', spend: 1000, revenue: 20000, roas: 20, conversions: 200, trend: '+3%', up: true },
  { channel: 'Events', dot: 'bg-red-500', spend: 4000, revenue: 25000, roas: 6.3, conversions: 250, trend: '+20%', up: true },
]

const REVENUE_DATA = {
  daily: [50, 30, 40, 100, 20, 25],
  weekly: [220, 180, 260, 450, 90, 130],
  monthly: [860, 720, 1040, 1800, 380, 520],
}

const BAR_COLORS = ['#3B82F6', '#EC4899', '#10B981', '#F59E0B', '#A855F7', '#EF4444']

function formatCurrency(n) {
  if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(2) + 'M'
  if (n >= 1_000) return '$' + (n / 1_000).toFixed(1) + 'K'
  return '$' + n.toLocaleString()
}

function formatCurrencyShort(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2)
  if (n >= 1_000) return (n / 1_000).toFixed(1)
  return n.toLocaleString()
}

const KPI_CONFIG = [
  {
    label: 'Total Revenue',
    icon: DollarSign,
    today: { value: 12400, prefix: '$', suffix: '' },
    week: { value: 84000, prefix: '$', suffix: '' },
    month: { value: 360000, prefix: '$', suffix: '' },
    color: 'emerald',
    accentColor: 'bg-emerald-500',
    trend: '+12.5%',
    trendUp: true
  },
  {
    label: 'Total Conversions',
    icon: Target,
    today: { value: 234, prefix: '', suffix: '' },
    week: { value: 1638, prefix: '', suffix: '' },
    month: { value: 7020, prefix: '', suffix: '' },
    color: 'blue',
    accentColor: 'bg-blue-500',
    trend: '+8.2%',
    trendUp: true
  },
  {
    label: 'Avg ROAS',
    icon: BarChart3,
    today: { value: 4.2, prefix: '', suffix: 'x' },
    week: { value: 4.5, prefix: '', suffix: 'x' },
    month: { value: 4.3, prefix: '', suffix: 'x' },
    color: 'amber',
    accentColor: 'bg-amber-500',
    trend: '+0.3x',
    trendUp: true
  },
  {
    label: 'Total Traffic',
    icon: Users,
    today: { value: 15, prefix: '', suffix: 'K' },
    week: { value: 105, prefix: '', suffix: 'K' },
    month: { value: 450, prefix: '', suffix: 'K' },
    color: 'violet',
    accentColor: 'bg-violet-500',
    trend: '+15.3%',
    trendUp: true
  },
]

function Analytics() {
  const revenueChartRef = useRef(null)
  const trafficChartRef = useRef(null)
  const revenueChartInstance = useRef(null)
  const trafficChartInstance = useRef(null)
  const [revenueRange, setRevenueRange] = useState('daily')
  const [isChartTransitioning, setIsChartTransitioning] = useState(false)

  const colorClasses = {
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
    violet: { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200' },
  }

  useEffect(() => {
    if (revenueChartRef.current) {
      if (revenueChartInstance.current) revenueChartInstance.current.destroy()

      revenueChartInstance.current = new Chart(revenueChartRef.current, {
        type: 'bar',
        data: {
          labels: ['SEO', 'Social', 'Email', 'Paid Media', 'PR', 'Events'],
          datasets: [{
            label: `Revenue ($K) - ${revenueRange.charAt(0).toUpperCase() + revenueRange.slice(1)}`,
            data: REVENUE_DATA[revenueRange],
            backgroundColor: BAR_COLORS,
            borderRadius: 6,
            borderSkipped: false,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 750,
            easing: 'easeInOutQuart',
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(17, 24, 39, 0.95)',
              titleFont: { family: 'Inter', size: 13, weight: '600' },
              bodyFont: { family: 'Inter', size: 12 },
              padding: 12,
              cornerRadius: 8,
              callbacks: { label: ctx => ` $${ctx.parsed.y}K` }
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: '#F3F4F6' },
              ticks: { font: { family: 'Inter', size: 12 } }
            },
            x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 12 } } },
          },
        },
      })
    }

    if (trafficChartRef.current) {
      if (trafficChartInstance.current) trafficChartInstance.current.destroy()

      trafficChartInstance.current = new Chart(trafficChartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Organic Search', 'Social Media', 'Paid Ads', 'Direct'],
          datasets: [{
            data: [45, 30, 20, 5],
            backgroundColor: ['#3B82F6', '#EC4899', '#F59E0B', '#10B981'],
            borderWidth: 3,
            borderColor: '#fff',
            hoverBorderColor: '#fff',
            hoverOffset: 8,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '65%',
          animation: {
            animateRotate: true,
            duration: 1000,
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                font: { size: 12, family: 'Inter' },
                usePointStyle: true,
                pointStyle: 'circle',
              }
            },
            tooltip: {
              backgroundColor: 'rgba(17, 24, 39, 0.95)',
              titleFont: { family: 'Inter', size: 13, weight: '600' },
              bodyFont: { family: 'Inter', size: 12 },
              padding: 12,
              cornerRadius: 8,
            }
          },
        },
      })
    }

    return () => {
      if (revenueChartInstance.current) revenueChartInstance.current.destroy()
      if (trafficChartInstance.current) trafficChartInstance.current.destroy()
    }
  }, [revenueRange])

  const handleRangeChange = (range) => {
    setIsChartTransitioning(true)
    setTimeout(() => {
      setRevenueRange(range)
      setTimeout(() => setIsChartTransitioning(false), 100)
    }, 150)
  }

  const totalSpend = CHANNEL_PERF.reduce((s, r) => s + r.spend, 0)
  const totalRevenue = CHANNEL_PERF.reduce((s, r) => s + r.revenue, 0)
  const totalConversions = CHANNEL_PERF.reduce((s, r) => s + r.conversions, 0)
  const avgROAS = (totalRevenue / totalSpend).toFixed(1)

  const exportCSV = () => {
    const rows = [
      ['Channel', 'Spend', 'Revenue', 'ROAS', 'Conversions', 'Trend'],
      ...CHANNEL_PERF.map(r => [r.channel, formatCurrency(r.spend), formatCurrency(r.revenue), `${r.roas}x`, r.conversions, r.trend])
    ]
    const csv = rows.map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'analytics-report.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between flex-wrap gap-4"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
          <p className="text-sm text-gray-500 mt-0.5">Performance overview across all channels</p>
        </div>
        <motion.button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Download className="w-4 h-4" />
          Export CSV
        </motion.button>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {KPI_CONFIG.map((kpi, index) => {
          const colors = colorClasses[kpi.color]
          const Icon = kpi.icon

          return (
            <motion.div
              key={kpi.label}
              variants={itemVariants}
              className="group relative bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              whileHover={{ y: -4 }}
            >
              <div className={`absolute top-0 left-0 w-full h-1 ${kpi.accentColor}`} />
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${kpi.trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
                  {kpi.trendUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {kpi.trend}
                </div>
              </div>
              <h3 className="text-sm font-semibold text-gray-600 mb-3">{kpi.label}</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Today</span>
                  <span className="text-base font-bold text-gray-800 tabular-nums">
                    {kpi.today.prefix}<CountUp end={kpi.today.value} duration={1.5} decimals={kpi.today.value < 10 ? 1 : 0} />{kpi.today.suffix}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">This Week</span>
                  <span className="text-base font-bold text-gray-800 tabular-nums">
                    {kpi.week.prefix}<CountUp end={kpi.week.value} duration={1.5} decimals={kpi.week.value < 10 ? 1 : 0} />{kpi.week.suffix}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-400">This Month</span>
                  <span className={`text-base font-bold ${colors.text} tabular-nums`}>
                    {kpi.month.prefix}<CountUp end={kpi.month.value} duration={1.5} decimals={kpi.month.value < 10 ? 1 : 0} />{kpi.month.suffix}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Revenue by Channel Chart */}
      <motion.div
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h3 className="text-lg font-semibold text-gray-800">Revenue by Channel</h3>
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['daily', 'weekly', 'monthly'].map((range) => (
              <motion.button
                key={range}
                onClick={() => handleRangeChange(range)}
                className={`relative px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                  revenueRange === range
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                  whileHover={{ scale: revenueRange === range ? 1 : 1.05 }}
              >
                {revenueRange === range && (
                  <motion.div
                    layoutId="rangeIndicator"
                    className="absolute inset-0 bg-indigo-600 rounded-md"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{range.charAt(0).toUpperCase() + range.slice(1)}</span>
              </motion.button>
            ))}
          </div>
        </div>
        <div className={`h-64 transition-opacity duration-150 ${isChartTransitioning ? 'opacity-30' : 'opacity-100'}`}>
          <canvas ref={revenueChartRef}></canvas>
        </div>
      </motion.div>

      {/* Traffic Sources & Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Traffic Sources</h3>
          <div className="h-56">
            <canvas ref={trafficChartRef}></canvas>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Conversion Funnel</h3>
          <div className="space-y-5">
            {[
              { label: 'Impressions', value: '100,000', width: '100%', color: 'indigo' },
              { label: 'Clicks', value: '10,000 (10%)', width: '10%', color: 'blue' },
              { label: 'Conversions', value: '1,000 (1%)', width: '8%', color: 'emerald' },
              { label: 'Revenue', value: '$12,000', width: '5%', color: 'violet' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 font-medium">{item.label}</span>
                  <span className="font-semibold text-gray-800">{item.value}</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-${item.color}-500 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: item.width }}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.1, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Channel Performance Table */}
      <motion.div
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Channel Performance Comparison</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-gray-50 z-10">
              <tr className="border-b border-gray-200">
                <th className="py-3.5 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide pl-6">Channel</th>
                <th className="py-3.5 px-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Spend</th>
                <th className="py-3.5 px-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Revenue</th>
                <th className="py-3.5 px-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">ROAS</th>
                <th className="py-3.5 px-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Conversions</th>
                <th className="py-3.5 px-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide pr-6">Trend</th>
              </tr>
            </thead>
            <tbody>
              {CHANNEL_PERF.map((row, index) => (
                <motion.tr
                  key={row.channel}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.03 }}
                  className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors duration-150"
                >
                  <td className="py-3.5 pl-6 pr-4 font-medium text-gray-800 flex items-center gap-2.5">
                    <span className={`inline-block w-2.5 h-2.5 rounded-full ${row.dot}`} />
                    {row.channel}
                  </td>
                  <td className="py-3.5 px-4 text-right text-gray-600 tabular-nums">{formatCurrency(row.spend)}</td>
                  <td className="py-3.5 px-4 text-right font-semibold text-gray-800 tabular-nums">{formatCurrency(row.revenue)}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="font-bold text-emerald-600">{row.roas}x</span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-gray-600 tabular-nums">{row.conversions.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-right pr-6">
                    <span className={`inline-flex items-center gap-1 font-medium text-xs ${row.up ? 'text-emerald-600' : 'text-red-500'}`}>
                      {row.up ? (
                        <TrendingUp className="w-3.5 h-3.5" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5" />
                      )}
                      {row.trend}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 border-t border-gray-200">
                <td className="py-3.5 pl-6 pr-4 text-xs font-bold text-gray-700 uppercase">Totals</td>
                <td className="py-3.5 px-4 text-right text-xs font-bold text-gray-800 tabular-nums">{formatCurrency(totalSpend)}</td>
                <td className="py-3.5 px-4 text-right text-xs font-bold text-gray-800 tabular-nums">{formatCurrency(totalRevenue)}</td>
                <td className="py-3.5 px-4 text-right text-xs font-bold text-emerald-600">{avgROAS}x</td>
                <td className="py-3.5 px-4 text-right text-xs font-bold text-gray-800 tabular-nums">{totalConversions.toLocaleString()}</td>
                <td className="py-3.5 px-4 text-right pr-6">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                    <TrendingUp className="w-3.5 h-3.5" />
                    avg +10.5%
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

export default Analytics
