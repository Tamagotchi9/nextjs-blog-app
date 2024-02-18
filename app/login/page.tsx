import { Box, AbsoluteCenter } from "@chakra-ui/react";
import LoginForm from "@/app/ui/auth/login-form";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";

export default async function LoginPage() {
    const session = await getServerSession();
    if (session) {
        redirect('/articles');
    }
    return (
        <Box as='main' height='100vh' width='100%'>
            <AbsoluteCenter axis='both'>
                <LoginForm/>
            </AbsoluteCenter>
        </Box>
    )
}
