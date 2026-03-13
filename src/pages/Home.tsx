import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Gift, Sparkles, Heart, Star } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';

export function Home() {
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const categories = [
    { name: 'Accessories', icon: Sparkles, image: 'https://images.unsplash.com/photo-1535633302704-b02f4fad253f?w=800&q=80' },
    { name: 'Gift Boxes', icon: Gift, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80' },
    { name: 'Personalized', icon: Heart, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80' },
    { name: 'Makeup', icon: Star, image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&q=80' },
  ];

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1920&q=80" 
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl space-y-8"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold uppercase tracking-widest">
              Premium Gift Collection
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.1]">
              Choose your gift <br />
              <span className="text-primary italic">with love</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Discover our curated collection of elegant accessories, personalized treasures, and luxury gift boxes designed for the special women in your life.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/shop" 
                className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20"
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/shop?category=Gift Boxes" 
                className="bg-white text-foreground border border-border px-8 py-4 rounded-2xl font-bold hover:bg-accent transition-all"
              >
                View Gift Boxes
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="container mx-auto px-4 md:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-serif font-bold">Shop by Category</h2>
          <p className="text-muted-foreground">Find the perfect gift for every occasion</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer"
            >
              <Link to={`/shop?category=${cat.name}`}>
                <img 
                  src={cat.image} 
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                  <div className="space-y-1">
                    <cat.icon className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-bold">{cat.name}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-primary transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section id="best-sellers" className="bg-secondary py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="space-y-4">
              <h2 className="text-4xl font-serif font-bold">Best Sellers</h2>
              <p className="text-muted-foreground">Our most loved pieces by customers</p>
            </div>
            <Link to="/shop" className="text-primary font-bold flex items-center gap-2 hover:underline">
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="bg-primary/5 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          
          <div className="max-w-3xl mx-auto text-center space-y-12 relative z-10">
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className="w-6 h-6 fill-gold-500 text-gold-500" />
              ))}
            </div>
            <h2 className="text-3xl md:text-4xl font-serif italic leading-relaxed">
              "I ordered a personalized bracelet for my sister's birthday and she absolutely loved it! The packaging was so elegant and the quality is outstanding. Hediyati is now my go-to for gifts."
            </h2>
            <div className="space-y-2">
              <p className="font-bold text-xl">Sarah Ahmed</p>
              <p className="text-muted-foreground">Verified Customer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="bg-foreground text-background rounded-[3rem] p-12 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-4xl font-serif font-bold">Join the Hediyati Club</h2>
            <p className="text-muted-foreground text-lg">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
          </div>
          <div className="w-full max-w-md flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your email address"
              className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary text-white"
            />
            <button className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}