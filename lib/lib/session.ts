import { IronSessionOptions } from 'iron-session';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';

export interface AppSession { userId?: string; name?: string; }

export const sessionOptions: IronSessionOptions = {
  cookieName: 'socialtwin',
  password: process.env.SESSION_PASSWORD as string,
  cookieOptions: { secure: true, sameSite: 'lax' },
};

export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<AppSession>(cookieStore, sessionOptions);
  return session;
}
