import React from 'react'
import { BarChart3, Calculator, TrendingUp, AreaChart, Table } from 'lucide-react'

function TabPanel({ activeTab, onTabChange, children }) {
  const tabs = [
    { id: 'graph', label: 'Графік', icon: BarChart3 },
    { id: 'analysis', label: 'Аналіз', icon: Calculator },
    { id: 'derivative', label: 'Похідна', icon: TrendingUp },
    { id: 'integral', label: 'Інтеграл', icon: AreaChart },
    { id: 'table', label: 'Таблиця', icon: Table },
  ]

  return (
    <div className="w-full">
      {/* Вкладки */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Контент вкладок */}
      <div className="min-h-[500px]">
        {children}
      </div>
    </div>
  )
}

export default TabPanel 