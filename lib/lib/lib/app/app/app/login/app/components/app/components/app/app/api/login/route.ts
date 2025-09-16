import { prisma } from '@/lib/db';
import { getSession } from '@/lib/session';

export async function POST(req: Request) {
  const session = await getSession();
  const body = await req.json().catch(()=>({}));
  if (body?.ping) return Response.json({ ok:true, session });
  const name = String(body?.name||'').trim();
  if (!name) return new Response('missing name', { status: 400 });
  let user = await prisma.user.findFirst({ where: { name } });
  if (!user) user = await prisma.user.create({ data: { name } });
  session.userId = user.id; session.name = user.name; await session.save();
  return Response.json({ ok:true, session });
}
