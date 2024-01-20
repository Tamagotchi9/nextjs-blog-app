import { Box, Card, CardBody, Heading, Stack, Text, VStack, Flex, Spacer } from '@chakra-ui/react'
import Image from 'next/image';
import { fetchFilteredArticles } from '@/app/lib/data';
import moment from 'moment';

export default async function Page ({ searchParams }: { searchParams?: {
    query?: string;
    };
}) {
    const query = searchParams?.query || '';
    const articles = await fetchFilteredArticles(query)
    console.log(articles)
    return (
        <Box as='section' py={10}>
            <VStack spacing='20px'>
                {articles?.map(article => (
                    <Card
                        key={article.id}
                        direction={{ base: 'column', sm: 'row' }}
                        overflow='hidden'
                        variant='outline'
                        width='100%'
                    >
                        <Image
                            priority
                            key={article.image_url}
                            src={article.image_url}
                            alt="Image"
                            width={200}
                            height={200}
                        />

                        <Stack width='100%'>
                            <CardBody>
                                <Flex height='100%'>
                                    <Box>
                                        <Heading size='md'>{article.title}</Heading>
                                        <Text py='2'>
                                            {article.content}
                                        </Text>
                                    </Box>
                                    <Spacer />
                                    <Box>
                                        <Flex height='100%' direction='column' alignItems='flex-end' justifyContent='space-between'>
                                            <Text color='gray.500'>
                                                {moment(article.date).format('D MMMM')}
                                            </Text>
                                            <Text fontWeight='600'>
                                                {article.author}
                                            </Text>
                                        </Flex>
                                    </Box>
                                </Flex>
                            </CardBody>
                        </Stack>
                    </Card>
                ))}
            </VStack>
        </Box>
    )
}
