import {db} from "@/drizzle/db";
import {ArticleTable} from "@/drizzle/schema/article";
import { type NextResponse } from 'next/server'

export async function POST(request: Request): Promise<Response> {
    try {
        const res = await request.json()
        const article = await db.insert(ArticleTable).values(res).returning()
        return new Response(JSON.stringify(article), { status: 200 })
    } catch(reason) {
        const message =
            reason instanceof Error ? reason.message : 'Unexpected exception'
        return new Response(message, { status: 500 })
    }
}