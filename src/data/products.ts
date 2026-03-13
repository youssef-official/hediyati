export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Accessories' | 'Gift Boxes' | 'Personalized' | 'Makeup';
  image: string;
  description: string;
  rating: number;
  reviews: number;
  isBestSeller?: boolean;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Rose Gold Butterfly Necklace',
    price: 850,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
    description: 'A delicate 18k rose gold plated necklace featuring a stunning butterfly pendant encrusted with zircon stones.',
    rating: 4.8,
    reviews: 124,
    isBestSeller: true
  },
  {
    id: '2',
    name: 'Luxury Velvet Gift Box',
    price: 1200,
    category: 'Gift Boxes',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80',
    description: 'A premium velvet box containing a selection of organic skincare, a scented candle, and a silk eye mask.',
    rating: 4.9,
    reviews: 89,
    isNew: true
  },
  {
    id: '3',
    name: 'Personalized Name Bracelet',
    price: 650,
    category: 'Personalized',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
    description: 'Custom-made sterling silver bracelet with your name in elegant calligraphy.',
    rating: 4.7,
    reviews: 210,
    isBestSeller: true
  },
  {
    id: '4',
    name: 'Professional Makeup Brush Set',
    price: 950,
    category: 'Makeup',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&q=80',
    description: '12-piece professional brush set with soft synthetic bristles and rose gold handles.',
    rating: 4.6,
    reviews: 156
  },
  {
    id: '5',
    name: 'Elegant Pearl Earrings',
    price: 450,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1535633302704-b02f4fad253f?w=800&q=80',
    description: 'Classic freshwater pearl earrings with sterling silver backings.',
    rating: 4.9,
    reviews: 78
  },
  {
    id: '6',
    name: 'Self-Care Spa Box',
    price: 1500,
    category: 'Gift Boxes',
    image: 'https://images.unsplash.com/photo-1512446816042-444d641267d4?w=800&q=80',
    description: 'The ultimate relaxation kit with bath bombs, essential oils, and a plush robe.',
    rating: 5.0,
    reviews: 45,
    isNew: true
  },
  {
    id: '7',
    name: 'Engraved Heart Locket',
    price: 780,
    category: 'Personalized',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80',
    description: 'A timeless locket that can be engraved with initials and holds two small photos.',
    rating: 4.8,
    reviews: 92
  },
  {
    id: '8',
    name: 'Crystal Makeup Organizer',
    price: 550,
    category: 'Makeup',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?w=800&q=80',
    description: 'Acrylic organizer with crystal-style handles to keep your vanity elegant and tidy.',
    rating: 4.5,
    reviews: 112
  }
];