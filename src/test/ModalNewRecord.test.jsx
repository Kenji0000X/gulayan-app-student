import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ModalNewRecord from '../pages/records/ModalNewRecord'

// Mock the InputPriceField component
vi.mock('../../components/InputPriceField', () => ({
  default: ({ id, name, placeholder, formData, setFormData, className }) => (
    <input
      type="text"
      id={id}
      name={name}
      placeholder={placeholder}
      value={formData[name] || ''}
      onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
      className={className}
      data-testid={id}
    />
  )
}))

describe('ModalNewRecord', () => {
  const mockOnClose = vi.fn()
  const mockOnSubmit = vi.fn()

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    onSubmit: mockOnSubmit
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should not render when isOpen is false', () => {
      const { container } = render(
        <ModalNewRecord {...defaultProps} isOpen={false} />
      )
      expect(container.firstChild).toBeNull()
    })

    it('should render modal when isOpen is true', () => {
      render(<ModalNewRecord {...defaultProps} />)
      expect(screen.getByText('Add New Plant')).toBeInTheDocument()
    })

    it('should render all form fields', () => {
      render(<ModalNewRecord {...defaultProps} />)
      
      expect(screen.getByRole('textbox', { name: /^Name/i })).toBeInTheDocument()
      expect(screen.getByLabelText(/Variety/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Notes/i)).toBeInTheDocument()
      expect(screen.getByRole('textbox', { name: /Batch Name/i })).toBeInTheDocument()
      expect(screen.getByRole('textbox', { name: /Seedling Count/i })).toBeInTheDocument()
      expect(screen.getByRole('textbox', { name: /Seedling Source/i })).toBeInTheDocument()
      expect(screen.getByLabelText(/Starting Fund/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Date Planted/i)).toBeInTheDocument()
    })

    it('should render all plant variety options', () => {
      render(<ModalNewRecord {...defaultProps} />)
      
      const varietySelect = screen.getByLabelText(/Variety/i)
      const options = varietySelect.querySelectorAll('option')
      
      // 14 varieties + 1 "Select variety" placeholder
      expect(options).toHaveLength(15)
      expect(options[0].textContent).toBe('Select variety')
    })

    it('should render Cancel and Add Plant buttons', () => {
      render(<ModalNewRecord {...defaultProps} />)
      
      expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Add Plant/i })).toBeInTheDocument()
    })
  })

  describe('User Interactions', () => {
    it('should update form data when user types in text inputs', async () => {
      const user = userEvent.setup()
      render(<ModalNewRecord {...defaultProps} />)
      
      const nameInput = screen.getByRole('textbox', { name: /^Name/i })
      await user.type(nameInput, 'Tomato')
      
      expect(nameInput.value).toBe('Tomato')
    })

    it('should update form data when user selects a variety', async () => {
      const user = userEvent.setup()
      render(<ModalNewRecord {...defaultProps} />)
      
      const varietySelect = screen.getByLabelText(/Variety/i)
      await user.selectOptions(varietySelect, 'Vegetables')
      
      expect(varietySelect.value).toBe('Vegetables')
    })

    it('should update form data when user types in textarea', async () => {
      const user = userEvent.setup()
      render(<ModalNewRecord {...defaultProps} />)
      
      const notesTextarea = screen.getByLabelText(/Notes/i)
      await user.type(notesTextarea, 'Test notes for plant')
      
      expect(notesTextarea.value).toBe('Test notes for plant')
    })

    it('should update form data when user selects a date', async () => {
      const user = userEvent.setup()
      render(<ModalNewRecord {...defaultProps} />)
      
      const dateInput = screen.getByLabelText(/Date Planted/i)
      await user.type(dateInput, '2026-04-25')
      
      expect(dateInput.value).toBe('2026-04-25')
    })
  })

  describe('Form Submission', () => {
    it('should call onSubmit with form data when form is submitted', async () => {
      const user = userEvent.setup()
      render(<ModalNewRecord {...defaultProps} />)
      
      // Fill in the form
      await user.type(screen.getByRole('textbox', { name: /^Name/i }), 'Lettuce')
      await user.selectOptions(screen.getByLabelText(/Variety/i), 'Leafy Greens')
      await user.type(screen.getByLabelText(/Notes/i), 'Fresh batch')
      await user.type(screen.getByRole('textbox', { name: /Batch Name/i }), 'Batch-001')
      await user.type(screen.getByRole('textbox', { name: /Seedling Count/i }), '100')
      await user.type(screen.getByRole('textbox', { name: /Seedling Source/i }), 'Local Farm')
      await user.type(screen.getByRole('textbox', { name: /Starting Fund/i }), '5000')
      await user.type(screen.getByLabelText(/Date Planted/i), '2026-04-25')
      
      // Submit the form
      const submitButton = screen.getByRole('button', { name: /Add Plant/i })
      await user.click(submitButton)
      
      expect(mockOnSubmit).toHaveBeenCalledTimes(1)
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Lettuce',
          variety: 'Leafy Greens',
          notes: 'Fresh batch',
          batch_name: 'Batch-001',
          seedling_count: '100',
          supplier: 'Local Farm',
          starting_fund: '5000',
          date_planted: '2026-04-25'
        })
      )
    })

    it('should not submit form when required fields are empty', async () => {
      const user = userEvent.setup()
      render(<ModalNewRecord {...defaultProps} />)
      
      const submitButton = screen.getByRole('button', { name: /Add Plant/i })
      await user.click(submitButton)
      
      // Form validation should prevent submission
      expect(mockOnSubmit).not.toHaveBeenCalled()
    })
  })

  describe('Modal Close Behavior', () => {
    it('should call onClose when close button is clicked', async () => {
      const user = userEvent.setup()
      render(<ModalNewRecord {...defaultProps} />)
      
      const closeButton = screen.getByRole('button', { name: '' }).querySelector('svg').parentElement
      await user.click(closeButton)
      
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('should call onClose when Cancel button is clicked', async () => {
      const user = userEvent.setup()
      render(<ModalNewRecord {...defaultProps} />)
      
      const cancelButton = screen.getByRole('button', { name: /Cancel/i })
      await user.click(cancelButton)
      
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('should reset form data when modal is closed', async () => {
      const user = userEvent.setup()
      render(<ModalNewRecord {...defaultProps} />)
      
      // Fill in some data
      const nameInput = screen.getByRole('textbox', { name: /^Name/i })
      await user.type(nameInput, 'Carrot')
      expect(nameInput.value).toBe('Carrot')
      
      // Close the modal
      const cancelButton = screen.getByRole('button', { name: /Cancel/i })
      await user.click(cancelButton)
      
      expect(mockOnClose).toHaveBeenCalled()
    })
  })

  describe('Layout and Styling', () => {
    it('should have two-column grid layout on form container', () => {
      render(<ModalNewRecord {...defaultProps} />)
      
      const formContainer = screen.getByRole('textbox', { name: /^Name/i }).closest('.grid')
      expect(formContainer).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-4')
    })

    it('should have notes field span full width', () => {
      render(<ModalNewRecord {...defaultProps} />)
      
      const notesContainer = screen.getByLabelText(/Notes/i).closest('div')
      expect(notesContainer).toHaveClass('md:col-span-2')
    })

    it('should have modal with correct max-width', () => {
      render(<ModalNewRecord {...defaultProps} />)
      
      const modal = screen.getByText('Add New Plant').closest('.bg-white')
      expect(modal).toHaveClass('max-w-4xl')
    })
  })

  describe('Accessibility', () => {
    it('should have proper labels for all form fields', () => {
      render(<ModalNewRecord {...defaultProps} />)
      
      // Check that all inputs have associated labels
      const nameInput = screen.getByRole('textbox', { name: /^Name/i })
      const varietySelect = screen.getByLabelText(/Variety/i)
      const notesTextarea = screen.getByLabelText(/Notes/i)
      const batchNameInput = screen.getByRole('textbox', { name: /Batch Name/i })
      const seedlingCountInput = screen.getByRole('textbox', { name: /Seedling Count/i })
      const seedlingSourceInput = screen.getByRole('textbox', { name: /Seedling Source/i })
      const datePlantedInput = screen.getByLabelText(/Date Planted/i)
      
      expect(nameInput).toBeInTheDocument()
      expect(varietySelect).toBeInTheDocument()
      expect(notesTextarea).toBeInTheDocument()
      expect(batchNameInput).toBeInTheDocument()
      expect(seedlingCountInput).toBeInTheDocument()
      expect(seedlingSourceInput).toBeInTheDocument()
      expect(datePlantedInput).toBeInTheDocument()
    })

    it('should mark required fields with asterisk', () => {
      render(<ModalNewRecord {...defaultProps} />)
      
      const requiredMarkers = screen.getAllByText('*')
      expect(requiredMarkers.length).toBeGreaterThan(0)
    })
  })
})
