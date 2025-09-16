import { prisma } from '@/lib/db';
import { getSession } from '@/lib/session';

export async function POST(req: Request) {
  const session = await getSession();
  if (!session.userId) return new Response('unauthorized', { status: 401 });
  const { postId, text } = await req.json();
  if (!postId || !text) return new Response('missing', { status: 400 });
  const c = await prisma.comment.create({ data: { postId, text, authorId: session.userId } });
  const author = await prisma.user.findUnique({ where: { id: session.userId } });
  return Response.json({ ...c, authorName: author?.name || 'אני' });
}
