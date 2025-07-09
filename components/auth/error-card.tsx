import {CardWrapper} from "@/components/auth/card-wrapper";

export const ErrorCard = () => {
    // TODO: add icon for the error
    return (
        <CardWrapper headerLabel='Oops something went wrong!' backButtonLabel='Go to login page' backButtonHref='/auth/login' >
            <div>ERROR</div>
        </CardWrapper>
    );
}
