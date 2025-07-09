import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {getArticles} from "@/data/article";

export const ArticlesList = async ({ query }: { query: string }) => {
    const articles = await getArticles(query)
    console.log(articles);
    return (
        <div className="max-w-[800px] w-full mx-auto">
            <div className="flex flex-col gap-5">
                {articles?.map(article => (
                    <Link href={`/articles/${article.id}`} key={article.id} className="w-full">
                        <Card>
                            <CardContent className="px-4 py-2">
                                <div className="flex gap-5">
                                    <div>
                                        <Image
                                            src={article.imageUrl || ''}
                                            width={150}
                                            height={150}
                                            alt="article image"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold">{article.title}</h3>
                                        <p className='text-sm font-normal'>{article.content}</p>
                                    </div>
                                </div>

                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
