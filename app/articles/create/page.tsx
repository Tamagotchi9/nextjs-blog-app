import Form from '@/app/ui/articles/create-form';
import { Box } from '@chakra-ui/react';

export default async function Page() {
    return (
        <Box as='main' py={20}>
            <Form/>
        </Box>
    );
}