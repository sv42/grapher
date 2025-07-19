import React, { useEffect, useState } from 'react'
import * as math from 'mathjs'

function FunctionAnalysis({ functionExpression, xMin, xMax }) {
  const [analysis, setAnalysis] = useState(null)
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

  // Аналіз функції
  useEffect(() => {
    if (!functionExpression) return

    setLoading(true)
    
    try {
      const step = (xMax - xMin) / 1000
      const points = []
      const zeros = []
      const extrema = []
      let minValue = Infinity
      let maxValue = -Infinity
      let minX = null
      let maxX = null

      // Збираємо точки та знаходимо екстремуми
      for (let x = xMin; x <= xMax; x += step) {
        const y = evaluateFunction(x)
        if (y !== null) {
          points.push({ x, y })
          
          // Знаходимо мінімум та максимум
          if (y < minValue) {
            minValue = y
            minX = x
          }
          if (y > maxValue) {
            maxValue = y
            maxX = x
          }
        }
      }

      // Знаходимо нулі функції (перетин з віссю OX)
      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i]
        const p2 = points[i + 1]
        
        if ((p1.y <= 0 && p2.y >= 0) || (p1.y >= 0 && p2.y <= 0)) {
          const zeroX = p1.x + (p2.x - p1.x) * Math.abs(p1.y) / Math.abs(p2.y - p1.y)
          zeros.push(zeroX)
        }
      }

      // Знаходимо екстремуми (де похідна = 0)
      for (let i = 0; i < points.length - 1; i++) {
        const x = points[i].x
        const derivative = evaluateDerivative(x)
        
        if (derivative !== null && Math.abs(derivative) < 0.1) {
          const y = evaluateFunction(x)
          if (y !== null) {
            extrema.push({ x, y })
          }
        }
      }

      // Визначаємо область визначення
      const domain = points.length > 0 ? `[${xMin.toFixed(2)}, ${xMax.toFixed(2)}]` : 'Не визначена'
      
      // Визначаємо область значень
      const range = points.length > 0 ? `[${minValue.toFixed(2)}, ${maxValue.toFixed(2)}]` : 'Не визначена'

      setAnalysis({
        domain,
        range,
        zeros: zeros.slice(0, 5), // Перші 5 нулів
        extrema: extrema.slice(0, 5), // Перші 5 екстремумів
        minValue: minValue !== Infinity ? minValue.toFixed(4) : 'Не знайдено',
        maxValue: maxValue !== -Infinity ? maxValue.toFixed(4) : 'Не знайдено',
        minX: minX !== null ? minX.toFixed(4) : 'Не знайдено',
        maxX: maxX !== null ? maxX.toFixed(4) : 'Не знайдено',
        totalPoints: points.length
      })
    } catch (error) {
      setAnalysis(null)
    } finally {
      setLoading(false)
    }
  }, [functionExpression, xMin, xMax])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Аналізую функцію...</p>
        </div>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Введіть функцію для аналізу</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Основні властивості */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 border-b pb-2">
            Основні властивості
          </h3>
          
          <div className="space-y-2 sm:space-y-3">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-gray-600 text-sm sm:text-base">Область визначення:</span>
              <span className="font-medium text-sm sm:text-base">{analysis.domain}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-gray-600 text-sm sm:text-base">Область значень:</span>
              <span className="font-medium text-sm sm:text-base">{analysis.range}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-gray-600 text-sm sm:text-base">Кількість точок:</span>
              <span className="font-medium text-sm sm:text-base">{analysis.totalPoints}</span>
            </div>
          </div>
        </div>

        {/* Екстремуми */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 border-b pb-2">
            Екстремуми
          </h3>
          
          <div className="space-y-2 sm:space-y-3">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-gray-600 text-sm sm:text-base">Мінімум:</span>
              <span className="font-medium text-sm sm:text-base">f({analysis.minX}) = {analysis.minValue}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-gray-600 text-sm sm:text-base">Максимум:</span>
              <span className="font-medium text-sm sm:text-base">f({analysis.maxX}) = {analysis.maxValue}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Нулі функції */}
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 border-b pb-2">
          Нулі функції (f(x) = 0)
        </h3>
        
        {analysis.zeros.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
            {analysis.zeros.map((zero, index) => (
              <div key={index} className="bg-blue-50 p-2 sm:p-3 rounded-lg text-center">
                <div className="text-xs sm:text-sm text-gray-600">x{index + 1}</div>
                <div className="font-medium text-blue-700 text-sm sm:text-base">{zero.toFixed(3)}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm sm:text-base">Нулі не знайдено в заданому діапазоні</p>
        )}
      </div>

      {/* Критичні точки */}
      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 border-b pb-2">
          Критичні точки (f'(x) ≈ 0)
        </h3>
        
        {analysis.extrema.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
            {analysis.extrema.map((point, index) => (
              <div key={index} className="bg-green-50 p-2 sm:p-3 rounded-lg">
                <div className="text-xs sm:text-sm text-gray-600">Точка {index + 1}</div>
                <div className="font-medium text-green-700 text-sm sm:text-base">
                  ({point.x.toFixed(3)}, {point.y.toFixed(3)})
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm sm:text-base">Критичні точки не знайдено в заданому діапазоні</p>
        )}
      </div>
    </div>
  )
}

export default FunctionAnalysis 