import { Box, AbsoluteCenter } from "@chakra-ui/react";
import LoginForm from "@/app/ui/auth/login-form";

export default function LoginPage() {
    return (
        <Box as='main' height='100vh' width='100%'>
            <AbsoluteCenter axis='both'>
                <LoginForm/>
            </AbsoluteCenter>
        </Box>
    )
}