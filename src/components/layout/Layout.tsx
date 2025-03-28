import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-xl font-bold text-primary-600">
                  Kebijakan Tracker
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href="/"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive('/')
                      ? 'border-primary-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Beranda
                </Link>
                <Link
                  href="/kebijakan"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive('/kebijakan')
                      ? 'border-primary-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Kebijakan
                </Link>
                <Link
                  href="/submit"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive('/submit')
                      ? 'border-primary-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  Kirim Kebijakan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Kebijakan Tracker. Dibuat untuk Indonesia.
          </p>
        </div>
      </footer>
    </div>
  );
} 