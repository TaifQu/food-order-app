export interface MenuItem {
  id: string;
  name: string;
  category: 'Burgers' | 'Pizzas' | 'Bowls & Biryani' | 'Asian Wok' | 'Beverages' | 'Desserts';
  price: number;
  description: string;
  image: string;
  isVeg: boolean;
  spicyLevel: 0 | 1 | 2 | 3; // 0 = mild, 3 = very spicy
  rating: number;
  reviewsCount: number;
  prepTimeMinutes: number;
  calories: number;
  isPopular?: boolean;
  isChefSpecial?: boolean;
  options?: {
    sizes?: { name: string; extraPrice: number }[];
    addOns?: { name: string; price: number }[];
  };
}

export const MENU_CATEGORIES = [
  'All',
  'Burgers',
  'Pizzas',
  'Bowls & Biryani',
  'Asian Wok',
  'Beverages',
  'Desserts',
] as const;

export type MenuCategoryType = (typeof MENU_CATEGORIES)[number];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'burg-01',
    name: 'Truffle Smash Cheeseburger',
    category: 'Burgers',
    price: 249,
    description: 'Double smashed crispy beef/veg patty, aged cheddar, caramelized shallots, black truffle garlic aioli on a toasted brioche bun.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    isVeg: false,
    spicyLevel: 1,
    rating: 4.9,
    reviewsCount: 312,
    prepTimeMinutes: 12,
    calories: 680,
    isPopular: true,
    isChefSpecial: true,
    options: {
      sizes: [
        { name: 'Single Patty', extraPrice: 0 },
        { name: 'Double Smash Patty', extraPrice: 60 },
        { name: 'Triple Monster Stack', extraPrice: 120 },
      ],
      addOns: [
        { name: 'Extra Melted Cheddar', price: 35 },
        { name: 'Smoked Crispy Bacon / Crisp Tempura', price: 50 },
        { name: 'Truffle Dip', price: 30 },
      ],
    },
  },
  {
    id: 'burg-02',
    name: 'Crispy Peri-Peri Paneer Brioche',
    category: 'Burgers',
    price: 219,
    description: 'Golden spiced cottage cheese patty infused with bird’s eye chili, house slaw, spicy chipotle mayo, and crunchy gherkins.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    spicyLevel: 2,
    rating: 4.8,
    reviewsCount: 248,
    prepTimeMinutes: 10,
    calories: 540,
    isPopular: true,
    options: {
      sizes: [
        { name: 'Regular Size', extraPrice: 0 },
        { name: 'Jumbo Brioche Meal (+Fries)', extraPrice: 75 },
      ],
      addOns: [
        { name: 'Extra Cheddar Slice', price: 30 },
        { name: 'Jalapeño Popper Topping', price: 40 },
        { name: 'Peri-Peri Seasoning Dust', price: 20 },
      ],
    },
  },
  {
    id: 'burg-03',
    name: 'Fiery Nashville Hot Chicken Burger',
    category: 'Burgers',
    price: 269,
    description: 'Buttermilk fried crisp chicken breast dipped in Nashville chili oil, dill pickle chips, creamy slaw, honey drizzle on sesame bun.',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
    isVeg: false,
    spicyLevel: 3,
    rating: 4.9,
    reviewsCount: 420,
    prepTimeMinutes: 14,
    calories: 720,
    isPopular: true,
    options: {
      sizes: [
        { name: 'Regular Crispy', extraPrice: 0 },
        { name: 'Extra Large Fillet', extraPrice: 70 },
      ],
      addOns: [
        { name: 'Ghost Pepper Hot Sauce Dip', price: 25 },
        { name: 'Cheese Fondue Dip', price: 45 },
      ],
    },
  },
  {
    id: 'piz-01',
    name: 'San Marzano Margherita Basilico',
    category: 'Pizzas',
    price: 389,
    description: 'Slow-fermented 48hr sourdough crust, San Marzano tomato sauce, fresh buffalo mozzarella, virgin olive oil, and sweet basil leaves.',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    spicyLevel: 0,
    rating: 4.9,
    reviewsCount: 380,
    prepTimeMinutes: 15,
    calories: 780,
    isPopular: true,
    isChefSpecial: true,
    options: {
      sizes: [
        { name: '10-inch Medium (6 Slices)', extraPrice: 0 },
        { name: '12-inch Large (8 Slices)', extraPrice: 110 },
      ],
      addOns: [
        { name: 'Cheese Stuffed Crust', price: 65 },
        { name: 'Fresh Burrata Center', price: 90 },
        { name: 'Sundried Tomatoes & Pesto', price: 45 },
      ],
    },
  },
  {
    id: 'piz-02',
    name: 'Artisan Smoked Pepperoni Rustica',
    category: 'Pizzas',
    price: 469,
    description: 'Crisp cupping beef/pork pepperoni cups, crushed red pepper flakes, hot honey drizzle, aged parmesan, and Fior di Latte cheese.',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
    isVeg: false,
    spicyLevel: 2,
    rating: 4.9,
    reviewsCount: 512,
    prepTimeMinutes: 16,
    calories: 920,
    isPopular: true,
    options: {
      sizes: [
        { name: '10-inch Medium', extraPrice: 0 },
        { name: '12-inch Large', extraPrice: 120 },
      ],
      addOns: [
        { name: 'Double Pepperoni Cups', price: 75 },
        { name: 'Hot Honey Squeeze Bottle', price: 35 },
        { name: 'Garlic Butter Crust Brush', price: 25 },
      ],
    },
  },
  {
    id: 'piz-03',
    name: 'Wild Forest Truffle Mushroom',
    category: 'Pizzas',
    price: 439,
    description: 'Roasted portobello & button mushrooms, fontina & mozzarella cheese blend, white truffle oil, rosemary, and thyme flakes.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    spicyLevel: 0,
    rating: 4.7,
    reviewsCount: 195,
    prepTimeMinutes: 14,
    calories: 820,
    options: {
      sizes: [
        { name: '10-inch Medium', extraPrice: 0 },
        { name: '12-inch Large', extraPrice: 110 },
      ],
      addOns: [
        { name: 'Extra Truffle Drizzle', price: 40 },
        { name: 'Goat Cheese Crumble', price: 55 },
      ],
    },
  },
  {
    id: 'bowl-01',
    name: 'Awadhi Nizami Dum Biryani (Claypot)',
    category: 'Bowls & Biryani',
    price: 349,
    description: 'Aromatic long-grain basmati cooked on sealed coal dum with saffron, fragrant spices, tender marinated chunks, served with spiced burani raita and salan.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    isVeg: false,
    spicyLevel: 2,
    rating: 4.9,
    reviewsCount: 640,
    prepTimeMinutes: 15,
    calories: 740,
    isPopular: true,
    isChefSpecial: true,
    options: {
      sizes: [
        { name: 'Regular Pot (1 Person)', extraPrice: 0 },
        { name: 'Jumbo Handi (2 Persons)', extraPrice: 160 },
      ],
      addOns: [
        { name: 'Extra Boiled Egg', price: 20 },
        { name: 'Mirchi Ka Salan Bowl', price: 30 },
        { name: 'Extra Burani Garlic Raita', price: 25 },
      ],
    },
  },
  {
    id: 'bowl-02',
    name: 'Paneer Makhani & Butter Naan Bowl',
    category: 'Bowls & Biryani',
    price: 299,
    description: 'Charcoal-grilled soft cottage cheese cubes simmered in velvety cashew tomato gravy, jeera basmati rice, 2 mini butter naans, and pickled onions.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    spicyLevel: 1,
    rating: 4.8,
    reviewsCount: 390,
    prepTimeMinutes: 12,
    calories: 690,
    isPopular: true,
    options: {
      sizes: [
        { name: 'Standard Rice Bowl', extraPrice: 0 },
        { name: 'Royal Thali Combo (+Gulab Jamun)', extraPrice: 65 },
      ],
      addOns: [
        { name: 'Extra Butter Naan (2 pcs)', price: 45 },
        { name: 'Roasted Papad & Chutney', price: 20 },
      ],
    },
  },
  {
    id: 'wok-01',
    name: 'Wok-Tossed Chili Garlic Hakka Noodles',
    category: 'Asian Wok',
    price: 229,
    description: 'High-heat wok tossed egg/wheat noodles with crisp bell peppers, scallions, toasted sesame, garlic flakes, and dark soya reduction.',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    spicyLevel: 2,
    rating: 4.7,
    reviewsCount: 280,
    prepTimeMinutes: 10,
    calories: 520,
    options: {
      sizes: [
        { name: 'Regular Wok Box', extraPrice: 0 },
        { name: 'Large Sharing Box', extraPrice: 60 },
      ],
      addOns: [
        { name: 'Add Chili Chicken Bites', price: 65 },
        { name: 'Add Crispy Tofu Cubes', price: 45 },
        { name: 'Extra Schezwan Dip', price: 20 },
      ],
    },
  },
  {
    id: 'wok-02',
    name: 'Crystal Steamed Vegetable Dim Sum (6 pcs)',
    category: 'Asian Wok',
    price: 210,
    description: 'Handcrafted translucent dumplings packed with water chestnuts, shiitake mushrooms, bok choy, served with hot chili oil and sweet soya dip.',
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    spicyLevel: 1,
    rating: 4.8,
    reviewsCount: 210,
    prepTimeMinutes: 12,
    calories: 310,
    options: {
      sizes: [
        { name: '6 Dumplings Basket', extraPrice: 0 },
        { name: '10 Dumplings Basket', extraPrice: 85 },
      ],
      addOns: [
        { name: 'Crisp Garlic Chili Oil Jar', price: 30 },
      ],
    },
  },
  {
    id: 'bev-01',
    name: 'Belgian Dark Chocolate Ganache Shake',
    category: 'Beverages',
    price: 189,
    description: 'Crafted with 70% dark Belgian cocoa, vanilla bean ice cream, chocolate fudge swirls, and topped with chocolate curls.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    spicyLevel: 0,
    rating: 4.9,
    reviewsCount: 460,
    prepTimeMinutes: 6,
    calories: 440,
    isPopular: true,
    options: {
      sizes: [
        { name: 'Regular 350ml', extraPrice: 0 },
        { name: 'Large 500ml', extraPrice: 40 },
      ],
      addOns: [
        { name: 'Whipped Cream Top', price: 25 },
        { name: 'Espresso Shot (Mocha)', price: 30 },
      ],
    },
  },
  {
    id: 'bev-02',
    name: 'Sparkling Yuzu Mint Mojito Cooler',
    category: 'Beverages',
    price: 149,
    description: 'Zesty Japanese yuzu citrus extract, crushed spearmint leaves, cane sugar, fresh lime wedges, topped with fizzy club soda.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    spicyLevel: 0,
    rating: 4.8,
    reviewsCount: 315,
    prepTimeMinutes: 5,
    calories: 130,
    options: {
      sizes: [
        { name: 'Chilled Glass 400ml', extraPrice: 0 },
        { name: 'Pitcher 800ml', extraPrice: 90 },
      ],
      addOns: [
        { name: 'Chia Seeds Boost', price: 20 },
      ],
    },
  },
  {
    id: 'des-01',
    name: 'Sizzling Belgian Brownie with Gelato',
    category: 'Desserts',
    price: 219,
    description: 'Hot walnut brownie on a smoking cast-iron plate, topped with rich Tahitian vanilla bean gelato and pouring hot chocolate sauce.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    spicyLevel: 0,
    rating: 4.9,
    reviewsCount: 520,
    prepTimeMinutes: 8,
    calories: 580,
    isPopular: true,
    isChefSpecial: true,
    options: {
      sizes: [
        { name: 'Single Sizzler', extraPrice: 0 },
        { name: 'Double Scoop Sizzler', extraPrice: 50 },
      ],
      addOns: [
        { name: 'Roasted Almond Slivers', price: 25 },
        { name: 'Salted Caramel Drizzle', price: 25 },
      ],
    },
  },
  {
    id: 'des-02',
    name: 'New York Baked Blueberry Cheesecake',
    category: 'Desserts',
    price: 229,
    description: 'Classic velvety cream cheese slice on a golden buttery graham cracker crust, blanketed with wild Maine blueberry compote.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    isVeg: true,
    spicyLevel: 0,
    rating: 4.8,
    reviewsCount: 340,
    prepTimeMinutes: 5,
    calories: 490,
    options: {
      sizes: [
        { name: 'Single Slice', extraPrice: 0 },
        { name: 'Double Slice Duo', extraPrice: 190 },
      ],
    },
  },
];
