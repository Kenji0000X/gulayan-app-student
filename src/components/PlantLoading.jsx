import { FaSeedling } from 'react-icons/fa'

/**
 * PlantLoading Component
 * A themed loading indicator for plant-related operations
 * 
 * @param {string} size - Size variant: 'small', 'medium', 'large' (default: 'medium')
 * @param {string} text - Optional loading text to display
 * @param {string} variant - Style variant: 'spinner', 'pulse', 'bounce' (default: 'spinner')
 */
export default function PlantLoading({ 
  size = 'medium', 
  text = '', 
  variant = 'spinner' 
}) {
  // Size configurations
  const sizeClasses = {
    small: 'w-4 h-4 text-sm',
    medium: 'w-6 h-6 text-base',
    large: 'w-12 h-12 text-2xl',
    xl: 'w-16 h-16 text-3xl',
    '2xl': 'w-20 h-20 text-4xl',
    '3xl': 'w-24 h-24 text-5xl',
    '4xl': 'w-32 h-32 text-6xl',
    '5xl': 'w-40 h-40 text-7xl',
    '6xl': 'w-48 h-48 text-8xl',
  }

  const textSizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
    '9xl': 'text-9xl',
  }

  // Spinner variant - rotating seedling
  if (variant === 'spinner') {
    return (
      <div className="flex items-center justify-center gap-2">
        <FaSeedling 
          className={`${sizeClasses[size]} text-green-600 animate-spin`}
        />
        {text && (
          <span className={`${textSizeClasses[size]} text-gray-600 font-medium`}>
            {text}
          </span>
        )}
      </div>
    )
  }

  // Pulse variant - pulsing seedling
  if (variant === 'pulse') {
    return (
      <div className="flex items-center justify-center gap-2">
        <FaSeedling 
          className={`${sizeClasses[size]} text-green-600 animate-pulse`}
        />
        {text && (
          <span className={`${textSizeClasses[size]} text-gray-600 font-medium animate-pulse`}>
            {text}
          </span>
        )}
      </div>
    )
  }

  // Bounce variant - bouncing seedling
  if (variant === 'bounce') {
    return (
      <div className="flex items-center justify-center gap-2">
        <FaSeedling 
          className={`${sizeClasses[size]} text-green-600 animate-bounce`}
        />
        {text && (
          <span className={`${textSizeClasses[size]} text-gray-600 font-medium`}>
            {text}
          </span>
        )}
      </div>
    )
  }

  return null
}

/**
 * ButtonLoading Component
 * Specialized loading state for buttons
 * 
 * @param {string} text - Button text while loading (default: 'Saving...')
 * @param {boolean} disabled - Whether button should be disabled
 */
export function ButtonLoading({ text = 'Saving...', disabled = true }) {
  return (
    <button
      type="button"
      disabled={disabled}
      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg opacity-75 
        cursor-not-allowed flex items-center justify-center gap-2"
    >
      <FaSeedling className="w-4 h-4 animate-spin" />
      <span>{text}</span>
    </button>
  )
}

/**
 * FullPageLoading Component
 * Full-screen loading overlay for large operations
 * 
 * @param {string} message - Loading message to display
 */
export function FullPageLoading({ message = 'Loading...' }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center gap-4">
        <FaSeedling className="w-16 h-16 text-green-600 animate-spin" />
        <p className="text-lg font-medium text-gray-800">{message}</p>
      </div>
    </div>
  )
}

/**
 * InlineLoading Component
 * Compact loading indicator for inline use
 * 
 * @param {string} text - Optional text to display
 */
export function InlineLoading({ text = '' }) {
  return (
    <div className="flex items-center gap-2 text-green-600">
      <FaSeedling className="w-4 h-4 animate-spin" />
      {text && <span className="text-sm">{text}</span>}
    </div>
  )
}
