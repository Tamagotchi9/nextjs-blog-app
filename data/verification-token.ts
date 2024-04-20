import { db } from '@/lib/db';

export const getVerificationTokenByEmail = (email: string) => {
    try {
        return db.verificationToken.findFirst({
            where: { email }
        })
    } catch {
        return null;
    }
}

export const getVerificationTokenByToken = (token: string) => {
    try {
        return db.verificationToken.findUnique({
            where: { token }
        })
    } catch {
        return null;
    }
}
