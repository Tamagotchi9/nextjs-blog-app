import {sql } from '@vercel/postgres';
const ITEMS_PER_PAGE = 15;
export async function fetchFilteredArticles(query: string) {
    // const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    try {
        // TODO: load more articles on scroll
        const articles = await sql`
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
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch articles.');
    }
}