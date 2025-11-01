import React from 'react';
import { useCategories } from '../hooks/useCategories';

interface SubNavProps {
  selectedCategory: string;
  onCategoryClick: (categoryId: string) => void;
}

const SubNav: React.FC<SubNavProps> = ({ selectedCategory, onCategoryClick }) => {
  const { categories, loading } = useCategories();

  return (
    <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b-2 border-neutral-accent/20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 overflow-x-auto py-4 scrollbar-hide">
          {loading ? (
            <div className="flex space-x-3">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="h-10 w-24 bg-neutral-accent/20 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <button
                onClick={() => onCategoryClick('all')}
                className={`px-5 py-2.5 rounded-lg text-sm font-verdana font-semibold transition-all duration-300 border-2 shadow-sm hover:shadow-md transform hover:scale-105 whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-secondary-accent text-white border-secondary-accent'
                    : 'bg-white text-[#2C2C2C] border-neutral-accent/40 hover:border-primary-accent hover:bg-primary-accent/10'
                }`}
              >
                All Items
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onCategoryClick(c.id)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-verdana font-semibold transition-all duration-300 border-2 shadow-sm hover:shadow-md transform hover:scale-105 flex items-center space-x-2 whitespace-nowrap ${
                    selectedCategory === c.id
                      ? 'bg-secondary-accent text-white border-secondary-accent'
                      : 'bg-white text-[#2C2C2C] border-neutral-accent/40 hover:border-primary-accent hover:bg-primary-accent/10'
                  }`}
                >
                  <span className="text-base">{c.icon}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubNav;


