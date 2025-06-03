import { ref, computed, watch } from "vue"
import type { z } from "zod"

export function useZodForm<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>,
  initialData: Record<string, any>
) {
  const values = ref({ ...initialData })
  const errors = ref<Record<keyof T, string | undefined>>({} as any)

  const isValid = ref(false)

  const validate = () => {
    const result = schema.safeParse(values.value)

    if (!result.success) {
      const formatted = result.error.format()
      for (const key in formatted) {
        const issue = formatted[key as keyof typeof formatted]
        // @ts-ignore
        errors.value[key] = issue?._errors?.[0]
      }
      isValid.value = false
      return false
    } else {
      errors.value = {} as any
      isValid.value = true
      return true
    }
  }

  // validate whenever input changes
  watch(values, validate, { deep: true, immediate: true })

  return {
    values,
    errors,
    isValid,
    validate,
  }
}
