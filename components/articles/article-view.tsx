'use client';

import Link from "next/link";
import moment from "moment/moment";
import { z } from "zod";
import {ArticleSchema} from "@/schemas";

export const ArticleView = ({article}: { article: z.infer<typeof ArticleSchema> }) => {
    console.log(article)
    return (
        <div>{article.title}</div>
        // <div as='section' pt={10}>
        //     <div justifyContent='space-between' alignItems='center'>
        //         <Link href='/articles'>
        //             <div>
        //                 <div/>
        //                 <Text fontSize={14}>Back to articles</Text>
        //             </div>
        //         </Link>
        //         <Text fontSize={14} color='darkgray'>{moment(article.date).format('D MMMM')}</Text>
        //     </div>
        //     <Image src={article.image_url} alt='article image'/>
        //     <Text fontSize={46} fontWeight={700}>{article.title}</Text>
        //     <Text fontSize={16} fontWeight={400}>{article.content}</Text>
        // </div>
    )
}
