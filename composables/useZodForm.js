import { ref, reactive, computed } from 'vue'
import { z } from 'zod'

export function useZodForm(schema, initialValues = {}) {
  // Form values
  const values = ref(reactive({ ...initialValues }))

  // Form errors
  const errors = ref({})

  // Validation state
  const isValidating = ref(false)
  const hasBeenSubmitted = ref(false)

  // Check if form is valid
  const isValid = computed(() => {
    try {
      schema.parse(values.value)
      return true
    } catch {
      return false
    }
  })

  // Validate entire form
  const validate = () => {
    isValidating.value = true
    errors.value = {}

    try {
      schema.parse(values.value)
      isValidating.value = false
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {}
        
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            const field = err.path[0]
            newErrors[field] = err.message
          }
        })
        
        errors.value = newErrors
      }
      isValidating.value = false
      return false
    }
  }

  // Validate single field
  const validateField = (fieldName) => {
    try {
      const fieldSchema = schema.shape[fieldName]
      if (fieldSchema) {
        fieldSchema.parse(values.value[fieldName])
        // Clear error for this field
        if (errors.value[fieldName]) {
          const newErrors = { ...errors.value }
          delete newErrors[fieldName]
          errors.value = newErrors
        }
        return true
      }
      return false
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors.value = {
          ...errors.value,
          [fieldName]: error.errors[0]?.message || 'Invalid value'
        }
      }
      return false
    }
  }

  // Reset form
  const reset = () => {
    values.value = reactive({ ...initialValues })
    errors.value = {}
    hasBeenSubmitted.value = false
    isValidating.value = false
  }

  // Clear errors
  const clearErrors = () => {
    errors.value = {}
  }

  // Clear specific field error
  const clearFieldError = (fieldName) => {
    if (errors.value[fieldName]) {
      const newErrors = { ...errors.value }
      delete newErrors[fieldName]
      errors.value = newErrors
    }
  }

  // Mark as submitted
  const markAsSubmitted = () => {
    hasBeenSubmitted.value = true
  }

  // Get field error
  const getFieldError = (fieldName) => {
    return errors.value[fieldName]
  }

  // Check if field has error
  const hasFieldError = (fieldName) => {
    return Boolean(errors.value[fieldName])
  }

  return {
    values,
    errors,
    isValid,
    isValidating,
    hasBeenSubmitted,
    validate,
    validateField,
    reset,
    clearErrors,
    clearFieldError,
    markAsSubmitted,
    getFieldError,
    hasFieldError
  }
}