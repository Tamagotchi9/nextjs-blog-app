import { db } from '@/lib/db';

export const getTwoFactorTokenByEmail = (email: string) => {
    try {
        return db.twoFactorToken.findFirst({
            where: { email }
        })
    } catch {
        return null;
    }
}

export const getTwoFactorTokenByToken = (token: string) => {
    try {
        return db.twoFactorToken.findUnique({
            where: { token }
        })
    } catch {
        return null;
    }
}
