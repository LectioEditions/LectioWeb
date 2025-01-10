import '@/src/server/envConfig';
import { defineConfig } from 'drizzle-kit';
 
export default defineConfig({
  schema: './src/server/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  tablesFilter: ['lection_*'],
  out: './server/db.ts',
  migrations: {
    table: "migrations",
    schema: "public"
}
});