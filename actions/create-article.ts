"use server";

import { z } from "zod";
import { ArticleSchema } from "@/schemas";
import {db} from "@/lib/db";
import {put} from "@vercel/blob";

export const createArticle = async (values: z.infer<typeof ArticleSchema>, formData: FormData) => {
    const validatedFields = ArticleSchema.safeParse(values);
    const imageFile = formData.get('image') as File;
    if (!validatedFields.success) {
        return { error: 'Fields validation failed!' }
    }
    const { title, content, authorId } = validatedFields.data;

    let uploadedImage
    if (imageFile) {
        uploadedImage = await uploadImage(imageFile);
    }

    await db.article.create({
        data: {
            title,
            content,
            imageUrl: uploadedImage?.url,
            authorId
        }
    })
    return { success: 'Post created' }
}

export const uploadImage = async (imageFile: File) => {
    return await put(imageFile.name, imageFile, {
        access: 'public'
    });
}
