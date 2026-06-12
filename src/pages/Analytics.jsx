import { useEffect, useRef, useState } from 'react'
import { Download } from 'lucide-react'
import Chart from 'chart.js/auto'

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

function Analytics() {
  const revenueChartRef = useRef(null)
  const trafficChartRef = useRef(null)
  const revenueChartInstance = useRef(null)
  const trafficChartInstance = useRef(null)
  const [revenueRange, setRevenueRange] = useState('daily')

  useEffect(() => {
    // Initialize Revenue Chart
    if (revenueChartRef.current) {
      if (revenueChartInstance.current) revenueChartInstance.current.destroy()

      revenueChartInstance.current = new Chart(revenueChartRef.current, {
        type: 'bar',
        data: {
          labels: ['SEO', 'Social', 'Email', 'Paid Media', 'PR', 'Events'],
          datasets: [{
            label: `Revenue ($K) — ${revenueRange.charAt(0).toUpperCase() + revenueRange.slice(1)}`,
            data: REVENUE_DATA[revenueRange],
            backgroundColor: BAR_COLORS,
            borderRadius: 6,
            borderSkipped: false,
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: ctx => ` $${ctx.parsed.y}K` } },
          },
          scales: {
            y: { beginAtZero: true, grid: { color: '#F3F4F6' }, ticks: { font: { family: 'Inter', size: 12 } } },
            x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 12 } } },
          },
        },
      })
    }

    // Initialize Traffic Chart
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
          }],
        },
        options: {
          responsive: true,
          cutout: '62%',
          plugins: {
            legend: { position: 'bottom', labels: { padding: 18, font: { size: 12, family: 'Inter' }, usePointStyle: true } },
          },
        },
      })
    }

    return () => {
      if (revenueChartInstance.current) revenueChartInstance.current.destroy()
      if (trafficChartInstance.current) trafficChartInstance.current.destroy()
    }
  }, [revenueRange])

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

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
          <p className="text-sm text-gray-500 mt-0.5">Performance overview across all channels</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', icon: '💰', today: '$12,400', week: '$84,000', month: '$360,000', color: 'indigo' },
          { label: 'Total Conversions', icon: '📈', today: '234', week: '1,638', month: '7,020', color: 'emerald' },
          { label: 'Avg ROAS', icon: '📊', today: '4.2x', week: '4.5x', month: '4.3x', color: 'violet' },
          { label: 'Total Traffic', icon: '👥', today: '15K', week: '105K', month: '450K', color: 'blue' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-8 h-8 bg-${kpi.color}-100 rounded-full flex items-center justify-center shrink-0`}>
                <span className="text-sm">{kpi.icon}</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-700">{kpi.label}</h3>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Today</span>
                <span className="text-sm font-bold text-gray-800">{kpi.today}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">This Week</span>
                <span className="text-sm font-bold text-gray-800">{kpi.week}</span>
              </div>
              <div className="flex justify-between items-center pt-1.5 border-t border-gray-100">
                <span className="text-xs text-gray-400">This Month</span>
                <span className={`text-sm font-bold text-${kpi.color}-600`}>{kpi.month}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue by Channel Chart */}
      <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <h3 className="text-lg font-semibold text-gray-800">Revenue by Channel</h3>
          <div className="flex gap-2">
            {['daily', 'weekly', 'monthly'].map((range) => (
              <button
                key={range}
                onClick={() => setRevenueRange(range)}
                className={`text-xs px-3 py-1 rounded-md transition-colors duration-200 ${
                  revenueRange === range
                    ? 'bg-indigo-600 text-white'
                    : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <canvas ref={revenueChartRef} height="80"></canvas>
      </div>

      {/* Traffic Sources & Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow duration-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Traffic Sources</h3>
          <canvas ref={trafficChartRef} height="160"></canvas>
        </div>
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow duration-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Conversion Funnel</h3>
          <div className="space-y-4">
            {[
              { label: 'Impressions', value: '100,000', width: '100%' },
              { label: 'Clicks', value: '10,000 (10%)', width: '10%' },
              { label: 'Conversions', value: '1,000 (1%)', width: '1%', min: '0.8%' },
              { label: 'Revenue', value: '$12,000', width: '0.5%', min: '0.8%', color: 'violet' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-600 font-medium">{item.label}</span>
                  <span className="font-semibold text-gray-800">{item.value}</span>
                </div>
                <div className="h-3 bg-indigo-200 rounded-full overflow-hidden">
                  <div
                    className={`h-3 bg-${item.color || 'indigo'}-600 rounded-full`}
                    style={{ width: item.width, minWidth: item.min }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Channel Performance Table */}
      <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Channel Performance Comparison</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide pl-6">Channel</th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Spend</th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Revenue</th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">ROAS</th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Conversions</th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Trend</th>
              </tr>
            </thead>
            <tbody>
              {CHANNEL_PERF.map((row) => (
                <tr key={row.channel} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 pl-6 pr-4 font-medium text-gray-800 flex items-center gap-2">
                    <span className={`inline-block w-2.5 h-2.5 rounded-full ${row.dot} shrink-0`} />
                    {row.channel}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">{formatCurrency(row.spend)}</td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-800">{formatCurrency(row.revenue)}</td>
                  <td className="py-3 px-4 text-right font-bold text-green-600">{row.roas}x</td>
                  <td className="py-3 px-4 text-right text-gray-600">{row.conversions.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`inline-flex items-center gap-1 font-medium text-xs ${row.up ? 'text-green-600' : 'text-red-500'}`}>
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={row.up ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'} />
                      </svg>
                      {row.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 border-t border-gray-200">
                <td className="py-3 pl-6 pr-4 text-xs font-semibold text-gray-600 uppercase">Totals</td>
                <td className="py-3 px-4 text-right text-xs font-semibold text-gray-800">{formatCurrency(totalSpend)}</td>
                <td className="py-3 px-4 text-right text-xs font-semibold text-gray-800">{formatCurrency(totalRevenue)}</td>
                <td className="py-3 px-4 text-right text-xs font-bold text-green-600">{avgROAS}x</td>
                <td className="py-3 px-4 text-right text-xs font-semibold text-gray-800">{totalConversions.toLocaleString()}</td>
                <td className="py-3 px-4 text-right text-xs font-medium text-green-600">
                  <span className="inline-flex items-center gap-1">
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    avg +10.5%
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Analytics
