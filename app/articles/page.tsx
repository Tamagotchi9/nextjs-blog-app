import {Suspense} from 'react';
import {ArticlesList} from "@/components/articles/articles-list";
import {db} from "@/drizzle/db";
import {ArticleTable} from "@/drizzle/schema/article";

export default async function Page () {
    const articles = await db.select().from(ArticleTable)

    return (
        <main className="py-10">
            <Suspense fallback="Loading...">
                <ArticlesList articles={articles} />
            </Suspense>
        </main>
    )
}
