import { z } from "zod"

export const personFormSchema = z.object({
  id:z.number(),
  name: z
    .string()
    .nonempty('O Nome é obrigatório')
    .min(4, 'Nome precisa de no mínimo 4 letras')
    .regex(/^[a-zA-ZÀ-ÿ\s']+$/, 'Nome inválido'),
  email: z
    .string()
    .nonempty('O e-mail é obrigatório')
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'E-mail inválido'
    ),
  phone: z
    .string()
    .nonempty('O telefone é obrigatório')
    .regex(
      /^(?:\(\d{2}\)\s?)?(?:9\s?)?(\d{4,5}-\d{4})$/,
      'Verefique se o numero está correto'
    )
})
