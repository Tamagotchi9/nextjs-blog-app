import { Suspense } from 'react';
import {ArticlesList} from "@/components/articles/articles-list";

export default async function Page ({ searchParams }: { searchParams?: {
    query?: string;
    };
}) {
    const query = searchParams?.query || '';
    // TODO: create fallback spinner
    return (
        <main className="py-10">
            <Suspense fallback="Loading...">
                <ArticlesList query={query}/>
            </Suspense>
        </main>
    )
}
