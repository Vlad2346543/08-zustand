import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import TanStackProvider from '../components/TanStackProvider/TanStackProvider';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

interface Props {
  children: React.ReactNode;
  modal: React.ReactNode;
}

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Simple app for creating and managing notes',
  openGraph: {
    title: 'NoteHub',
    description: 'Simple app for creating and managing notes',
    url: 'https://notehub.app',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

export default function RootLayout({ children, modal }: Props) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>

        <div id="modal-root" />
      </body>
    </html>
  );
}
