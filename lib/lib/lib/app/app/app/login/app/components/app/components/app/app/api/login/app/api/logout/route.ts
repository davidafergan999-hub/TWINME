import { getSession } from '@/lib/session';
export async function GET() { const session = await getSession(); session.destroy(); return Response.redirect('/', 302); }
