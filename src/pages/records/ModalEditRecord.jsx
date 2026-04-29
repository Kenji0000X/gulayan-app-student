import { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import InputPriceField from '../../components/InputPriceField'

function ModalEditRecord({ isOpen, onClose, onSubmit, data }) {
  const [formData, setFormData] = useState(data || {})
  const [errors, setErrors] = useState({})
  const plantVarieties = [
    "Vegetables",
    "Leafy Greens",
    "Root Crops",
    "Herbs",
    "Fruits",
    "Legumes",
    "Spices",
    "Mushrooms",
    "Ornamentals",
    "Medicinal Plants",
    "Vines",
    "Fruit Trees",
    "Other",
    "Unknown",
  ];

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name?.trim()) newErrors.name = 'Plant name is required'
    if (!formData.variety?.trim()) newErrors.variety = 'Variety is required'
    if (!formData.seedling_count || formData.seedling_count < 1) newErrors.seedling_count = 'Valid count required'
    if (!formData.date_planted) newErrors.date_planted = 'Date planted is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleClose = () => {
    setFormData({})
    setErrors({})
    onClose()
  }

  useEffect(() => {
    setFormData(data || {})
  }, [data])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Update Plant Record</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100" aria-label="Close">
            <FaTimes size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plant Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all ${
                  errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter plant name"
                required
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Variety <span className="text-red-500">*</span>
              </label>
              <select
                name="variety"
                value={formData.variety || ''}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all ${
                  errors.variety ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                required
              >
                <option value="">Select variety</option>
                {plantVarieties.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
              {errors.variety && <p className="mt-1 text-sm text-red-600">{errors.variety}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Batch Name</label>
              <input
                name="batch_name"
                value={formData.batch_name || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="Enter batch name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seedling Source
              </label>
              <input
                name="seedling_source"
                value={formData.seedling_source || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="Enter seedling source"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seedling Count <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="seedling_count"
                value={formData.seedling_count || ''}
                onChange={handleChange}
                min="1"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all ${
                  errors.seedling_count ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter count"
                required
              />
              {errors.seedling_count && <p className="mt-1 text-sm text-red-600">{errors.seedling_count}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Starting Fund
              </label>
              <InputPriceField
                formData={formData}
                setFormData={setFormData}
                name="starting_fund"
                placeholder="Enter starting fund"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Planted <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date_planted"
                value={formData.date_planted || ''}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all ${
                  errors.date_planted ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                required
              />
              {errors.date_planted && <p className="mt-1 text-sm text-red-600">{errors.date_planted}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                name="notes"
                value={formData.notes || ''}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-vertical"
                placeholder="Additional notes..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!validateForm()}
              className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed font-medium transition-colors"
            >
              Update Plant
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalEditRecord;

