import { db } from '@/lib/db';

export const getTwoFactorConfirmationByUserId = (userId: string) => {
    try {
        return db.twoFactorConfirmation.findUnique({
            where: { userId }
        })
    } catch {
        return null;
    }
}
