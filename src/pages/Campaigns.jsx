import { useState } from 'react'
import { Plus, Play, Pause, Trash2, X, Search, TrendingUp } from 'lucide-react'

const INITIAL_CAMPAIGNS = [
  { id: '1', name: 'Q2 Brand Awareness Push', channel: 'Social Media', channelColor: 'text-pink-600', status: 'active', budget: 15000, spent: 9800, roas: 3.2, conversions: 412, startDate: '2026-04-01', endDate: '2026-06-30' },
  { id: '2', name: 'Summer SEO Content Blitz', channel: 'SEO', channelColor: 'text-blue-600', status: 'active', budget: 8000, spent: 4200, roas: 10.5, conversions: 312, startDate: '2026-05-01', endDate: '2026-07-31' },
  { id: '3', name: 'Re-engagement Email Sequence', channel: 'Email', channelColor: 'text-emerald-600', status: 'active', budget: 5000, spent: 2100, roas: 18.2, conversions: 287, startDate: '2026-05-15', endDate: '2026-06-15' },
  { id: '4', name: 'Google Ads Performance Max', channel: 'Paid Media', channelColor: 'text-amber-600', status: 'active', budget: 50000, spent: 31400, roas: 4.8, conversions: 890, startDate: '2026-04-01', endDate: '2026-06-30' },
  { id: '5', name: 'PR Media Blitz June', channel: 'PR', channelColor: 'text-purple-600', status: 'paused', budget: 10000, spent: 3200, roas: 6.1, conversions: 134, startDate: '2026-06-01', endDate: '2026-06-30' },
  { id: '6', name: 'Webinar Lead Gen Series', channel: 'Events', channelColor: 'text-red-600', status: 'active', budget: 12000, spent: 7800, roas: 5.3, conversions: 520, startDate: '2026-05-01', endDate: '2026-07-31' },
  { id: '7', name: 'Product Launch — v3.0', channel: 'Paid Media', channelColor: 'text-amber-600', status: 'completed', budget: 25000, spent: 25000, roas: 6.7, conversions: 1200, startDate: '2026-03-01', endDate: '2026-04-30' },
  { id: '8', name: 'LinkedIn Thought Leadership', channel: 'Social Media', channelColor: 'text-pink-600', status: 'active', budget: 6000, spent: 2900, roas: 2.8, conversions: 98, startDate: '2026-05-01', endDate: '2026-07-31' },
]

const ITEMS_PER_PAGE = 8

function formatCurrency(n) {
  if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(2) + 'M'
  if (n >= 1_000) return '$' + (n / 1_000).toFixed(1) + 'K'
  return '$' + n.toLocaleString()
}

