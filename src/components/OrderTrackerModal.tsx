import React from 'react';
import { 
  X, 
  CheckCircle, 
  Clock, 
  Printer, 
  ChefHat, 
  PackageCheck, 
  Sparkles,
  MapPin,
  UtensilsCrossed
} from 'lucide-react';
import { FoodOrder } from '../types/order';

interface OrderTrackerModalProps {
  order: FoodOrder | null;
  onClose: () => void;
  onUpdateStatus?: (status: FoodOrder['status']) => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  order,
  onClose,
  onUpdateStatus,
}) => {
  if (!order) return null;

  const steps = [
    { key: 'placed', label: 'Order Received', desc: 'Sent to Kitchen Display' },
    { key: 'kitchen_prep', label: 'Chef Cooking', desc: 'Fresh on grill & stove' },
    { key: 'quality_check', label: 'Quality & Plating', desc: 'Temperature & garnish' },
    { key: 'ready', label: 'Ready for Pickup', desc: 'Call token on counter' },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === order.status);
  const activeIndex = currentStepIndex >= 0 ? currentStepIndex : 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-xs">
      <div 
        className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">Order #{order.id}</h3>
                <span className="bg-amber-500 text-stone-950 text-xs px-2 py-0.5 rounded-full font-mono font-bold">
                  Token #{order.tokenNumber}
                </span>
              </div>
              <div className="text-xs text-stone-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Estimated Time: <strong>12-14 mins</strong>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-stone-850 hover:bg-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Print Receipt Bill"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-stone-850 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm text-stone-300">
          {/* Live Kitchen Status Progress Bar */}
          <div className="bg-stone-850/80 border border-stone-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white">Live Kitchen Order Tracker</span>
              <span className="text-amber-400 font-mono font-medium flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                In Progress
              </span>
            </div>

            {/* Stepper */}
            <div className="relative pt-2">
              <div className="grid grid-cols-4 gap-2 relative z-10">
                {steps.map((step, idx) => {
                  const isDone = idx < activeIndex;
                  const isCurrent = idx === activeIndex;
                  return (
                    <div key={step.key} className="flex flex-col items-center text-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-1.5 transition-all ${
                          isDone
                            ? 'bg-emerald-500 text-stone-950'
                            : isCurrent
                            ? 'bg-amber-500 text-stone-950 ring-4 ring-amber-500/20'
                            : 'bg-stone-800 text-stone-500'
                        }`}
                      >
                        {isDone ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                      </div>
                      <div className={`text-[11px] font-semibold leading-tight ${isCurrent ? 'text-amber-400' : isDone ? 'text-white' : 'text-stone-500'}`}>
                        {step.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Progress Line */}
              <div className="absolute top-6 left-6 right-6 h-0.5 bg-stone-800 -z-0">
                <div
                  className="h-full bg-amber-500 transition-all duration-300"
                  style={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
                />
              </div>
            </div>

            {/* Interactive test stepper button for teacher demo */}
            {onUpdateStatus && (
              <div className="pt-2 flex items-center justify-between text-[11px] text-stone-400 border-t border-stone-800">
                <span>Demo Advance Step:</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => onUpdateStatus('kitchen_prep')}
                    className="px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-750 text-stone-300 cursor-pointer"
                  >
                    Prep
                  </button>
                  <button
                    onClick={() => onUpdateStatus('quality_check')}
                    className="px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-750 text-stone-300 cursor-pointer"
                  >
                    QC
                  </button>
                  <button
                    onClick={() => onUpdateStatus('ready')}
                    className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/80 cursor-pointer"
                  >
                    Ready!
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Receipt Details Printable Container */}
          <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 space-y-4 print:text-black print:bg-white">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <div className="font-bold text-white text-base">QuickBite Campus Kitchen</div>
                <div className="text-[11px] text-stone-400">Project SEP-G1 · Roll No 41 (Leader)</div>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-stone-400">Date &amp; Time</div>
                <div className="text-xs font-mono text-stone-300">{new Date(order.createdAt).toLocaleTimeString()}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-stone-400">
              <div>
                Customer: <span className="text-white font-medium">{order.customerName}</span>
              </div>
              <div>
                Roll No: <span className="text-amber-400 font-mono font-medium">{order.rollNumber}</span>
              </div>
              <div>
                Dining Mode: <span className="text-white font-medium capitalize">{order.orderType.replace('_', ' ')}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-stone-500" />
                <span className="text-white truncate">{order.tableOrLocation}</span>
              </div>
            </div>

            {/* Items Table */}
            <div className="space-y-2 pt-2 border-t border-stone-800">
              <div className="text-xs font-semibold text-white">Ordered Items</div>
              <div className="space-y-1.5">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-medium text-stone-200">{item.quantity}x {item.menuItem.name}</span>
                      {item.selectedSize && <span className="text-stone-500 text-[11px] ml-1">({item.selectedSize.name})</span>}
                    </div>
                    <span className="font-mono text-stone-300">₹{item.totalPrice}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="space-y-1 pt-2 border-t border-stone-800 text-xs text-stone-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-stone-200">₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span className="font-mono text-stone-200">₹{order.tax}</span>
              </div>
              {order.packagingFee > 0 && (
                <div className="flex justify-between">
                  <span>Service / Packaging</span>
                  <span className="font-mono text-stone-200">₹{order.packagingFee}</span>
                </div>
              )}
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount ({order.couponCode || 'PROMO'})</span>
                  <span className="font-mono">-₹{order.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-white pt-1.5 border-t border-stone-800">
                <span>Total Paid</span>
                <span className="font-mono text-amber-400 text-base">₹{order.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between">
          <div className="text-xs text-stone-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Show token #{order.tokenNumber} at counter</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-750 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
          >
            Close &amp; Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};
