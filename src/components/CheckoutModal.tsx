import React, { useState } from 'react';
import { 
  X, 
  QrCode, 
  CreditCard, 
  Banknote, 
  MapPin, 
  User, 
  Phone, 
  CheckCircle2, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { CartItem, FoodOrder, OrderType, PaymentMethod } from '../types/order';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  orderType: OrderType;
  tableNumber: string;
  subtotal: number;
  tax: number;
  packagingFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  onOrderPlaced: (order: FoodOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  orderType,
  tableNumber,
  subtotal,
  tax,
  packagingFee,
  discount,
  couponCode,
  total,
  onOrderPlaced,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('Taif Qureshi');
  const [rollNumber, setRollNumber] = useState('41');
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [locationDetails, setLocationDetails] = useState(
    orderType === 'dine_in' ? `Table ${tableNumber || 'T-04'}` : orderType === 'takeaway' ? 'Main Counter Pickup' : 'Hostel Block B, Room 204'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `ORD-41${Math.floor(100 + Math.random() * 900)}`;
      const tokenNumber = Math.floor(10 + Math.random() * 90);

      const newOrder: FoodOrder = {
        id: orderId,
        tokenNumber,
        createdAt: new Date().toISOString(),
        customerName: customerName.trim() || 'Student Customer',
        rollNumber: rollNumber.trim() || '41',
        phoneNumber: phoneNumber.trim() || '9876543210',
        orderType,
        tableOrLocation: locationDetails,
        paymentMethod,
        paymentStatus: 'paid',
        items: [...items],
        subtotal,
        tax,
        packagingFee,
        discount,
        couponCode,
        total,
        status: 'placed',
        estimatedMinutes: 14,
      };

      setIsSubmitting(false);
      onOrderPlaced(newOrder);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs">
      <div 
        className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Complete Food Order</h3>
              <div className="text-xs text-stone-400">Review details &amp; payment method</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-stone-850 hover:bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-5 flex-1 text-xs sm:text-sm text-stone-300">
          {/* Student / Customer Identification */}
          <div className="space-y-3">
            <div className="font-semibold text-white flex items-center justify-between">
              <span>Customer / Student Details</span>
              <span className="text-[11px] text-amber-400 font-mono">Group SEP-G1 Verification</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-400 text-xs mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-stone-850 border border-stone-700/80 rounded-xl pl-8 pr-3 py-2 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-400 text-xs mb-1">Roll Number / Student ID</label>
                <input
                  type="text"
                  required
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  placeholder="Roll 41"
                  className="w-full bg-stone-850 border border-stone-700/80 rounded-xl px-3 py-2 text-amber-400 font-mono text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-400 text-xs mb-1">Phone Number (For SMS updates)</label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-stone-850 border border-stone-700/80 rounded-xl pl-8 pr-3 py-2 text-stone-100 text-xs font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-400 text-xs mb-1">Delivery / Table Spot</label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                  <input
                    type="text"
                    required
                    value={locationDetails}
                    onChange={(e) => setLocationDetails(e.target.value)}
                    className="w-full bg-stone-850 border border-stone-700/80 rounded-xl pl-8 pr-3 py-2 text-stone-100 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3 pt-2 border-t border-stone-800">
            <div className="font-semibold text-white">Select Payment Mode</div>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'upi'
                    ? 'border-amber-500 bg-amber-500/10 text-white'
                    : 'border-stone-800 bg-stone-850 text-stone-400 hover:text-white'
                }`}
              >
                <QrCode className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-semibold">UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-amber-500 bg-amber-500/10 text-white'
                    : 'border-stone-800 bg-stone-850 text-stone-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-5 h-5 text-sky-400" />
                <span className="text-xs font-semibold">Debit/Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  paymentMethod === 'cash'
                    ? 'border-amber-500 bg-amber-500/10 text-white'
                    : 'border-stone-800 bg-stone-850 text-stone-400 hover:text-white'
                }`}
              >
                <Banknote className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-semibold">Counter Cash</span>
              </button>
            </div>

            {/* UPI QR Display if UPI is selected */}
            {paymentMethod === 'upi' && (
              <div className="p-3 bg-stone-850 border border-stone-800 rounded-xl flex items-center gap-3">
                <div className="w-16 h-16 bg-white p-1 rounded-lg shrink-0 flex items-center justify-center">
                  <div className="grid grid-cols-4 gap-0.5 w-full h-full p-1 bg-stone-900 rounded">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div
                        key={i}
                        className={`${(i % 2 === 0 || i % 3 === 0) ? 'bg-white' : 'bg-transparent'}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-xs space-y-0.5">
                  <div className="font-semibold text-white">Scan &amp; Pay Instant UPI</div>
                  <div className="text-stone-400">VPA: <span className="text-amber-400 font-mono">quickbite.campus@okhdfcbank</span></div>
                  <div className="text-[11px] text-stone-500">Auto-approved upon placing order</div>
                </div>
              </div>
            )}
          </div>

          {/* Items Summary in Checkout */}
          <div className="space-y-2 pt-2 border-t border-stone-800">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span>Items in Order ({items.length})</span>
              <span className="font-mono text-stone-300">Total: ₹{total}</span>
            </div>
            <div className="max-h-24 overflow-y-auto space-y-1 pr-1">
              {items.map((i) => (
                <div key={i.id} className="text-xs flex justify-between text-stone-400">
                  <span className="truncate max-w-[240px]">{i.quantity}x {i.menuItem.name}</span>
                  <span className="font-mono text-stone-200">₹{i.totalPrice}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Place Order CTA Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Transmitting to Kitchen...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm &amp; Place Food Order (₹{total})</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Telemetry event broadcasted to Prometheus /metrics for SEP-G1 monitoring</span>
          </div>
        </form>
      </div>
    </div>
  );
};
