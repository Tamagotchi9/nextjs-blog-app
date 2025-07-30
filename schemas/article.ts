import { z } from 'zod'

export const ArticleFormSchema = z.object({
    title: z.string().min(3, {
        message: 'at least 3 characters'
    }),
    content: z.string().min(5, {
        message: 'at least 5 characters'
    }),
    imageUrl: z.string().optional()
})