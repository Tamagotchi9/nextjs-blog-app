'use client';

import {Card, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import Link from 'next/link'
import { Article } from '@/definitions/article'

interface ArticlesCardProps {
    article: Article
}

export const ArticlesCard = ({ article }: ArticlesCardProps) => {
    return (
        <Link href={`/articles/${article.id}`}>
            <Card className="my-5">
                <CardHeader>
                    <CardTitle>{article.title}</CardTitle>
                    <CardDescription>{article.description}</CardDescription>
                </CardHeader>
            </Card>
        </Link>
    )
}