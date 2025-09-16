import { prisma } from '@/lib/db';
import { getSession } from '@/lib/session';

export async function POST(req: Request) {
  const session = await getSession();
  if (!session.userId) return new Response('unauthorized', { status: 401 });
  const { caption } = await req.json();
  if (!caption) return new Response('missing', { status: 400 });
  const post = await prisma.post.create({ data: { ownerId: session.userId, caption } });
  const owner = await prisma.user.findUnique({ where: { id: session.userId } });
  return Response.json({ ...post, ownerName: owner?.name || 'אני', comments: [] });
}
