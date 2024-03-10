import Link from "next/link";
import styles from "@/app/articles/styles.module.css";
import {Box, Card, CardBody, Flex, Heading, Spacer, Stack, Text} from "@chakra-ui/react";
import Image from "next/image";
import moment from "moment/moment";
import {fetchFilteredArticles} from "@/app/lib/data";

export default async function ArticlesList ({ query }: { query: string }) {
    const articles = await fetchFilteredArticles(query)
    return (
        <div>
            {articles?.map(article => (
                <Link href={`/articles/${article.id}`} key={article.id} className={styles.link}>
                    <Card
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
                </Link>
            ))}
        </div>
    )
}
