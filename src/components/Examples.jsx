import React from 'react'
import { Zap } from 'lucide-react'

function Examples({ onSelectExample }) {
  const examples = [
    { name: 'Квадратична функція', expression: 'x^2', description: 'f(x) = x²' },
    { name: 'Лінійна функція', expression: '2*x + 1', description: 'f(x) = 2x + 1' },
    { name: 'Кубічна функція', expression: 'x^3', description: 'f(x) = x³' },
    { name: 'Синус', expression: 'sin(x)', description: 'f(x) = sin(x)' },
    { name: 'Косинус', expression: 'cos(x)', description: 'f(x) = cos(x)' },
    { name: 'Експонента', expression: 'exp(x)', description: 'f(x) = eˣ' },
    { name: 'Логарифм', expression: 'log(x)', description: 'f(x) = ln(x)' },
    { name: 'Корінь квадратний', expression: 'sqrt(x)', description: 'f(x) = √x' },
    { name: 'Модуль', expression: 'abs(x)', description: 'f(x) = |x|' },
    { name: 'Гіпербола', expression: '1/x', description: 'f(x) = 1/x' },
    { name: 'Тангенс', expression: 'tan(x)', description: 'f(x) = tan(x)' },
    { name: 'Складена функція', expression: 'sin(x^2)', description: 'f(x) = sin(x²)' },
  ]

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-4">
        <Zap className="w-5 h-5 text-yellow-500" />
        <h2 className="text-xl font-bold text-gray-800">Приклади функцій</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-2">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => onSelectExample(example.expression)}
            className="text-left p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 group"
          >
            <div className="font-medium text-gray-800 group-hover:text-primary-700">
              {example.name}
            </div>
            <div className="text-sm text-gray-600 group-hover:text-primary-600">
              {example.description}
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-medium text-blue-800 mb-2">Підтримувані операції:</h3>
        <div className="text-sm text-blue-700 space-y-1">
          <div>• Основні: +, -, *, /, ^ (степінь)</div>
          <div>• Функції: sin, cos, tan, log, sqrt, abs, exp</div>
          <div>• Константи: pi, e</div>
          <div>• Дужки для групування: (2*x + 1)^2</div>
        </div>
      </div>
    </div>
  )
}

export default Examples 