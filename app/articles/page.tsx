import { Suspense } from 'react';
import { Box, VStack, Spinner } from '@chakra-ui/react'
import ArticlesList from "@/app/ui/articles/articles-list";

export default async function Page ({ searchParams }: { searchParams?: {
    query?: string;
    };
}) {
    const query = searchParams?.query || '';

    return (
        <Box as='section' py={10}>
            <VStack spacing='20px'>
                <Suspense fallback={<Spinner/>}>
                    <ArticlesList query={query}/>
                </Suspense>
            </VStack>
        </Box>
    )
}
