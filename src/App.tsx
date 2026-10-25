import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { MenuSection } from './components/MenuSection';
import { ItemCustomizerModal } from './components/ItemCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { KitchenDisplayView } from './components/KitchenDisplayView';
import { DevOpsProjectHub } from './components/DevOpsProjectHub';
import { ProjectReportView } from './components/ProjectReportView';
import { MENU_ITEMS, MenuItem } from './data/menuData';
import { CartItem, FoodOrder, OrderStatus, OrderType } from './types/order';
import { metricsService } from './services/metricsService';
import { UtensilsCrossed, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'menu' | 'kitchen' | 'devops' | 'report'>('menu');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<FoodOrder | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [orderType, setOrderType] = useState<OrderType>('dine_in');
  const [tableNumber, setTableNumber] = useState('T-04');
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  // Initial orders queue
  const [orders, setOrders] = useState<FoodOrder[]>([
    {
      id: 'ORD-4101',
      tokenNumber: 41,
      createdAt: new Date(Date.now() - 600000).toISOString(),
      customerName: 'Taif Qureshi (Roll 41)',
      rollNumber: '41',
      phoneNumber: '9876543210',
      orderType: 'dine_in',
      tableOrLocation: 'Table T-04',
      paymentMethod: 'upi',
      paymentStatus: 'paid',
      items: [
        {
          id: 'sample-1',
          menuItem: MENU_ITEMS[0], // Truffle Smash Burger
          quantity: 2,
          selectedSize: { name: 'Double Smash Patty', extraPrice: 60 },
          selectedAddOns: [{ name: 'Extra Melted Cheddar', price: 35 }],
          unitPrice: 344,
          totalPrice: 688,
        },
      ],
      subtotal: 688,
      tax: 34,
      packagingFee: 0,
      discount: 140,
      couponCode: 'STUDENT20',
      total: 582,
      status: 'kitchen_prep',
      estimatedMinutes: 8,
    },
    {
      id: 'ORD-4102',
      tokenNumber: 42,
      createdAt: new Date(Date.now() - 300000).toISOString(),
      customerName: 'Student Hosteler',
      rollNumber: '9',
      phoneNumber: '9811223344',
      orderType: 'takeaway',
      tableOrLocation: 'Counter Pickup',
      paymentMethod: 'cash',
      paymentStatus: 'paid',
      items: [
        {
          id: 'sample-2',
          menuItem: MENU_ITEMS[3], // San Marzano Margherita
          quantity: 1,
          selectedSize: { name: '10-inch Medium', extraPrice: 0 },
          selectedAddOns: [],
          unitPrice: 389,
          totalPrice: 389,
        },
      ],
      subtotal: 389,
      tax: 19,
      packagingFee: 20,
      discount: 0,
      total: 428,
      status: 'placed',
      estimatedMinutes: 14,
    },
  ]);

  // Cart calculations
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const cartTax = Math.round(cartSubtotal * 0.05);
  const cartPackaging = cartSubtotal > 499 ? 0 : 20;
  const cartGrandTotal = Math.max(0, cartSubtotal + cartTax + cartPackaging - discountAmount);

  // Cart Actions
  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => {
      // Check if exact same item with same options exists
      const existingIdx = prev.findIndex(
        (p) =>
          p.menuItem.id === item.menuItem.id &&
          p.selectedSize?.name === item.selectedSize?.name &&
          p.selectedAddOns.map((a) => a.name).sort().join(',') ===
            item.selectedAddOns.map((a) => a.name).sort().join(',') &&
          p.specialInstructions === item.specialInstructions
      );

      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx].quantity += item.quantity;
        copy[existingIdx].totalPrice = copy[existingIdx].quantity * copy[existingIdx].unitPrice;
        return copy;
      }
      return [...prev, item];
    });
    metricsService.recordRequest('/api/cart/add', 'POST', 200, 3.2);
  };

  const handleQuickAdd = (menuItem: MenuItem) => {
    const defaultSize = menuItem.options?.sizes?.[0];
    const unitPrice = menuItem.price + (defaultSize ? defaultSize.extraPrice : 0);
    const newCartItem: CartItem = {
      id: `${menuItem.id}-quick-${Date.now()}`,
      menuItem,
      quantity: 1,
      selectedSize: defaultSize,
      selectedAddOns: [],
      unitPrice,
      totalPrice: unitPrice,
    };
    handleAddToCart(newCartItem);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQty,
              totalPrice: newQty * item.unitPrice,
            }
          : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleApplyCoupon = (code: string) => {
    setCouponCode(code);
    if (code === 'STUDENT20') {
      const discount = Math.round(cartSubtotal * 0.2);
      setDiscountAmount(discount);
    } else if (code === 'ROLL41') {
      const discount = Math.round(cartSubtotal * 0.41);
      setDiscountAmount(discount);
    }
  };

  // Order Flow Handlers
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderPlaced = (newOrder: FoodOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    metricsService.recordOrder(newOrder.total);
    setCartItems([]);
    setDiscountAmount(0);
    setCouponCode('');
    setIsCheckoutOpen(false);
    setActiveTrackingOrder(newOrder);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) => {
      const updated = prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
      const activeCount = updated.filter((o) => o.status !== 'delivered').length;
      metricsService.updateActiveOrders(activeCount);
      return updated;
    });

    if (activeTrackingOrder && activeTrackingOrder.id === orderId) {
      setActiveTrackingOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Global Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        cartTotal={cartGrandTotal}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        orderType={orderType}
        setOrderType={setOrderType}
        tableNumber={tableNumber}
        setTableNumber={setTableNumber}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'menu' && (
          <MenuSection
            items={MENU_ITEMS}
            searchQuery={searchQuery}
            onSelectItem={(item) => setCustomizingItem(item)}
            onQuickAdd={handleQuickAdd}
          />
        )}

        {activeTab === 'kitchen' && (
          <KitchenDisplayView
            orders={orders}
            onUpdateStatus={handleUpdateOrderStatus}
          />
        )}

        {activeTab === 'devops' && <DevOpsProjectHub />}

        {activeTab === 'report' && <ProjectReportView />}
      </main>

      {/* Item Customizer Modal */}
      <ItemCustomizerModal
        item={customizingItem}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-in Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        couponCode={couponCode}
        setCouponCode={setCouponCode}
        discountAmount={discountAmount}
        onApplyCoupon={handleApplyCoupon}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        orderType={orderType}
        tableNumber={tableNumber}
        subtotal={cartSubtotal}
        tax={cartTax}
        packagingFee={cartPackaging}
        discount={discountAmount}
        couponCode={couponCode}
        total={cartGrandTotal}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Active Order Tracker / Receipt Modal */}
      <OrderTrackerModal
        order={activeTrackingOrder}
        onClose={() => setActiveTrackingOrder(null)}
        onUpdateStatus={(newStatus) => {
          if (activeTrackingOrder) {
            handleUpdateOrderStatus(activeTrackingOrder.id, newStatus);
          }
        }}
      />

      {/* Minimalistic Academic Footer (No AI Studio branding) */}
      <footer className="bg-stone-950 border-t border-stone-850 py-8 px-4 text-xs text-stone-500 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <UtensilsCrossed className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-stone-300">QuickBite Food Order System</span>
            <span>·</span>
            <span>Group SEP-G1</span>
            <span>·</span>
            <span>Documentation &amp; Project Lead: Roll No. 41</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <span>Containerized via Docker</span>
            <span>·</span>
            <span>Monitored with Prometheus &amp; Grafana</span>
            <span>·</span>
            <button
              onClick={() => setActiveTab('devops')}
              className="text-amber-400 hover:underline cursor-pointer"
            >
              DevOps Checklist
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
