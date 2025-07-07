// ✅ No "use client"
import Providers from '@/components/Providers'; // This is a client component
import './globals.css';

export const metadata = {
  title: 'Book Manager',
  description: 'Manage your books with ease',
};

export default function RootLayout({ children }) {
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
