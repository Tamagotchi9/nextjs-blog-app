'use server';

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { db } from '@/lib/db';
import bcrypt from 'bcrypt'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Fields error' }
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.user.findUnique({
        where: {
            email
        }
    })

    if (existingUser) {
        return { error: 'Email already in use' }
    }

    await db.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        },
    });

    return { success: 'User created!' }
}
