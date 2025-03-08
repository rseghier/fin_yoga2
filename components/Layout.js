import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { FaSearch, FaSun } from 'react-icons/fa';
import SearchModal from './SearchModal';

export default function Layout({ children, title = 'FindYoga - Find Your Perfect Yoga Studio' }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const openSearch = () => {
    setIsSearchOpen(true);
  };
  
  const closeSearch = () => {
    setIsSearchOpen(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Find your perfect yoga studio in your area" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="py-4 px-6 md:px-12 border-b">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🧘</span>
              <span className="text-xl font-bold">FindYoga</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/about" className="hover:text-primary">
                About
              </Link>
              <button 
                className="hover:text-primary" 
                onClick={openSearch}
                aria-label="Search studios"
              >
                <FaSearch className="w-5 h-5" />
              </button>
              <button className="hover:text-primary">
                <FaSun className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-6 md:px-12 py-8">
        {children}
      </main>

      <footer className="py-8 px-6 md:px-12 border-t text-center text-sm text-gray-500">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} • FindYoga • Discover Yoga Studios Near You</p>
          <p>Powered by Next.js</p>
        </div>
      </footer>
      
      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </div>
  );
} 