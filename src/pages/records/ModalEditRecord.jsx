import { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import InputPriceField from '../../components/InputPriceField'

function ModalEditRecord({ isOpen, onClose, onSubmit, data }) {
  const [formData, setFormData] = useState(data)
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
    onSubmit(formData)
    setFormData({
      name: '',
      variety: '',
      notes: '',
      date_planted: '',
      seedling_count: '',
      batch_name: '',
      starting_fund: '',
      supplier: ''
    })
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
      supplier: ''
    })
    onClose()
  }

  useEffect( () => {
    setFormData(data);
  }, [data])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
          {/* TODO create modal for updating new record. */}
      </div>
    </div>
  )
}

export default ModalEditRecord;