const STATUS_CONFIG = {
  active: { label: 'Active', bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  paused: { label: 'Paused', bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
  completed: { label: 'Completed', bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' },
}

const CHANNEL_COLORS = {
  'Social Media': 'text-pink-600',
  'SEO': 'text-blue-600',
  'Email': 'text-emerald-600',
  'Paid Media': 'text-amber-600',
  'PR': 'text-purple-600',
  'Events': 'text-red-600',
}

function Campaigns() {
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [channelFilter, setChannelFilter] = useState('All Channels')
  const [page, setPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '', channel: '', budget: '', startDate: '', endDate: '', audience: '', goals: ''
  })
  const [errors, setErrors] = useState({})

  // Filter campaigns
  const filteredCampaigns = campaigns.filter(c => {
    const matchStatus = statusFilter === 'All Status' || c.status === statusFilter.toLowerCase()
    const matchChannel = channelFilter === 'All Channels' || c.channel === channelFilter
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchChannel && matchSearch
  })

  // Pagination
  const totalPages = Math.ceil(filteredCampaigns.length / ITEMS_PER_PAGE)
  const paginatedCampaigns = filteredCampaigns.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  // Stats
  const stats = {
    active: campaigns.filter(c => c.status === 'active').length,
    paused: campaigns.filter(c => c.status === 'paused').length,
    completed: campaigns.filter(c => c.status === 'completed').length,
    totalBudget: campaigns.reduce((s, c) => s + c.budget, 0),
  }

  const toggleStatus = (id) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === id && (c.status === 'active' || c.status === 'paused')) {
        return { ...c, status: c.status === 'active' ? 'paused' : 'active' }
      }
      return c
    }))
  }

  const deleteCampaign = (id) => {
    if (!confirm('Are you sure you want to delete this campaign?')) return
    setCampaigns(prev => prev.filter(c => c.id !== id))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Campaign name is required'
    else if (formData.name.length > 100) newErrors.name = 'Must be 100 characters or less'
    if (!formData.channel) newErrors.channel = 'Channel is required'
    if (!formData.budget) newErrors.budget = 'Budget is required'
    else {
      const budget = parseFloat(formData.budget)
      if (isNaN(budget)) newErrors.budget = 'Must be a valid number'
      else if (budget < 100) newErrors.budget = 'Minimum $100'
      else if (budget > 100000) newErrors.budget = 'Maximum $100,000'
    }
    if (!formData.startDate) newErrors.startDate = 'Start date is required'
    if (!formData.endDate) newErrors.endDate = 'End date is required'
    else if (formData.startDate && formData.endDate < formData.startDate) newErrors.endDate = 'Must be after start date'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const submitForm = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    const newCampaign = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      channel: formData.channel,
      channelColor: CHANNEL_COLORS[formData.channel] || 'text-gray-600',
      status: 'active',
      budget: parseFloat(formData.budget),
      spent: 0,
      roas: 0,
      conversions: 0,
      startDate: formData.startDate,
      endDate: formData.endDate,
    }

    setCampaigns(prev => [newCampaign, ...prev])
    setIsModalOpen(false)
    setFormData({ name: '', channel: '', budget: '', startDate: '', endDate: '', audience: '', goals: '' })
    setErrors({})
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Campaigns</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage and monitor all marketing campaigns</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Campaign
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Campaigns', value: stats.active, icon: Play, color: 'emerald' },
          { label: 'Paused Campaigns', value: stats.paused, icon: Pause, color: 'amber' },
          { label: 'Completed', value: stats.completed, icon: null, color: 'gray' },
          { label: 'Total Budget', value: formatCurrency(stats.totalBudget), icon: TrendingUp, color: 'indigo' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-2 mb-2">
              {stat.icon && (
                <div className={`w-8 h-8 bg-${stat.color}-100 rounded-full flex items-center justify-center shrink-0`}>
                  <stat.icon className={`w-3.5 h-3.5 text-${stat.color}-600`} />
                </div>
              )}
              <span className="text-xs font-medium text-gray-500">{stat.label}</span>
            </div>
            <p className="text-xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
            className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Paused</option>
            <option>Completed</option>
          </select>
          <select
            value={channelFilter}
            onChange={(e) => { setChannelFilter(e.target.value); setPage(1) }}
            className="px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option>All Channels</option>
            <option>Social Media</option>
            <option>SEO</option>
            <option>Email</option>
            <option>Paid Media</option>
            <option>PR</option>
            <option>Events</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase">Campaign</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase">Channel</th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-gray-500 uppercase">Budget</th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-gray-500 uppercase">Spent</th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-gray-500 uppercase">ROAS</th>
                <th className="py-3 px-4 text-center text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCampaigns.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-gray-500">
                    <p className="font-medium">No campaigns found</p>
                    <p className="text-xs mt-1">Try adjusting your filters or create a new campaign</p>
                  </td>
                </tr>
              ) : (
                paginatedCampaigns.map((c) => {
                  const config = STATUS_CONFIG[c.status]
                  const progress = c.budget > 0 ? Math.min((c.spent / c.budget) * 100, 100) : 0
                  return (
                    <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-indigo-100 rounded-md flex items-center justify-center shrink-0">
                            <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{c.name}</p>
                            <p className="text-xs text-gray-400">{c.startDate} - {c.endDate}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-medium ${c.channelColor}`}>{c.channel}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                          {config.label}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <p className="font-medium text-gray-800">{formatCurrency(c.budget)}</p>
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1 ml-auto">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${progress}%` }} />
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right text-gray-600">{formatCurrency(c.spent)}</td>
                      <td className="py-3 px-4 text-right">
                        <span className={`font-bold ${c.roas >= 5 ? 'text-emerald-600' : c.roas >= 3 ? 'text-amber-600' : 'text-gray-800'}`}>
                          {c.roas}x
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-1">
                          {(c.status === 'active' || c.status === 'paused') && (
                            <button
                              onClick={() => toggleStatus(c.id)}
                              className={`p-1.5 rounded-md hover:bg-gray-100 transition-colors ${c.status === 'active' ? 'text-amber-600' : 'text-emerald-600'}`}
                              title={c.status === 'active' ? 'Pause' : 'Resume'}
                            >
                              {c.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </button>
                          )}
                          <button
                            onClick={() => deleteCampaign(c.id)}
                            className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Showing {(page - 1) * ITEMS_PER_PAGE + 1} to {Math.min(page * ITEMS_PER_PAGE, filteredCampaigns.length)} of {filteredCampaigns.length} campaigns
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${page === i + 1 ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800">Create New Campaign</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-md hover:bg-gray-100 transition-colors">
                <X className="w-[18px] h-[18px] text-gray-400" />
              </button>
            </div>
            <form onSubmit={submitForm} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Campaign Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  maxLength={100}
                  placeholder="Enter campaign name"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.name && <p className="text-xs text-red-600 mt-1.5">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Channel <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.channel}
                  onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="">Select a channel</option>
                  <option value="Social Media">Social Media</option>
                  <option value="SEO">SEO</option>
                  <option value="Email">Email</option>
                  <option value="Paid Media">Paid Media</option>
                  <option value="PR">PR</option>
                  <option value="Events">Events</option>
                </select>
                {errors.channel && <p className="text-xs text-red-600 mt-1.5">{errors.channel}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Budget ($) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="Min $100, Max $100,000"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {errors.budget && <p className="text-xs text-red-600 mt-1.5">{errors.budget}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {errors.startDate && <p className="text-xs text-red-600 mt-1.5">{errors.startDate}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {errors.endDate && <p className="text-xs text-red-600 mt-1.5">{errors.endDate}</p>}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Campaigns
