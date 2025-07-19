import React, { useEffect, useState } from 'react'
import * as math from 'mathjs'

function ValueTable({ functionExpression, xMin, xMax }) {
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)

  // Функція для обчислення значень функції
  const evaluateFunction = (x) => {
    try {
      let expression = functionExpression
        .replace(/sin/g, 'sin')
        .replace(/cos/g, 'cos')
        .replace(/tan/g, 'tan')
        .replace(/log/g, 'log')
        .replace(/ln/g, 'log')
        .replace(/sqrt/g, 'sqrt')
        .replace(/abs/g, 'abs')
        .replace(/exp/g, 'exp')
        .replace(/pi/g, 'pi')
        .replace(/e/g, 'e')

      const scope = { x }
      const result = math.evaluate(expression, scope)
      
      if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
        return result
      }
      return null
    } catch (err) {
      return null
    }
  }

  // Генеруємо таблицю значень
  useEffect(() => {
    if (!functionExpression) {
      setTableData([])
      return
    }

    setLoading(true)
    
    try {
      const step = (xMax - xMin) / 20 // 20 точок для таблиці
      const data = []
      
      for (let x = xMin; x <= xMax; x += step) {
        const y = evaluateFunction(x)
        if (y !== null) {
          data.push({
            x: x.toFixed(3),
            y: y.toFixed(4),
            originalX: x,
            originalY: y
          })
        }
      }

      setTableData(data)
    } catch (error) {
      setTableData([])
    } finally {
      setLoading(false)
    }
  }, [functionExpression, xMin, xMax])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Обчислюю значення...</p>
        </div>
      </div>
    )
  }

  if (!functionExpression) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Введіть функцію для створення таблиці</p>
        </div>
      </div>
    )
  }

  if (tableData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Не вдалося обчислити значення функції</p>
          <p className="text-gray-400 text-sm mt-2">Перевірте синтаксис функції</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Таблиця значень функції
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          f(x) = {functionExpression} для x ∈ [{xMin}, {xMax}]
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left font-medium text-gray-700 text-xs sm:text-sm">
                x
              </th>
              <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left font-medium text-gray-700 text-xs sm:text-sm">
                f(x)
              </th>
              <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left font-medium text-gray-700 text-xs sm:text-sm hidden sm:table-cell">
                Точка
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr 
                key={index} 
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="border border-gray-300 px-2 sm:px-4 py-2 font-mono text-xs sm:text-sm">
                  {row.x}
                </td>
                <td className="border border-gray-300 px-2 sm:px-4 py-2 font-mono text-xs sm:text-sm">
                  {row.y}
                </td>
                <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm text-gray-600 hidden sm:table-cell">
                  ({row.x}, {row.y})
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-sm text-blue-700">
          <div className="font-medium mb-2">Статистика:</div>
          <div>• Кількість точок: {tableData.length}</div>
          <div>• Мінімальне значення: {Math.min(...tableData.map(d => d.originalY)).toFixed(4)}</div>
          <div>• Максимальне значення: {Math.max(...tableData.map(d => d.originalY)).toFixed(4)}</div>
          <div>• Середнє значення: {(tableData.reduce((sum, d) => sum + d.originalY, 0) / tableData.length).toFixed(4)}</div>
        </div>
      </div>
    </div>
  )
}

export default ValueTable 