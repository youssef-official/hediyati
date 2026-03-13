import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../data/products';
import { useAppContext } from '../context/AppContext';
import { formatPrice, cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, wishlist } = useAppContext();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-500"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </Link>
        
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-gold-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
              Best Seller
            </span>
          )}
        </div>

        <button 
          onClick={() => toggleWishlist(product.id)}
          className={cn(
            "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300",
            isWishlisted ? "bg-primary text-white" : "bg-white/80 backdrop-blur-sm text-foreground hover:bg-primary hover:text-white"
          )}
        >
          <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button 
            onClick={() => addToCart(product)}
            className="w-full bg-white/90 backdrop-blur-md text-foreground font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors shadow-lg"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-primary uppercase tracking-widest">{product.category}</span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="w-3 h-3 fill-gold-500 text-gold-500" />
            <span>{product.rating}</span>
          </div>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xl font-bold text-foreground">
          {formatPrice(product.price)}
        </p>
      </div>
    </motion.div>
  );
}