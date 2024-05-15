import HeaderLayout from "@/components/layout/header";
import {auth, signOut} from '@/auth'

export default async function Layout({ children }: { children: React.ReactNode }) {
    // TODO: show header links depending on session
    const session = await auth();
    const handleSignOut = async () => {
        'use server';
        await signOut();
    };
    return (
        <div>
            <HeaderLayout isLogged={!!session} handleSignOut={handleSignOut} />
            {children}
        </div>
    )
}
