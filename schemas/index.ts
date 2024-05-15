import * as z from 'zod';

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: 'Minimum 6 characters length'
    })
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    })
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    }),
    password: z.string().min(1, {
        message: 'Password is required'
    }),
    code: z.optional(z.string())
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'Email is required'
    }),
    password: z.string().min(6, {
        message: 'Minimum 6 characters length'
    }),
    name: z.string().min(1, {
        message: 'Name is required'
    })
});

export const ArticleSchema = z.object({
    title: z.string().min(3, {
        message: 'Minimum 3 characters length'
    }),
    content: z.string().min(10, {
        message: 'Minimum 10 characters length'
    }),
    image: z.optional(z.any()),
    authorId: z.string().cuid({
        message: 'User is required'
    })
})
