import React from 'react';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cartItems: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  onContinueShopping: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  updateQuantity,
  removeFromCart,
  clearCart,
  getTotalPrice,
  onContinueShopping,
  onCheckout
}) => {
  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen bg-primary-base">
        <div className="text-center py-20 bg-white rounded-xl shadow-lg border-2 border-neutral-accent/20">
          <div className="text-8xl mb-6 opacity-30">🛒</div>
          <h2 className="text-3xl font-verdana font-bold text-[#2C2C2C] mb-3">Your cart is empty</h2>
          <p className="text-[#2C2C2C]/70 font-verdana mb-8 text-lg">Add some delicious items to get started!</p>
          <button
            onClick={onContinueShopping}
            className="bg-secondary-accent text-white px-8 py-4 rounded-lg hover:bg-primary-accent transition-all duration-300 transform hover:scale-105 font-verdana font-bold shadow-lg"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 min-h-screen bg-primary-base">
      <div className="flex items-center justify-between mb-10">
        <button
          onClick={onContinueShopping}
          className="flex items-center space-x-2 text-secondary-accent hover:text-primary-accent transition-all duration-300 font-verdana font-semibold"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={2.5} />
          <span>Continue Shopping</span>
        </button>
        <h1 className="text-4xl font-verdana font-bold text-[#2C2C2C]">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-neutral-accent hover:text-secondary-accent transition-all duration-300 font-verdana font-semibold"
        >
          Clear All
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border-2 border-neutral-accent/20">
        {cartItems.map((item, index) => (
          <div key={item.id} className={`p-6 hover:bg-primary-base/30 transition-all duration-300 ${index !== cartItems.length - 1 ? 'border-b-2 border-neutral-accent/20' : ''}`}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-verdana font-bold text-[#2C2C2C] mb-2">{item.name}</h3>
                {item.selectedVariation && (
                  <p className="text-sm font-verdana text-primary-accent font-semibold mb-1">Size: {item.selectedVariation.name}</p>
                )}
                {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                  <p className="text-sm font-verdana text-neutral-accent mb-2">
                    Add-ons: {item.selectedAddOns.map(addOn => 
                      addOn.quantity && addOn.quantity > 1 
                        ? `${addOn.name} x${addOn.quantity}`
                        : addOn.name
                    ).join(', ')}
                  </p>
                )}
                <p className="text-lg font-verdana font-semibold text-[#2C2C2C]">₱{item.totalPrice} each</p>
              </div>
              
              <div className="flex items-center space-x-5 ml-4">
                <div className="flex items-center space-x-3 bg-primary-accent/20 rounded-lg p-2 border-2 border-primary-accent/40">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-secondary-accent hover:text-white rounded-lg transition-all duration-200"
                  >
                    <Minus className="h-5 w-5 text-secondary-accent" strokeWidth={3} />
                  </button>
                  <span className="font-verdana font-bold text-[#2C2C2C] min-w-[40px] text-center text-lg">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-secondary-accent hover:text-white rounded-lg transition-all duration-200"
                  >
                    <Plus className="h-5 w-5 text-secondary-accent" strokeWidth={3} />
                  </button>
                </div>
                
                <div className="text-right min-w-[100px]">
                  <p className="text-2xl font-verdana font-bold text-secondary-accent">₱{item.totalPrice * item.quantity}</p>
                </div>
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-3 text-neutral-accent hover:text-white hover:bg-neutral-accent rounded-lg transition-all duration-300 shadow-md"
                >
                  <Trash2 className="h-5 w-5" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-neutral-accent/20">
        <div className="flex items-center justify-between text-4xl font-verdana font-bold text-[#2C2C2C] mb-8 pb-6 border-b-2 border-neutral-accent/30">
          <span>Total:</span>
          <span className="text-secondary-accent">₱{parseFloat(getTotalPrice() || 0).toFixed(2)}</span>
        </div>
        
        <button
          onClick={onCheckout}
          className="w-full bg-secondary-accent text-white py-5 rounded-lg hover:bg-primary-accent transition-all duration-300 transform hover:scale-105 font-verdana font-bold text-xl shadow-lg hover:shadow-xl border-2 border-transparent hover:border-secondary-accent/30"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;