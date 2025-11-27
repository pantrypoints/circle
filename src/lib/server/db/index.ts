import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';
import { building } from '$app/environment';

// Don't initialize during build
// if (building) {
//   // @ts-ignore
//   export const db = null;
// } else {
  
  let dbInstance: ReturnType<typeof drizzle> | null = null;

  function initDb() {
    if (dbInstance) return dbInstance;

    const dbUrl = process.env.DATABASE_URL || 'file:local.db';
    const authToken = process.env.DATABASE_AUTH_TOKEN;

    console.log('🔌 Connecting to database:', { 
      url: dbUrl.substring(0, 30) + '...', 
      hasToken: !!authToken,
      isLocal: dbUrl.startsWith('file:')
    });

    try {
      const client = createClient({
        url: dbUrl,
        authToken: authToken
      });

      dbInstance = drizzle(client, { schema });
      console.log('✅ Database connected successfully');
      return dbInstance;
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      throw error;
    }
  }

  export const db = new Proxy({} as ReturnType<typeof drizzle>, {
    get(target, prop) {
      const instance = initDb();
      // @ts-ignore
      return instance[prop];
    }
  });
