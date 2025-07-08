import { Roboto } from 'next/font/google';
import Providers from '@/wrappers/Providers';
import './globals.css';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata = {
  title: 'Book Manager',
  description: 'Manage your books with ease',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
