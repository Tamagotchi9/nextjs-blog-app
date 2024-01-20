const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');

async function seedArticles(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        return await client.sql`
            CREATE TABLE IF NOT EXISTS articles (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                user_id UUID NOT NULL,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                date DATE NOT NULL,
                image_url VARCHAR(255) NOT NULL 
            );
        `;
    } catch (error) {
        console.error('Error seeding articles:', error);
        throw error;
    }
}

async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS users (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            );
        `;

        const hashedPassword = await bcrypt.hash('getbuckets99', 10)
        await client.sql`
            INSERT INTO users (id, name, email, password)
            VALUES ('410544b2-4001-4271-9855-fec4b6a6442a', 'test voloshko', 'voloshkotest@test.com', ${hashedPassword})
            ON CONFLICT (id) DO NOTHING;
        `;
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();
    await seedArticles(client);
    await seedUsers(client);
    await client.end();
}

main().catch((err) => {
    console.error(
          'An error occurred while attempting to seed the database:',
          err,
    );
});
