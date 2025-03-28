'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">Perintis</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/')
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {t('nav.home')}
              </Link>
              <Link
                href="/kebijakan"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname.startsWith('/kebijakan')
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {t('nav.policies')}
              </Link>
              <Link
                href="/submit"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/submit')
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {t('nav.submit')}
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/bookmark"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <span className="sr-only">{t('nav.bookmarks')}</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
                  >
                    <span>{user.displayName || user.email}</span>
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {t('nav.profile')}
                        </Link>
                        <button
                          onClick={signOut}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {t('nav.signOut')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                {t('nav.signIn')}
              </Link>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/')
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            {t('nav.home')}
          </Link>
          <Link
            href="/kebijakan"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              pathname.startsWith('/kebijakan')
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            {t('nav.policies')}
          </Link>
          <Link
            href="/submit"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
              isActive('/submit')
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            {t('nav.submit')}
          </Link>
          {user ? (
            <>
              <Link
                href="/bookmark"
                className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              >
                {t('nav.bookmarks')}
              </Link>
              <Link
                href="/profile"
                className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              >
                {t('nav.profile')}
              </Link>
              <button
                onClick={signOut}
                className="block w-full text-left pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              >
                {t('nav.signOut')}
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
            >
              {t('nav.signIn')}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
} 