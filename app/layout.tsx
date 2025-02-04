import { Providers } from '@/lib/providers';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'E-commerce Store',
  description: 'Next.js E-commerce Store with App Router',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
