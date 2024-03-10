'use server';

import {z} from 'zod';
import {sql} from '@vercel/postgres';
import {put} from '@vercel/blob';
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import { Topic } from "@/app/lib/defenitions";

// article schema
const FormSchema = z.object({
    id: z.string(),
    userId: z.string(),
    title: z.string().refine(data => !!data, {
        message: 'Title is required',
    }),
    content: z.string().refine(data => !!data, {
        message: 'Content is required',
    }),
    date: z.string(),
    imageUrl: z.string()
});

// topic scheme
const TopicSchema = z.object({
    id: z.string(),
    name: z.string()
});

const CreateArticle = FormSchema.omit({ id: true, date: true, imageUrl: true });
const CreateTopic = TopicSchema.omit({id: true});
export type State = {
    errors?: {
        userId?: string[];
        title?: string[];
        content?: string[];
    };
    message?: string | null;
}

export type TopicState = {
    errors?: {
        name?: string[]
    };
    message?: string | null;
}

export async function uploadImage(imageFile: File) {
    return await put(imageFile.name, imageFile, {
        access: 'public'
    });
}

export async function createArticle(topics: Topic[], prevState: State, formData: FormData)  {
    const validatedFields = CreateArticle.safeParse({
        // TODO: take id from authenticated user
        userId: '410544b2-4001-4271-9855-fec4b6a6442a',
        title: formData.get('title'),
        content: formData.get('content')
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Article.'
        }
    }
    const { userId, title, content} = validatedFields.data;
    const date = new Date().toISOString().split('T')[0];
    try {
        // TODO: read how to get images from Blob Store
        const uploadedImage = await uploadImage(formData.get('image') as File);
        const insertedArticle = await sql`
            INSERT INTO articles (user_id, title, content, date, image_url)
            VALUES (${userId}, ${title}, ${content}, ${date}, ${uploadedImage.url})
            RETURNING id
        `;
        const insertedArticleId = insertedArticle.rows[0].id;
        if (topics.length) {
            for(const { name } of topics) {
                const insertedTopic = await sql`
                    INSERT INTO topics (name)
                    VALUES (${name})
                    RETURNING id
                `;
                const topicId = insertedTopic.rows[0].id;
                await sql`
                    INSERT INTO articles_topics (article_id, topic_id)
                    VALUES (${insertedArticleId}, ${topicId})
                `;
            }

        }
    } catch (error) {
        console.log(error)
        return {
            message: 'Database Error: Failed to Create Article.'
        }
    }
    revalidatePath('/articles');
    redirect('/articles');
}

export async function createTopic(prevState: TopicState, formData: FormData) {
    const validatedFields = CreateTopic.safeParse({
        name: formData.get('topic')
    });
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Topic name is required.'
        }
    }
    const { name } = validatedFields.data;
    try {
        await sql`
            INSERT INTO topics (name)
            VALUES (${name})
        `;
    } catch (error) {
        console.log(error)
        return {
            message: 'Database Error: Failed to Create Topic.'
        }
    }
    // TODO: understand do I need revalidatePath here or not ??
}
