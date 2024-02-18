import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from 'zod';
import { compare } from 'bcrypt';
import { sql } from '@vercel/postgres';

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

const handler =  NextAuth({
    session: {
        strategy: 'jwt',
    },
    pages: {
      signIn: '/login'
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                try {
                    const validatedLogin = LoginSchema.safeParse({
                        email: credentials?.email,
                        password: credentials?.password
                    })
                    if (!validatedLogin.success) {
                        return Promise.reject( {
                            errors: validatedLogin.error.flatten().fieldErrors,
                            message: 'Validation error on login'
                        })
                    }
                    const response = await sql`
                    SELECT * FROM users WHERE email=${credentials?.email}`;

                    const user = response.rows[0];
                    const isPasswordCorrect = await compare(credentials?.password || '', user.password);

                    if (isPasswordCorrect) {
                        return Promise.resolve ({
                            id: user.id,
                            email: user.email
                        })
                    }
                    return null;
                } catch (e) {
                    console.log('here');
                    return Promise.reject(e);
                }
            }
        })
    ]
})

export { handler as GET, handler as POST };
