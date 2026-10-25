import React, { useState } from 'react';
import { X, Flame, Plus, Minus, Check, Sparkles } from 'lucide-react';
import { MenuItem } from '../data/menuData';
import { CartItem } from '../types/order';

interface ItemCustomizerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const ItemCustomizerModal: React.FC<ItemCustomizerModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const defaultSize = item.options?.sizes?.[0];
  const [selectedSize, setSelectedSize] = useState<{ name: string; extraPrice: number } | undefined>(
    defaultSize
  );
  const [selectedAddOns, setSelectedAddOns] = useState<{ name: string; price: number }[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [spicyAdjustment, setSpicyAdjustment] = useState(item.spicyLevel);

  const toggleAddOn = (addOn: { name: string; price: number }) => {
    if (selectedAddOns.some((a) => a.name === addOn.name)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a.name !== addOn.name));
    } else {
      setSelectedAddOns([...selectedAddOns, addOn]);
    }
  };

  const unitBasePrice = item.price;
  const sizeExtra = selectedSize ? selectedSize.extraPrice : 0;
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const unitTotalPrice = unitBasePrice + sizeExtra + addOnsTotal;
  const finalTotalPrice = unitTotalPrice * quantity;

  const handleConfirm = () => {
    const cartItem: CartItem = {
      id: `${item.id}-${selectedSize?.name || 'std'}-${selectedAddOns.map((a) => a.name).join('-')}-${Date.now()}`,
      menuItem: item,
      quantity,
      selectedSize,
      selectedAddOns,
      specialInstructions: specialInstructions.trim() || undefined,
      unitPrice: unitTotalPrice,
      totalPrice: finalTotalPrice,
    };
    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
      <div 
        className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image & Close */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-stone-950">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent"></div>
          
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-3 left-4 right-4">
            <div className="flex items-center gap-2 mb-1">
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-red-500'}`} />
              <span className="text-xs font-medium text-stone-300 uppercase tracking-wider">{item.category}</span>
              {item.isChefSpecial && (
                <span className="text-xs text-amber-400 flex items-center gap-1 font-medium">
                  <Sparkles className="w-3 h-3" /> Chef’s Special
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight leading-snug">{item.name}</h3>
          </div>
        </div>

        {/* Scrollable Customization Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-sm text-stone-300">
          <p className="text-stone-400 leading-relaxed text-xs sm:text-sm">{item.description}</p>

          {/* Size Options */}
          {item.options?.sizes && item.options.sizes.length > 0 && (
            <div>
              <div className="font-semibold text-white mb-2 flex items-center justify-between">
                <span>Select Portion Size</span>
                <span className="text-xs text-stone-400">Required</span>
              </div>
              <div className="space-y-2">
                {item.options.sizes.map((size) => {
                  const isSelected = selectedSize?.name === size.name;
                  return (
                    <div
                      key={size.name}
                      onClick={() => setSelectedSize(size)}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/10 text-white'
                          : 'border-stone-800 bg-stone-850 hover:border-stone-700 text-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-amber-500 bg-amber-500' : 'border-stone-600'}`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-stone-950" />}
                        </div>
                        <span className="font-medium">{size.name}</span>
                      </div>
                      <span className="font-mono text-xs text-amber-400">
                        {size.extraPrice === 0 ? 'Standard' : `+₹${size.extraPrice}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add-ons */}
          {item.options?.addOns && item.options.addOns.length > 0 && (
            <div>
              <div className="font-semibold text-white mb-2 flex items-center justify-between">
                <span>Customize &amp; Extra Toppings</span>
                <span className="text-xs text-stone-400">Optional</span>
              </div>
              <div className="space-y-2">
                {item.options.addOns.map((addOn) => {
                  const isChecked = selectedAddOns.some((a) => a.name === addOn.name);
                  return (
                    <div
                      key={addOn.name}
                      onClick={() => toggleAddOn(addOn)}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                        isChecked
                          ? 'border-amber-500 bg-amber-500/10 text-white'
                          : 'border-stone-800 bg-stone-850 hover:border-stone-700 text-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${isChecked ? 'border-amber-500 bg-amber-500 text-stone-950' : 'border-stone-600'}`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="font-medium">{addOn.name}</span>
                      </div>
                      <span className="font-mono text-xs text-amber-400">+₹{addOn.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spice Level Adjuster */}
          <div>
            <div className="font-semibold text-white mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-400" /> Spice Level
              </span>
              <span className="text-xs text-stone-400">
                {spicyAdjustment === 0 ? 'Mild' : spicyAdjustment === 1 ? 'Medium' : spicyAdjustment === 2 ? 'Spicy' : 'Extra Hot 🔥'}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSpicyAdjustment(lvl as any)}
                  className={`py-2 rounded-lg text-xs font-medium border cursor-pointer transition-colors ${
                    spicyAdjustment === lvl
                      ? 'border-amber-500 bg-amber-500/15 text-amber-400'
                      : 'border-stone-800 bg-stone-850 text-stone-400 hover:text-white'
                  }`}
                >
                  {lvl === 0 ? 'Mild' : lvl === 1 ? 'Medium' : lvl === 2 ? 'Spicy 🌶️' : 'Fiery 🌶️🌶️'}
                </button>
              ))}
            </div>
          </div>

          {/* Chef Special Notes */}
          <div>
            <label className="block font-semibold text-white mb-1.5">Special Instructions for Kitchen</label>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Extra napkins, sauce on the side, well-done bun..."
              rows={2}
              className="w-full bg-stone-850 border border-stone-800 text-stone-200 placeholder-stone-500 rounded-xl p-2.5 text-xs focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>
        </div>

        {/* Footer with Quantity & Add Button */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-stone-850 border border-stone-800 rounded-xl p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-white disabled:opacity-30 cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center font-mono font-bold text-white text-sm">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-white cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleConfirm}
            className="flex-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-3 px-5 rounded-xl shadow-lg transition-all active:scale-[0.99] flex items-center justify-between cursor-pointer"
          >
            <span>Add to Order</span>
            <span className="font-mono text-base">₹{finalTotalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
