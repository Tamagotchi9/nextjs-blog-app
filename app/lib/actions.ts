'use server';

import {z} from 'zod';
import {sql} from '@vercel/postgres';
import {put} from '@vercel/blob';
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

const FormSchema = z.object({
    id: z.string(),
    userId: z.string(),
    title: z.string(),
    content: z.string(),
    date: z.string(),
    imageUrl: z.string()
})

const CreateArticle = FormSchema.omit({ id: true, date: true, imageUrl: true });

export type State = {
    errors?: {
        userId?: string[];
        title?: string[];
        content?: string[];
    };
    message?: string | null;
}

export async function uploadImage(imageFile: File) {
    return await put(imageFile.name, imageFile, {
        access: 'public'
    });
}

export async function createArticle(prevState: State, formData: FormData)  {
    const validatedFields = CreateArticle.safeParse({
        // TODO: take id from authenticated user
        userId: '410544b2-4001-4271-9855-fec4b6a6442a',
        title: formData.get('title'),
        content: formData.get('content'),
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Article.'
        }
    }
    const { userId, title, content } = validatedFields.data;
    const date = new Date().toISOString().split('T')[0];
    try {
        // TODO: read how to get images from Blob Store
        const uploadedImage = await uploadImage(formData.get('image') as File);
        await sql`
            INSERT INTO articles (user_id, title, content, date, image_url)
            VALUES (${userId}, ${title}, ${content}, ${date}, ${uploadedImage.url})
        `;
    } catch (error) {
        console.log(error)
        return {
            message: 'Database Error: Failed to Create Article.'
        }
    }
    revalidatePath('/articles');
    redirect('/articles');
}