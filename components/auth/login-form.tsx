import {CardWrapper} from "@/components/auth/card-wrapper";

export const LoginForm = () => {
    return (
        <CardWrapper
            headerLabel="Login"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial={true}
        >
            Login Form!
        </CardWrapper>
    )
}
