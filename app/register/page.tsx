import { Box, AbsoluteCenter } from "@chakra-ui/react";
import RegisterForm from "@/app/ui/auth/register-form";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
export default async function RegisterPage() {
    const session = await getServerSession();
    if (session) {
        redirect('/articles');
    }
    return (
        <Box as='main' height='100vh' width='100%'>
            <AbsoluteCenter axis='both'>
                <RegisterForm/>
            </AbsoluteCenter>
        </Box>
    )
}
