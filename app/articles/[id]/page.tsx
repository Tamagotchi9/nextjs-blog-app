import {ArticleView} from "@/components/articles/article-view";
import {db} from "@/drizzle/db";
import {ArticleTable} from "@/drizzle/schema/article";
import {eq} from "drizzle-orm";

export default async function ArticlePage ({ params }: { params: { id: string } }) {
    const { id } = params
    const [article] = await db.select().from(ArticleTable).where(eq(ArticleTable.id, id)).limit(1); // import
    return (
        <ArticleView article={article} />
    )
}
