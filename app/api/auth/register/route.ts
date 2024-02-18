import {z} from 'zod';
import {NextResponse} from "next/server";
import { hash } from 'bcrypt';
import { sql } from '@vercel/postgres';

const UserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    name: z.string().min(3)
}).refine(user => user.password === user.confirmPassword, {
    message: "Passwords don't match"
})

export async function POST(request: Request) {
    try {
        const {email, password, confirmPassword, name} = await request.json();
        const validatedUser = UserSchema.safeParse({
            email,
            password,
            confirmPassword,
            name
        });
        if (!validatedUser.success) {
            return NextResponse.json({
                errors: validatedUser.error.flatten().fieldErrors,
                message: 'Validation error on registration'
            })
        }
        const hashedPassword = await hash(password, 10);
        await sql`
            INSERT INTO users (email, name, password)
            VALUES (${email}, ${name}, ${hashedPassword})
        `;
    } catch (e) {
        console.log(e);
    }

    return NextResponse.json({ message: 'success' });
}
