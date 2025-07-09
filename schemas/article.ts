import { z } from 'zod'

export const ArticleFormSchema = z.object({
    title: z.string().min(3, {
        message: 'title min 3'
    }),
    content: z.string().min(5, {
        message: 'content min 5'
    }),
    imageUrl: z.string().optional()
})