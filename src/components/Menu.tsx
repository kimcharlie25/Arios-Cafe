import React from 'react';
import { MenuItem, CartItem } from '../types';
import { useCategories } from '../hooks/useCategories';
import MenuItemCard from './MenuItemCard';

// Preload images for better performance
const preloadImages = (items: MenuItem[]) => {
  items.forEach(item => {
    if (item.image) {
      const img = new Image();
      img.src = item.image;
    }
  });
};

interface MenuProps {
  menuItems: MenuItem[];
  addToCart: (item: MenuItem, quantity?: number, variation?: any, addOns?: any[]) => void;
  cartItems: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
}

const Menu: React.FC<MenuProps> = ({ menuItems, addToCart, cartItems, updateQuantity }) => {
  const { categories } = useCategories();

  // Preload images when menu items change
  React.useEffect(() => {
    if (menuItems.length > 0) {
      preloadImages(menuItems);
    }
  }, [menuItems]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-primary-base min-h-screen">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-verdana font-bold text-[#2C2C2C] mb-4 tracking-tight">Our Menu</h2>
        <div className="w-24 h-1 bg-primary-accent mx-auto mb-6"></div>
        <p className="text-[#2C2C2C]/70 font-verdana max-w-2xl mx-auto text-lg leading-relaxed">
          Discover our selection of carefully curated dishes,
          all prepared with the finest ingredients and authentic techniques.
        </p>
      </div>

      {categories.map((category) => {
        const categoryItems = menuItems.filter(item => item.category === category.id);
        
        if (categoryItems.length === 0) return null;
        
        return (
          <section key={category.id} id={category.id} className="mb-20">
            <div className="flex items-center mb-10 pb-4 border-b-2 border-neutral-accent/30">
              <span className="text-4xl mr-4">{category.icon}</span>
              <h3 className="text-4xl font-verdana font-bold text-[#2C2C2C]">{category.name}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryItems.map((item) => {
                const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
                return (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    onAddToCart={addToCart}
                    quantity={cartItem?.quantity || 0}
                    onUpdateQuantity={updateQuantity}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </main>
  );
};

export default Menu;