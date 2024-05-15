import {ArticleView} from "@/components/articles/article-view";
import { getArticle } from "@/data/article";

export default async function ArticlePage ({ params }: { params: { id: string } }) {
    const article = await getArticle(params.id);
    if (!article) {
        return
    }
    return (
        <ArticleView article={article}/>
    )
}
