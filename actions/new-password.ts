'use server';

import {z} from "zod";
import {NewPasswordSchema} from "@/schemas";
import bcrypt from "bcryptjs";
import {getPasswordResetTokenByToken} from "@/data/password-reset-token";
import {db} from "@/lib/db";
import {getUserByEmail} from "@/data/user";

export const setNewPassword = async (values: z.infer<typeof NewPasswordSchema>, token?: string | null) => {
    if (!token) return { error: 'Missing token!' };

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) return { error: 'Invalid fields!' };

    const { password } = validatedFields.data;

    const resetToken = await getPasswordResetTokenByToken(token);

    if (!resetToken) return { error: 'Invalid token' };

    const hasExpired = new Date(resetToken.expires) < new Date();

    if (hasExpired) return { error: 'Token has expired!' };

    const existingUser = await getUserByEmail(resetToken.email);

    if (!existingUser) return { error: 'Email does not exist!' };

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            password: hashedPassword
        }
    })
    await db.passwordResetToken.delete({
        where: { id: resetToken.id }
    })

    return { success: 'Password updated!' };
}
