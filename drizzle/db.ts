import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http'
import {neon, neonConfig} from '@neondatabase/serverless'
import * as schema from '@/drizzle/schema'

import ws from 'ws'
neonConfig.webSocketConstructor = ws
console.log(process.env.DATABASE_URL)
const sql = neon(process.env.DATABASE_URL || 'postgresql://default:OweXbk0KnB3a@ep-holy-unit-11699071-pooler.eu-central-1.aws.neon.tech/verceldb?sslmode=require') // TODO: remove
export const db = drizzle({ client: sql, schema })