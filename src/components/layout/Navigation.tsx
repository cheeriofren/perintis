import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookmarkIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import TranslateButton from '@/components/TranslateButton';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { href: '/kebijakan', label: 'Kebijakan' },
    { href: '/ajukan', label: 'Ajukan' },
    { href: '/bookmark', label: 'Bookmark', icon: BookmarkIcon },
    { href: '/tentang', label: 'Tentang' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-600 hover:text-primary-500 transition-colors duration-200">
                Perintis
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'border-primary-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {item.icon && <item.icon className="h-5 w-5 mr-1" />}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <TranslateButton />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden ml-4 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden`}>
        <div className="pt-2 pb-3 space-y-1 bg-white shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-3 text-base font-medium transition-colors duration-200 ${
                isActive(item.href)
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.icon && <item.icon className="h-5 w-5 mr-3" />}
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
} 