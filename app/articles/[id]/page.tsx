import { fetchArticle, fetchArticleTopicsById } from "@/app/lib/data";
import ArticleView from "@/app/ui/articles/[id]/article-view";

export default async function ArticlePage ({ params }: { params: { id: string } }) {
    const article = await fetchArticle(params.id);
    const topics = await fetchArticleTopicsById(params.id);
    console.log(topics);
    if (!article) {
        return
    }
    return (
        <ArticleView article={article}/>
    )
}
