import { fetchArticle } from "@/app/lib/data";
import ArticleView from "@/app/ui/articles/[id]/article-view";

export default async function ArticlePage ({ params }: { params: { id: string } }) {
    const article = await fetchArticle(params.id)
    if (!article) {
        return
    }
    return (
        <ArticleView article={article}/>
    )
}
