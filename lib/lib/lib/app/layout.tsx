import './globals.css';
export const metadata = { title: 'Social Twin (MVP)', description: 'פיד בסיסי ללא חיבורים חיצוניים' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="he" dir="rtl"><body style={{ background:'#f6f7fb' }}>{children}</body></html>);
}
