import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import * as math from 'mathjs'

function DerivativeGraph({ functionExpression, xMin, xMax, yMin, yMax, gridDensity }) {
  const [chartData, setChartData] = useState(null)
  const [error, setError] = useState(null)

  // Функція для обчислення похідної
  const evaluateDerivative = (x) => {
    try {
      const derivative = math.derivative(functionExpression, 'x')
      const scope = { x }
      const result = derivative.evaluate(scope)
      
      if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
        return result
      }
      return null
    } catch (err) {
      return null
    }
  }

  // Генеруємо дані для графіка похідної
  useEffect(() => {
    try {
      setError(null)
      
      const step = (xMax - xMin) / gridDensity
      const xValues = []
      const yValues = []
      
      for (let x = xMin; x <= xMax; x += step) {
        const y = evaluateDerivative(x)
        if (y !== null && y >= yMin && y <= yMax) {
          xValues.push(x)
          yValues.push(y)
        }
      }

      if (xValues.length === 0) {
        setError('Похідна не має значень у вказаному діапазоні')
        setChartData(null)
        return
      }

      setChartData({
        labels: xValues,
        datasets: [
          {
            label: `f'(x) = ${math.derivative(functionExpression, 'x').toString()}`,
            data: yValues,
            borderColor: 'rgb(220, 38, 127)',
            backgroundColor: 'rgba(220, 38, 127, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.1,
            pointRadius: 0,
            pointHoverRadius: 4,
          },
        ],
      })
    } catch (err) {
      setError('Помилка при обчисленні похідної. Перевірте синтаксис функції.')
      setChartData(null)
    }
  }, [functionExpression, xMin, xMax, yMin, yMax, gridDensity])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#374151',
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          title: (context) => `x = ${context[0].parsed.x.toFixed(3)}`,
          label: (context) => `f'(x) = ${context.parsed.y.toFixed(3)}`,
        },
      },
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'x',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#6B7280',
        },
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: "f'(x)",
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#6B7280',
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Графік похідної функції
        </h3>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
      </div>
      
      <div className="relative" style={{ height: '500px' }}>
        {chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <p className="text-gray-500 text-lg">Введіть функцію для побудови графіка похідної</p>
              <p className="text-gray-400 text-sm mt-2">
                Похідна буде обчислена автоматично
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DerivativeGraph 