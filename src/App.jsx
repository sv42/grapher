import React, { useState, useEffect } from 'react'
import FunctionGrapher from './components/FunctionGrapher'
import Header from './components/Header'
import Examples from './components/Examples'
import TabPanel from './components/TabPanel'
import FunctionAnalysis from './components/FunctionAnalysis'
import DerivativeGraph from './components/DerivativeGraph'
import IntegralGraph from './components/IntegralGraph'
import ValueTable from './components/ValueTable'

function App() {
  const [functionExpression, setFunctionExpression] = useState('x^2')
  const [xMin, setXMin] = useState(-10)
  const [xMax, setXMax] = useState(10)
  const [yMin, setYMin] = useState(-10)
  const [yMax, setYMax] = useState(10)
  const [gridDensity, setGridDensity] = useState(100)
  const [activeTab, setActiveTab] = useState('graph')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-4 sm:py-8">
        <div className="grid lg:grid-cols-3 gap-4 lg:gap-8">
          {/* Панель керування */}
          <div className="lg:col-span-1 space-y-4 lg:space-y-6 order-2 lg:order-1">
            <div className="card">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Налаштування графіка</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Функція f(x) =
                  </label>
                  <input
                    type="text"
                    value={functionExpression}
                    onChange={(e) => setFunctionExpression(e.target.value)}
                    placeholder="x^2, sin(x), 2*x + 1"
                    className="input-field"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      X min
                    </label>
                    <input
                      type="number"
                      value={xMin}
                      onChange={(e) => setXMin(parseFloat(e.target.value))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      X max
                    </label>
                    <input
                      type="number"
                      value={xMax}
                      onChange={(e) => setXMax(parseFloat(e.target.value))}
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Y min
                    </label>
                    <input
                      type="number"
                      value={yMin}
                      onChange={(e) => setYMin(parseFloat(e.target.value))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Y max
                    </label>
                    <input
                      type="number"
                      value={yMax}
                      onChange={(e) => setYMax(parseFloat(e.target.value))}
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Щільність сітки: {gridDensity}
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    value={gridDensity}
                    onChange={(e) => setGridDensity(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <button
                  onClick={() => {
                    setXMin(-10)
                    setXMax(10)
                    setYMin(-10)
                    setYMax(10)
                    setFunctionExpression('x^2')
                  }}
                  className="btn-secondary w-full"
                >
                  Скинути налаштування
                </button>
              </div>
            </div>

            <Examples onSelectExample={setFunctionExpression} />
          </div>

          {/* Графік та аналіз */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="card">
              <TabPanel activeTab={activeTab} onTabChange={setActiveTab}>
                {activeTab === 'graph' && (
                  <FunctionGrapher
                    functionExpression={functionExpression}
                    xMin={xMin}
                    xMax={xMax}
                    yMin={yMin}
                    yMax={yMax}
                    gridDensity={gridDensity}
                  />
                )}
                
                {activeTab === 'analysis' && (
                  <FunctionAnalysis
                    functionExpression={functionExpression}
                    xMin={xMin}
                    xMax={xMax}
                  />
                )}
                
                {activeTab === 'derivative' && (
                  <DerivativeGraph
                    functionExpression={functionExpression}
                    xMin={xMin}
                    xMax={xMax}
                    yMin={yMin}
                    yMax={yMax}
                    gridDensity={gridDensity}
                  />
                )}
                
                {activeTab === 'integral' && (
                  <IntegralGraph
                    functionExpression={functionExpression}
                    xMin={xMin}
                    xMax={xMax}
                    yMin={yMin}
                    yMax={yMax}
                    gridDensity={gridDensity}
                  />
                )}
                
                {activeTab === 'table' && (
                  <ValueTable
                    functionExpression={functionExpression}
                    xMin={xMin}
                    xMax={xMax}
                  />
                )}
              </TabPanel>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600">
            © 2024 Function Grapher. Створено з React та Chart.js
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App 