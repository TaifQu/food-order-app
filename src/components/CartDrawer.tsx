import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Tag, 
  ArrowRight, 
  ShoppingBag, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { CartItem } from '../types/order';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  couponCode: string;
  setCouponCode: (c: string) => void;
  discountAmount: number;
  onApplyCoupon: (code: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  couponCode,
  setCouponCode,
  discountAmount,
  onApplyCoupon,
  onProceedToCheckout,
}) => {
  const [couponInput, setCouponInput] = useState(couponCode);
  const [couponFeedback, setCouponFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const packagingFee = subtotal > 499 ? 0 : 20;
  const grandTotal = Math.max(0, subtotal + tax + packagingFee - discountAmount);

  const handleApply = (codeToApply: string) => {
    const code = codeToApply.trim().toUpperCase();
    if (code === 'STUDENT20') {
      onApplyCoupon('STUDENT20');
      setCouponFeedback('Student 20% discount applied!');
    } else if (code === 'ROLL41') {
      onApplyCoupon('ROLL41');
      setCouponFeedback('Lead Roll No 41 Special 41% discount applied!');
    } else {
      setCouponFeedback('Invalid coupon code. Try STUDENT20 or ROLL41');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/70 backdrop-blur-xs">
      <div 
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-stone-900 border-l border-stone-800 shadow-2xl flex flex-col text-stone-200">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-stone-800 flex items-center justify-between bg-stone-950">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-tight">Your Order Tray</h2>
                <div className="text-xs text-stone-400">
                  {items.length} {items.length === 1 ? 'item' : 'items'} selected
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-stone-850 hover:bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-stone-800 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-white">Your tray is empty</h3>
                <p className="text-xs text-stone-400 max-w-xs mx-auto">
                  Add some hot burgers, pizzas, or refreshing beverages from our food menu.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-4 py-2 bg-amber-500 text-stone-950 font-bold rounded-xl text-xs hover:bg-amber-400 cursor-pointer transition-colors"
                >
                  Explore Food Menu
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-stone-850/80 rounded-xl p-3.5 border border-stone-800 flex flex-col gap-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <span
                        className={`inline-block w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${
                          item.menuItem.isVeg ? 'bg-emerald-500' : 'bg-red-500'
                        }`}
                      />
                      <div>
                        <div className="font-semibold text-white text-sm">{item.menuItem.name}</div>
                        {item.selectedSize && (
                          <div className="text-xs text-stone-400">
                            Size: <span className="text-stone-300 font-medium">{item.selectedSize.name}</span>
                          </div>
                        )}
                        {item.selectedAddOns.length > 0 && (
                          <div className="text-xs text-stone-400">
                            Add-ons: {item.selectedAddOns.map((a) => a.name).join(', ')}
                          </div>
                        )}
                        {item.specialInstructions && (
                          <div className="text-[11px] text-amber-400/90 italic">
                            Note: &quot;{item.specialInstructions}&quot;
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-stone-500 hover:text-red-400 p-1 rounded transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-800">
                    <div className="flex items-center gap-2 bg-stone-900 border border-stone-700/80 rounded-lg p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-stone-400 hover:text-white cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center font-mono text-xs font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-stone-400 hover:text-white cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="font-mono font-bold text-sm text-white">
                      ₹{item.totalPrice}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Breakdown */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 bg-stone-950 border-t border-stone-800 space-y-4">
              {/* Promo code bar */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                    <input
                      type="text"
                      placeholder="Enter promo coupon code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="w-full bg-stone-900 border border-stone-800 text-stone-200 placeholder-stone-500 pl-8 pr-3 py-1.5 rounded-lg text-xs font-mono uppercase focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <button
                    onClick={() => handleApply(couponInput)}
                    className="px-3 py-1.5 bg-stone-800 hover:bg-stone-750 text-amber-400 border border-stone-700 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {/* Quick Coupon Suggestions */}
                <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                  <span>Try:</span>
                  <button
                    onClick={() => {
                      setCouponInput('STUDENT20');
                      handleApply('STUDENT20');
                    }}
                    className="text-amber-400 underline font-mono cursor-pointer"
                  >
                    STUDENT20 (20%)
                  </button>
                  <span>·</span>
                  <button
                    onClick={() => {
                      setCouponInput('ROLL41');
                      handleApply('ROLL41');
                    }}
                    className="text-amber-400 underline font-mono cursor-pointer font-bold"
                  >
                    ROLL41 (41%)
                  </button>
                </div>

                {couponFeedback && (
                  <div className="text-[11px] text-amber-400 flex items-center gap-1">
                    <Check className="w-3 h-3" /> {couponFeedback}
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-400 pt-2 border-t border-stone-800/80">
                <div className="flex justify-between">
                  <span>Item Subtotal</span>
                  <span className="font-mono text-stone-200">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST &amp; Restaurant Tax (5%)</span>
                  <span className="font-mono text-stone-200">₹{tax}</span>
                </div>
                <div className="flex justify-between">
                  <span>Packaging &amp; Table Service</span>
                  <span className="font-mono text-stone-200">
                    {packagingFee === 0 ? <span className="text-emerald-400">FREE</span> : `₹${packagingFee}`}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount Coupon ({couponCode})</span>
                    <span className="font-mono">-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-stone-800">
                  <span>Grand Total</span>
                  <span className="font-mono text-amber-400 text-base">₹{grandTotal}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={onProceedToCheckout}
                className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all active:scale-[0.99] flex items-center justify-between cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <span className="flex items-center gap-1 font-mono">
                  ₹{grandTotal} <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </button>

              <div className="flex items-center justify-center gap-1 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Contactless UPI / Cash on Counter / Quick Handover</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
