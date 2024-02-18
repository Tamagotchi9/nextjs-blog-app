'use client';

import {Box, Flex, Image, Text} from "@chakra-ui/react";
import Link from "next/link";
import {ArrowBackIcon} from "@chakra-ui/icons";
import moment from "moment/moment";
import {Article} from "@/app/lib/defenitions";

export default function ArticleView ({article}: { article: Article }) {
    return (
        <Box as='section' pt={10}>
            <Flex justifyContent='space-between' alignItems='center'>
                <Link href='/articles'>
                    <Flex>
                        <ArrowBackIcon/>
                        <Text fontSize={14}>Back to articles</Text>
                    </Flex>
                </Link>
                <Text fontSize={14} color='darkgray'>{moment(article.date).format('D MMMM')}</Text>
            </Flex>
            <Image src={article.image_url} alt='article image'/>
            <Text fontSize={46} fontWeight={700}>{article.title}</Text>
            <Text fontSize={16} fontWeight={400}>{article.content}</Text>
        </Box>
    )
}
