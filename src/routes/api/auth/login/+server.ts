import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { verifyUser } from '$lib/server/auth';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const { codename, password } = await request.json();
    
    console.log('Login attempt for:', codename);
    
    if (!codename || !password) {
      return json({ message: 'Codename and password are required' }, { status: 400 });
    }
    
    const user = await verifyUser(codename, password);
    
    if (!user) {
      console.log('Login failed for:', codename);
      return json({ message: 'Invalid credentials' }, { status: 401 });
    }
    
    console.log('Login successful for:', codename, 'User ID:', user.id);
    
    cookies.set('userId', user.id.toString(), { 
      path: '/', 
      httpOnly: true, 
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax'
    });
    
    return json({ success: true, userId: user.id });
  } catch (error: any) {
    console.error('Login error:', error);
    return json({ 
      message: error.message || 'Login failed. Please try again.',
      error: error.toString()
    }, { status: 500 });
  }
};