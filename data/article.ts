import {db} from "@/lib/db";

export const getArticles = async (query: string) => {
    try {
        return await db.article.findMany({
            where: {
                title: {
                    startsWith: query
                }
            }
        })
    } catch (e) {
        return null;
    }
}

export const getArticle = async (id: string) => {
    try {
        return await db.article.findFirst({
            where: {
                id
            }
        })
    } catch (e) {
        return null;
    }
}
