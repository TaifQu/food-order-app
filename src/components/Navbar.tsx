import React from 'react';
import { 
  UtensilsCrossed, 
  ShoppingBag, 
  ChefHat, 
  Activity, 
  Search, 
  MapPin, 
  FileText,
  Clock
} from 'lucide-react';
import { OrderType } from '../types/order';

interface NavbarProps {
  activeTab: 'menu' | 'kitchen' | 'devops' | 'report';
  setActiveTab: (tab: 'menu' | 'kitchen' | 'devops' | 'report') => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  orderType: OrderType;
  setOrderType: (t: OrderType) => void;
  tableNumber: string;
  setTableNumber: (t: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  cartTotal,
  onOpenCart,
  searchQuery,
  setSearchQuery,
  orderType,
  setOrderType,
  tableNumber,
  setTableNumber,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-900 border-b border-stone-800 text-stone-100 shadow-md">
      {/* Top Academic & Project Announcement Strip */}
      <div className="bg-amber-600 text-stone-950 px-4 py-1.5 text-xs font-medium flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="font-bold tracking-wider uppercase">Project: Food Order Menu</span>
          <span>·</span>
          <span>Group: <strong>SEP-G1</strong></span>
          <span>·</span>
          <span>Lead Roll No: <strong>41</strong> (Team: 41, 9, 44, 48, 49)</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-stone-950 font-semibold">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Prometheus Target: UP
          </span>
          <button
            onClick={() => setActiveTab('devops')}
            className="underline hover:text-white transition-colors cursor-pointer text-xs"
          >
            DevOps &amp; Submission Hub →
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('menu')}>
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-black shadow-lg">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                QuickBite <span className="text-xs px-2 py-0.5 rounded bg-stone-800 text-amber-400 font-mono">SEP-G1</span>
              </div>
              <div className="text-xs text-stone-400">Campus Kitchen &amp; Food Order System</div>
            </div>
          </div>

          {/* Search Bar (Only when on menu) */}
          {activeTab === 'menu' && (
            <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search burgers, pizzas, biryani, noodles, shakes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-800/80 text-sm text-stone-100 placeholder-stone-400 pl-9 pr-4 py-2 rounded-lg border border-stone-700 focus:outline-none focus:border-amber-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          )}

          {/* Primary View Switcher Navigation */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('menu')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeTab === 'menu'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Menu</span>
            </button>

            <button
              onClick={() => setActiveTab('kitchen')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeTab === 'kitchen'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <ChefHat className="w-4 h-4" />
              <span>Kitchen (KDS)</span>
            </button>

            <button
              onClick={() => setActiveTab('devops')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeTab === 'devops'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>DevOps Hub</span>
            </button>

            <button
              onClick={() => setActiveTab('report')}
              className={`hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeTab === 'report'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>PDF Report</span>
            </button>
          </nav>

          {/* Cart Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 px-4 py-2 rounded-lg font-semibold text-sm transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-stone-950 text-amber-400 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold border border-amber-400">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-mono">₹{cartTotal}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Order Type & Dining Sub-bar */}
      {activeTab === 'menu' && (
        <div className="bg-stone-950/60 border-t border-stone-800/80 px-4 py-2 text-xs text-stone-300">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-stone-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" /> Dining Mode:
              </span>
              <div className="inline-flex rounded-md p-0.5 bg-stone-800">
                <button
                  onClick={() => setOrderType('dine_in')}
                  className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                    orderType === 'dine_in' ? 'bg-amber-500 text-stone-950' : 'text-stone-300 hover:text-white'
                  }`}
                >
                  Dine-In
                </button>
                <button
                  onClick={() => setOrderType('takeaway')}
                  className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                    orderType === 'takeaway' ? 'bg-amber-500 text-stone-950' : 'text-stone-300 hover:text-white'
                  }`}
                >
                  Takeaway
                </button>
                <button
                  onClick={() => setOrderType('campus_delivery')}
                  className={`px-2.5 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
                    orderType === 'campus_delivery' ? 'bg-amber-500 text-stone-950' : 'text-stone-300 hover:text-white'
                  }`}
                >
                  Campus Delivery
                </button>
              </div>

              {orderType === 'dine_in' && (
                <div className="flex items-center gap-1.5 ml-2">
                  <span className="text-stone-400">Table:</span>
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="T-04"
                    className="w-16 bg-stone-800 border border-stone-700 text-amber-400 px-2 py-0.5 rounded text-xs font-mono focus:outline-none focus:border-amber-500 text-center"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 text-stone-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Avg Prep: <strong>12-15 mins</strong>
              </span>
              <span>·</span>
              <span>Student Discount: Use code <strong className="text-amber-400 font-mono">STUDENT20</strong> or <strong className="text-amber-400 font-mono">ROLL41</strong></span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
