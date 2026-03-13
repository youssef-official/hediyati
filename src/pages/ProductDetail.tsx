import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Shield, Truck, RotateCcw, Minus, Plus } from 'lucide-react';
import { products } from '../data/products';
import { useAppContext } from '../context/AppContext';
import { formatPrice, cn } from '../lib/utils';
import { ProductCard } from '../components/ProductCard';

export function ProductDetail() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, wishlist } = useAppContext();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="pt-32 pb-24 text-center space-y-4">
        <h2 className="text-3xl font-bold">Product not found</h2>
        <Link to="/shop" className="text-primary font-bold hover:underline">Back to Shop</Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="pt-32 pb-24 container mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
        {/* Gallery */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="aspect-square rounded-[2rem] overflow-hidden border border-border">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-border cursor-pointer hover:border-primary transition-colors">
                <img src={product.image} alt="" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-primary uppercase tracking-widest">{product.category}</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-gold-500 text-gold-500" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-muted-foreground text-sm">({product.reviews} reviews)</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold">{product.name}</h1>
            <p className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {product.description}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center bg-secondary rounded-xl p-1">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className={cn(
                  "w-12 h-12 rounded-xl border flex items-center justify-center transition-all",
                  isWishlisted ? "bg-primary border-primary text-white" : "border-border hover:border-primary hover:text-primary"
                )}
              >
                <Heart className={cn("w-6 h-6", isWishlisted && "fill-current")} />
              </button>
            </div>

            <button 
              onClick={() => addToCart(product, quantity)}
              className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-primary/90 transition-all hover:scale-[1.02] shadow-xl shadow-primary/20"
            >
              <ShoppingCart className="w-6 h-6" />
              Add to Cart
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary">
                <Truck className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold">Free Shipping</p>
                <p className="text-muted-foreground">On orders over 2000 EGP</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold">Easy Returns</p>
                <p className="text-muted-foreground">14-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary">
                <Shield className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold">Secure Payment</p>
                <p className="text-muted-foreground">100% secure checkout</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-serif font-bold">You May Also Like</h2>
            <p className="text-muted-foreground">Complete your gift with these items</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}