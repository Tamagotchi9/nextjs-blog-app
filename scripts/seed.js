const { db } = require('@vercel/postgres');

async function seedArticles(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        return await client.sql`
            CREATE TABLE IF NOT EXISTS articles (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                user_id UUID NOT NULL,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                date DATE NOT NULL
            );
        `;
        console.log(`Created "articles" table`);
    } catch (error) {
        console.error('Error seeding articles:', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();
    await seedArticles(client);

    await client.end();
}

main().catch((err) => {
    console.error(
          'An error occurred while attempting to seed the database:',
          err,
    );
});
