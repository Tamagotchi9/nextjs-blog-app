import { Container } from '@chakra-ui/react';
import {getServerSession} from "next-auth";
import HeaderLayout from "@/app/ui/layout/header";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession();
    return (
        <div>
            <HeaderLayout isLogged={!!session} />
            <Container maxW='4xl'>{children}</Container>
        </div>
    )
}
