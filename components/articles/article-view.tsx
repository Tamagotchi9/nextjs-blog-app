import {Article} from "@/definitions/article";
import {ReadOnlyEditor} from "@/services/lexical/components/read-only-editor";

interface ArticleViewProps {
    article: Article
}

export const ArticleView = ({ article }: ArticleViewProps) => {
    return (
        <section>
            <div className="max-w-[1200px] mx-auto">
                <h1 className="text-center">{article.title}</h1>
                {article.content && <ReadOnlyEditor initialJson={article.content}></ReadOnlyEditor>}
            </div>
        </section>
    )
}
