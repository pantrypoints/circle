import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { services } from '$lib/server/db/schema';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const userId = cookies.get('userId');
  
  if (!userId) {
    return json({ message: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const data = await request.json();
    
    if (!data.name || !data.measure || data.points === undefined) {
      return json({ message: 'Missing required fields' }, { status: 400 });
    }
    
    await db.insert(services).values({
      name: data.name,
      measure: data.measure,
      points: parseFloat(data.points),
      category: parseInt(data.category) || 1,
      photo1: data.photo1 || null,
      photo2: data.photo2 || null,
      photo3: data.photo3 || null,
      photo4: data.photo4 || null,
      photo5: data.photo5 || null,
      photo6: data.photo6 || null,
      description: data.description || null,
      headline: data.headline || null,
      userId: parseInt(userId)
    });
    
    return json({ success: true });
  } catch (error) {
    console.error('Error creating service:', error);
    return json({ message: 'Failed to create service' }, { status: 500 });
  }
};

