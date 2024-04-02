import Form from '@/app/ui/articles/create-form';
import { Box } from '@chakra-ui/react';
import GoBackButton from "@/app/ui/elements/go-back-button";

export default async function Page() {
    return (
        <Box as='main' py={20}>
            <GoBackButton route={'/articles'} />
            <Form/>
        </Box>
    );
}