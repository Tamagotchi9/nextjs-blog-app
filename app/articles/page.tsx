import { Suspense } from 'react';
import {ArticlesList} from "@/components/articles/articles-list";

export default async function Page () {
    return (
        <main className="py-10">
            <Suspense fallback="Loading...">
                <ArticlesList />
            </Suspense>
        </main>
    )
}
