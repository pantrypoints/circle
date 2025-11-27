import bcrypt from 'bcrypt';
import { db } from './db';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';

export async function verifyUser(codename: string, password: string) {
  try {
    const user = await db.select().from(users).where(eq(users.codename, codename)).limit(1);
    
    if (user.length === 0) {
      console.log('User not found:', codename);
      return null;
    }
    
    const valid = await bcrypt.compare(password, user[0].password);
    if (!valid) {
      console.log('Invalid password for user:', codename);
      return null;
    }
    
    return user[0];
  } catch (error) {
    console.error('Error verifying user:', error);
    return null;
  }
}

export async function verifyPin(userId: number, pin: string) {
  try {
    const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    
    if (user.length === 0) {
      console.log('User not found for PIN verification:', userId);
      return false;
    }
    
    return await bcrypt.compare(pin, user[0].pin);
  } catch (error) {
    console.error('Error verifying PIN:', error);
    return false;
  }
}

