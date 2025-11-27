import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { services } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
  const allProducts = await db
    .select()
    .from(services)
    .orderBy(desc(services.dateCreated));
  
  return { services: allServices };
};
