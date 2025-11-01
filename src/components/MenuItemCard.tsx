import React, { useState } from 'react';
import { Plus, Minus, X, ShoppingCart } from 'lucide-react';
import { MenuItem, Variation, AddOn } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, quantity?: number, variation?: Variation, addOns?: AddOn[]) => void;
  quantity: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ 
  item, 
  onAddToCart, 
  quantity, 
  onUpdateQuantity 
}) => {
  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<Variation | undefined>(
    item.variations?.[0]
  );
  const [selectedAddOns, setSelectedAddOns] = useState<(AddOn & { quantity: number })[]>([]);

  const calculatePrice = () => {
    // Use effective price (discounted or regular) as base
    let price = item.effectivePrice || item.basePrice;
    if (selectedVariation) {
      price = (item.effectivePrice || item.basePrice) + selectedVariation.price;
    }
    selectedAddOns.forEach(addOn => {
      price += addOn.price * addOn.quantity;
    });
    return price;
  };

  const handleAddToCart = () => {
    if (item.variations?.length || item.addOns?.length) {
      setShowCustomization(true);
    } else {
      onAddToCart(item, 1);
    }
  };

  const handleCustomizedAddToCart = () => {
    // Convert selectedAddOns back to regular AddOn array for cart
    const addOnsForCart: AddOn[] = selectedAddOns.flatMap(addOn => 
      Array(addOn.quantity).fill({ ...addOn, quantity: undefined })
    );
    onAddToCart(item, 1, selectedVariation, addOnsForCart);
    setShowCustomization(false);
    setSelectedAddOns([]);
  };

  const handleIncrement = () => {
    onUpdateQuantity(item.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      onUpdateQuantity(item.id, quantity - 1);
    }
  };

  const updateAddOnQuantity = (addOn: AddOn, quantity: number) => {
    setSelectedAddOns(prev => {
      const existingIndex = prev.findIndex(a => a.id === addOn.id);
      
      if (quantity === 0) {
        // Remove add-on if quantity is 0
        return prev.filter(a => a.id !== addOn.id);
      }
      
      if (existingIndex >= 0) {
        // Update existing add-on quantity
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], quantity };
        return updated;
      } else {
        // Add new add-on with quantity
        return [...prev, { ...addOn, quantity }];
      }
    });
  };

  const groupedAddOns = item.addOns?.reduce((groups, addOn) => {
    const category = addOn.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(addOn);
    return groups;
  }, {} as Record<string, AddOn[]>);

  return (
    <>
      <div className={`bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden group animate-scale-in border-2 border-neutral-accent/20 hover:border-primary-accent ${!item.available ? 'opacity-60' : ''}`}>
        {/* Image Container with Badges */}
        <div className="relative h-56 bg-gradient-to-br from-primary-base to-neutral-accent/10">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`absolute inset-0 flex items-center justify-center ${item.image ? 'hidden' : ''}`}>
            <div className="text-6xl opacity-20 text-gray-400">☕</div>
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {item.isOnDiscount && item.discountPrice && (
              <div className="bg-secondary-accent text-white text-xs font-verdana font-bold px-4 py-2 rounded-lg shadow-xl border-2 border-white/50">
                SPECIAL OFFER
              </div>
            )}
            {item.popular && (
              <div className="bg-primary-accent text-white text-xs font-verdana font-bold px-4 py-2 rounded-lg shadow-xl border-2 border-white/50">
                ⭐ FEATURED
              </div>
            )}
          </div>
          
          {!item.available && (
            <div className="absolute top-3 right-3 bg-neutral-accent text-white text-xs font-verdana font-bold px-4 py-2 rounded-lg shadow-xl">
              UNAVAILABLE
            </div>
          )}
          
          {/* Discount Percentage Badge */}
          {item.isOnDiscount && item.discountPrice && (
            <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-secondary-accent text-sm font-verdana font-bold px-3 py-2 rounded-lg shadow-lg border-2 border-secondary-accent/30">
              {Math.round(((item.basePrice - item.discountPrice) / item.basePrice) * 100)}% OFF
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h4 className="text-xl font-verdana font-bold text-[#2C2C2C] leading-tight flex-1 pr-2">{item.name}</h4>
            {item.variations && item.variations.length > 0 && (
              <div className="text-xs font-verdana font-semibold text-primary-accent bg-primary-accent/10 px-3 py-1.5 rounded-lg whitespace-nowrap border border-primary-accent/30">
                {item.variations.length} sizes
              </div>
            )}
          </div>
          
          <p className={`text-sm font-verdana mb-5 leading-relaxed ${!item.available ? 'text-neutral-accent' : 'text-[#2C2C2C]/70'}`}>
            {!item.available ? 'Currently Unavailable' : item.description}
          </p>
          
          {/* Pricing Section */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex-1">
              {item.isOnDiscount && item.discountPrice ? (
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-verdana font-bold text-secondary-accent">
                      ₱{item.discountPrice.toFixed(2)}
                    </span>
                    <span className="text-base font-verdana text-neutral-accent line-through">
                      ₱{item.basePrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs font-verdana text-primary-accent font-semibold">
                    Save ₱{(item.basePrice - item.discountPrice).toFixed(2)}
                  </div>
                </div>
              ) : (
                <div className="text-3xl font-verdana font-bold text-[#2C2C2C]">
                  ₱{item.basePrice.toFixed(2)}
                </div>
              )}
              
              {item.variations && item.variations.length > 0 && (
                <div className="text-xs font-verdana text-neutral-accent mt-1">
                  Starting price
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex-shrink-0">
              {!item.available ? (
                <button
                  disabled
                  className="bg-neutral-accent/30 text-neutral-accent px-5 py-3 rounded-lg cursor-not-allowed font-verdana font-bold text-sm border-2 border-neutral-accent/50"
                >
                  Unavailable
                </button>
              ) : quantity === 0 ? (
                <button
                  onClick={handleAddToCart}
                  className="bg-secondary-accent text-white px-6 py-3 rounded-lg hover:bg-primary-accent transition-all duration-300 transform hover:scale-105 font-verdana font-bold text-sm shadow-lg hover:shadow-xl border-2 border-transparent hover:border-secondary-accent/30"
                >
                  {item.variations?.length || item.addOns?.length ? 'Customize' : 'Add to Cart'}
                </button>
              ) : (
                <div className="flex items-center space-x-2 bg-primary-accent/20 rounded-lg p-1.5 border-2 border-primary-accent/40">
                  <button
                    onClick={handleDecrement}
                    className="p-2 hover:bg-primary-accent hover:text-white rounded-lg transition-all duration-200 hover:scale-110"
                  >
                    <Minus className="h-4 w-4 text-secondary-accent" strokeWidth={3} />
                  </button>
                  <span className="font-verdana font-bold text-[#2C2C2C] min-w-[32px] text-center text-base">{quantity}</span>
                  <button
                    onClick={handleIncrement}
                    className="p-2 hover:bg-primary-accent hover:text-white rounded-lg transition-all duration-200 hover:scale-110"
                  >
                    <Plus className="h-4 w-4 text-secondary-accent" strokeWidth={3} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Add-ons indicator */}
          {item.addOns && item.addOns.length > 0 && (
            <div className="flex items-center space-x-2 text-xs font-verdana font-semibold text-primary-accent bg-primary-accent/10 px-3 py-2 rounded-lg border border-primary-accent/30">
              <span>+</span>
              <span>{item.addOns.length} add-on{item.addOns.length > 1 ? 's' : ''} available</span>
            </div>
          )}
        </div>
      </div>

      {/* Customization Modal */}
      {showCustomization && (
        <div className="fixed inset-0 bg-secondary-accent/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-primary-base rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-neutral-accent/30">
            <div className="sticky top-0 bg-white border-b-2 border-neutral-accent/30 p-6 flex items-center justify-between rounded-t-xl">
              <div>
                <h3 className="text-2xl font-verdana font-bold text-[#2C2C2C]">Customize {item.name}</h3>
                <p className="text-sm font-verdana text-neutral-accent mt-1">Choose your preferences</p>
              </div>
              <button
                onClick={() => setShowCustomization(false)}
                className="p-2 hover:bg-neutral-accent/20 rounded-lg transition-all duration-200"
              >
                <X className="h-6 w-6 text-secondary-accent" strokeWidth={2.5} />
              </button>
            </div>

            <div className="p-6 bg-white">
              {/* Size Variations */}
              {item.variations && item.variations.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-verdana font-bold text-[#2C2C2C] mb-4 text-lg">Choose Size</h4>
                  <div className="space-y-3">
                    {item.variations.map((variation) => (
                      <label
                        key={variation.id}
                        className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                          selectedVariation?.id === variation.id
                            ? 'border-secondary-accent bg-secondary-accent/10 shadow-md'
                            : 'border-neutral-accent/30 hover:border-primary-accent hover:bg-primary-accent/5'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="variation"
                            checked={selectedVariation?.id === variation.id}
                            onChange={() => setSelectedVariation(variation)}
                            className="text-secondary-accent focus:ring-secondary-accent"
                          />
                          <span className="font-verdana font-semibold text-[#2C2C2C]">{variation.name}</span>
                        </div>
                        <span className="text-[#2C2C2C] font-verdana font-bold">
                          ₱{((item.effectivePrice || item.basePrice) + variation.price).toFixed(2)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Add-ons */}
              {groupedAddOns && Object.keys(groupedAddOns).length > 0 && (
                <div className="mb-6">
                  <h4 className="font-verdana font-bold text-[#2C2C2C] mb-4 text-lg">Add-ons</h4>
                  {Object.entries(groupedAddOns).map(([category, addOns]) => (
                    <div key={category} className="mb-4">
                      <h5 className="text-sm font-verdana font-semibold text-primary-accent mb-3 capitalize uppercase tracking-wide">
                        {category.replace('-', ' ')}
                      </h5>
                      <div className="space-y-3">
                        {addOns.map((addOn) => (
                          <div
                            key={addOn.id}
                            className="flex items-center justify-between p-4 border-2 border-neutral-accent/30 rounded-lg hover:border-primary-accent hover:bg-primary-accent/5 transition-all duration-300"
                          >
                            <div className="flex-1">
                              <span className="font-verdana font-semibold text-[#2C2C2C]">{addOn.name}</span>
                              <div className="text-sm font-verdana text-neutral-accent">
                                {addOn.price > 0 ? `₱${addOn.price.toFixed(2)} each` : 'Free'}
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {selectedAddOns.find(a => a.id === addOn.id) ? (
                                <div className="flex items-center space-x-2 bg-primary-accent/20 rounded-lg p-1.5 border-2 border-primary-accent/40">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const current = selectedAddOns.find(a => a.id === addOn.id);
                                      updateAddOnQuantity(addOn, (current?.quantity || 1) - 1);
                                    }}
                                    className="p-1.5 hover:bg-secondary-accent hover:text-white rounded-lg transition-all duration-200"
                                  >
                                    <Minus className="h-3 w-3 text-secondary-accent" strokeWidth={3} />
                                  </button>
                                  <span className="font-verdana font-bold text-[#2C2C2C] min-w-[24px] text-center text-sm">
                                    {selectedAddOns.find(a => a.id === addOn.id)?.quantity || 0}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const current = selectedAddOns.find(a => a.id === addOn.id);
                                      updateAddOnQuantity(addOn, (current?.quantity || 0) + 1);
                                    }}
                                    className="p-1.5 hover:bg-secondary-accent hover:text-white rounded-lg transition-all duration-200"
                                  >
                                    <Plus className="h-3 w-3 text-secondary-accent" strokeWidth={3} />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => updateAddOnQuantity(addOn, 1)}
                                  className="flex items-center space-x-1 px-4 py-2 bg-secondary-accent text-white rounded-lg hover:bg-primary-accent transition-all duration-300 text-sm font-verdana font-bold shadow-md"
                                >
                                  <Plus className="h-3 w-3" strokeWidth={3} />
                                  <span>Add</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Summary */}
              <div className="border-t-2 border-neutral-accent/30 pt-5 mb-6">
                <div className="flex items-center justify-between text-3xl font-verdana font-bold text-[#2C2C2C]">
                  <span>Total:</span>
                  <span className="text-secondary-accent">₱{calculatePrice().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCustomizedAddToCart}
                className="w-full bg-secondary-accent text-white py-4 rounded-lg hover:bg-primary-accent transition-all duration-300 font-verdana font-bold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-transparent hover:border-secondary-accent/30"
              >
                <ShoppingCart className="h-5 w-5" strokeWidth={2.5} />
                <span>Add to Cart - ₱{calculatePrice().toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItemCard;