import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as dotenv from "dotenv"
import * as schema from "../../../migrations/schema"
import { migrate } from "drizzle-orm/postgres-js/migrator"

dotenv.config({ path: ".env" })
if (!process.env.DATABASE_URL) {
  console.log("Can't Find Database URL")
}

const client = postgres(process.env.DATABASE_URL as string, { max: 1 })
const db = drizzle(client, { schema })
const mirgateDB = async () => {
  try {
    console.log("🟡 Migrating Client")
    await migrate(db, { migrationsFolder: "migrations" })
    console.log("🟢 Migrate Succesfully")
  } catch (error) {
    console.log("🔴 Migration Failed")
  }
}

mirgateDB()
export default db
