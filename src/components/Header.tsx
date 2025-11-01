import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick, onMenuClick }) => {
  const { siteSettings, loading } = useSiteSettings();

  return (
    <header className="sticky top-0 z-50 bg-primary-base/95 backdrop-blur-md border-b-2 border-neutral-accent/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button 
            onClick={onMenuClick}
            className="flex items-center space-x-3 text-secondary-accent hover:text-primary-accent transition-all duration-300 group"
          >
            {loading ? (
              <div className="w-12 h-12 bg-neutral-accent/20 rounded-lg animate-pulse" />
            ) : (
              <img 
                src={siteSettings?.site_logo || "/logo.jpg"} 
                alt={siteSettings?.site_name || "Beracah Cafe"}
                className="w-12 h-12 rounded-lg object-cover ring-2 ring-neutral-accent shadow-md group-hover:ring-primary-accent transition-all duration-300"
                onError={(e) => {
                  e.currentTarget.src = "/logo.jpg";
                }}
              />
            )}
            <div className="flex flex-col items-start">
              <h1 className="text-2xl font-verdana font-bold text-[#2C2C2C] tracking-wide">
                {loading ? (
                  <div className="w-32 h-7 bg-neutral-accent/20 rounded animate-pulse" />
                ) : (
                  siteSettings?.site_name || "Beracah Cafe"
                )}
              </h1>
              <span className="text-xs text-neutral-accent font-verdana uppercase tracking-widest ml-4">Elegant Dining</span>
            </div>
          </button>

          <div className="flex items-center space-x-2">
            <button 
              onClick={onCartClick}
              className="relative p-3 text-secondary-accent hover:text-white hover:bg-primary-accent rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              <ShoppingCart className="h-6 w-6" strokeWidth={2.5} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary-accent text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-bounce-gentle shadow-md border-2 border-primary-base">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;