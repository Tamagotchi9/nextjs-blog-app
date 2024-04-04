import Link from "next/link";
import Image from "next/image";
import moment from "moment/moment";
import {fetchFilteredArticles} from "@/app/lib/data";
import { Card, CardContent } from "@/components/ui/card";

export default async function ArticlesList ({ query }: { query: string }) {
    const articles = await fetchFilteredArticles(query)
    return (
        <div>
            {articles?.map(article => (
                <Link href={`/articles/${article.id}`} key={article.id} className="w-full">
                    <Card>
                        <Image
                            priority
                            key={article.image_url}
                            src={article.image_url}
                            alt="Image"
                            width={200}
                            height={200}
                        />
                        <CardContent>
                            <div className="h-full flex items-center justify-between">
                                <div>
                                    <h3>{article.title}</h3>
                                    <p>{article.content}</p>
                                </div>
                                <div>
                                    <h3>{moment(article.date).format('D MMMM')}</h3>
                                    <p>{article.author}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    )
}
