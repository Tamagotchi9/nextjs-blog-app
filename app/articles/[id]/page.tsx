import {ArticleView} from "@/components/articles/article-view";

export default async function ArticlePage ({ params }: { params: { id: string } }) {
    return (
        <ArticleView />
    )
}
