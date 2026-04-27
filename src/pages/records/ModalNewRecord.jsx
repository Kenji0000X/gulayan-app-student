import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import InputPriceField from '../../components/InputPriceField'

function ModalNewRecord({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    variety: '',
    notes: '',
    date_planted: '',
    seedling_count: '',
    batch_name: '',
    starting_fund: '',
    seedling_source: ''
  })
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData);
    setFormData({
      name: '',
      variety: '',
      notes: '',
      date_planted: '',
      seedling_count: '',
      batch_name: '',
      starting_fund: '',
      seedling_source: ''
    });
  }

  const handleClose = () => {
    // Reset form when closing
    setFormData({
      name: '',
      variety: '',
      notes: '',
      date_planted: '',
      quantity: '',
      batch_name: '',
      starting_fund: '',
      seedling_source: ''
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* TODO create modal for adding new record. */}
      </div>
    </div>
  )
}

export default ModalNewRecord
