import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { formatPrice } from '../lib/utils';

export function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, showToast } = useAppContext();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 2000 ? 0 : 50;
  const total = subtotal + shipping;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrderComplete(true);
    clearCart();
    showToast('Order placed successfully!', 'success');
  };

  if (isOrderComplete) {
    return (
      <div className="pt-40 pb-24 container mx-auto px-4 text-center space-y-8">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto"
        >
          <CheckCircle className="w-12 h-12" />
        </motion.div>
        <div className="space-y-4">
          <h1 className="text-4xl font-serif font-bold">Thank you for your order!</h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Your order has been placed successfully. We'll contact you soon with the delivery details.
          </p>
        </div>
        <Link 
          to="/shop" 
          className="inline-block bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-24 container mx-auto px-4 text-center space-y-8">
        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10 text-muted-foreground" />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-serif font-bold">Your cart is empty</h1>
          <p className="text-muted-foreground text-lg">Looks like you haven't added anything to your cart yet.</p>
        </div>
        <Link 
          to="/shop" 
          className="inline-block bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 container mx-auto px-4 md:px-8">
      <h1 className="text-4xl font-serif font-bold mb-12">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="popLayout">
            {cart.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-card border border-border rounded-3xl"
              >
                <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <h3 className="font-bold text-xl">{item.name}</h3>
                  <p className="text-primary font-bold">{formatPrice(item.price)}</p>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-secondary rounded-xl p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="w-10 h-10 flex items-center justify-center text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary / Checkout */}
        <div className="space-y-8">
          <div className="bg-secondary rounded-[2rem] p-8 space-y-6">
            <h3 className="text-2xl font-serif font-bold">Order Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="pt-4 border-t border-border flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>

            {!isCheckingOut ? (
              <button 
                onClick={() => setIsCheckingOut(true)}
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <form onSubmit={handleCheckout} className="space-y-4 pt-4 border-t border-border">
                <div className="space-y-2">
                  <label className="text-sm font-bold">Full Name</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Phone Number</label>
                  <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Delivery Address</label>
                  <textarea required className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none h-24 resize-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Notes (Optional)</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-foreground text-background py-4 rounded-2xl font-bold hover:bg-foreground/90 transition-all mt-4"
                >
                  Place Order ({formatPrice(total)})
                </button>
                <button 
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="w-full text-muted-foreground font-bold py-2 hover:text-foreground transition-colors"
                >
                  Back to Summary
                </button>
              </form>
            )}
          </div>

          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
            <p className="text-sm text-primary font-medium text-center">
              Free shipping on orders over 2,000 EGP!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}