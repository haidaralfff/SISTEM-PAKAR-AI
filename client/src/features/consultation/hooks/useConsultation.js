import { useMutation } from '@tanstack/react-query'
import { submitConsultation } from '../api'

export const useSubmitConsultation = () => {
  return useMutation({
    mutationFn: submitConsultation,
  })
}
