import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Heart, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <Link to="/" className="text-3xl font-serif font-bold text-primary">
            Hediyati
          </Link>
          <p className="text-muted-foreground leading-relaxed">
            The ultimate destination for premium gifts and accessories for women. 
            We curate every item with love to help you express your feelings.
          </p>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:text-primary transition-colors cursor-pointer">
              <Globe className="w-5 h-5" />
            </div>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:text-primary transition-colors cursor-pointer">
              <Heart className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-4">
            <li><Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors">All Products</Link></li>
            <li><Link to="/shop?category=Accessories" className="text-muted-foreground hover:text-primary transition-colors">Accessories</Link></li>
            <li><Link to="/shop?category=Gift Boxes" className="text-muted-foreground hover:text-primary transition-colors">Gift Boxes</Link></li>
            <li><Link to="/shop?category=Personalized" className="text-muted-foreground hover:text-primary transition-colors">Personalized Gifts</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6">Customer Service</h4>
          <ul className="space-y-4">
            <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
            <li><Link to="/shipping" className="text-muted-foreground hover:text-primary transition-colors">Shipping Policy</Link></li>
            <li><Link to="/returns" className="text-muted-foreground hover:text-primary transition-colors">Returns & Exchanges</Link></li>
            <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQs</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-muted-foreground">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <span>Maadi, Cairo, Egypt</span>
            </li>
            <li className="flex items-center gap-3 text-muted-foreground">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <span>+20 123 456 7890</span>
            </li>
            <li className="flex items-center gap-3 text-muted-foreground">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <span>hello@hediyati.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© 2024 Hediyati. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}