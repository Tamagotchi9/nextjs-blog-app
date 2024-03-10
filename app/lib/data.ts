import {sql} from '@vercel/postgres';
import {Article, ArticlesList} from "@/app/lib/defenitions";

const ITEMS_PER_PAGE = 15;
export async function fetchFilteredArticles(query: string) {
    // const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    try {
        // TODO: load more articles on scroll
        const articles = await sql<ArticlesList>`
            SELECT
                articles.id,
                articles.user_id,
                articles.title,
                articles.content,
                articles.date,
                articles.image_url,
                users.name as author
            FROM articles
            JOIN users ON articles.user_id = users.id
            WHERE
                users.name ILIKE ${`%${query}%`} OR
                users.email ILIKE ${`%${query}%`} OR
                articles.title ILIKE ${`%${query}%`} OR
                articles.content ILIKE ${`%${query}%`}
            ORDER BY articles.date DESC
      `;

        return articles.rows;
    } catch (e) {
        console.error('Database Error:', e);
        throw new Error('Failed to fetch articles.');
    }
}

export async function fetchArticle(id: string) {
    try {
        const article = await sql<Article>`
        SELECT * FROM articles WHERE id = ${id}
        `;
        return article.rows[0];
    } catch (e) {
        console.error('Database Error:', e);
        throw new Error('Failed to fetch article.');
    }
}

export async function fetchArticleTopicsById(id: string) {
    console.log(id);
    try {
        const topics = await sql`
            SELECT
                topics.id,
                topics.name
            FROM topics
            JOIN articles_topics ON topics.id = articles_topics.topic_id
            WHERE articles_topics.article_id = ${id}
        `;
        return topics.rows;
    } catch (e) {
        console.error('Database Error:', e);
        throw new Error('Failed to fetch topics.');
    }
}
