import {ArticlesCard} from "@/components/articles/articles-card";
import {Article} from "@/definitions/article";

interface ArticlesListProps {
    articles: Article[]
}

export const ArticlesList = async ({ articles }: ArticlesListProps) => {
    return (
        <div className="max-w-[1200px] mx-auto">
            {articles.map((article) => (<ArticlesCard article={article} key={article.id}/>))}
        </div>
    )
}
