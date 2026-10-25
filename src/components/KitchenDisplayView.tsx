import React from 'react';
import { 
  ChefHat, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Flame, 
  RotateCw,
  Bell,
  Utensils
} from 'lucide-react';
import { FoodOrder, OrderStatus } from '../types/order';

interface KitchenDisplayViewProps {
  orders: FoodOrder[];
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
}

export const KitchenDisplayView: React.FC<KitchenDisplayViewProps> = ({
  orders,
  onUpdateStatus,
}) => {
  const pendingOrders = orders.filter((o) => o.status === 'placed');
  const inPrepOrders = orders.filter((o) => o.status === 'kitchen_prep' || o.status === 'quality_check');
  const readyOrders = orders.filter((o) => o.status === 'ready');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top KDS Stats Bar */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              Kitchen Display System (KDS)
              <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-mono">
                LIVE
              </span>
            </h2>
            <p className="text-xs text-stone-400">
              Kitchen Ticket Management · Real-time status sync with Prometheus telemetry
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="bg-stone-850 px-3.5 py-2 rounded-xl border border-stone-800 text-center">
            <div className="text-stone-400 text-[10px] uppercase">New Queue</div>
            <div className="text-base font-bold text-amber-400">{pendingOrders.length}</div>
          </div>
          <div className="bg-stone-850 px-3.5 py-2 rounded-xl border border-stone-800 text-center">
            <div className="text-stone-400 text-[10px] uppercase">Cooking</div>
            <div className="text-base font-bold text-sky-400">{inPrepOrders.length}</div>
          </div>
          <div className="bg-stone-850 px-3.5 py-2 rounded-xl border border-stone-800 text-center">
            <div className="text-stone-400 text-[10px] uppercase">Ready</div>
            <div className="text-base font-bold text-emerald-400">{readyOrders.length}</div>
          </div>
        </div>
      </div>

      {/* 3-Column Kitchen Lanes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Incoming / Placed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-amber-500/40">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <h3 className="font-bold text-white text-sm uppercase tracking-wider">
                1. New Incoming ({pendingOrders.length})
              </h3>
            </div>
            <span className="text-xs text-stone-400">Needs acceptance</span>
          </div>

          <div className="space-y-3">
            {pendingOrders.length === 0 ? (
              <div className="p-8 text-center bg-stone-900/40 rounded-xl border border-stone-800 text-xs text-stone-500">
                No new orders waiting. Kitchen caught up!
              </div>
            ) : (
              pendingOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-stone-900 border border-amber-500/40 rounded-xl p-4 space-y-3 shadow-md"
                >
                  <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                    <span className="text-lg font-mono font-bold text-amber-400">
                      Token #{order.tokenNumber}
                    </span>
                    <span className="text-[11px] text-stone-400 font-mono">
                      {order.id} · {order.orderType.toUpperCase()}
                    </span>
                  </div>

                  <div className="text-xs text-stone-300 space-y-1">
                    <div className="font-semibold text-white">
                      {order.customerName} ({order.tableOrLocation})
                    </div>
                    <div className="text-stone-400">Roll No: {order.rollNumber}</div>
                  </div>

                  {/* Items */}
                  <div className="space-y-1 bg-stone-850 p-2.5 rounded-lg border border-stone-800 text-xs">
                    {order.items.map((it) => (
                      <div key={it.id} className="flex justify-between">
                        <span className="font-medium text-stone-200">
                          {it.quantity}x {it.menuItem.name}
                        </span>
                        {it.selectedSize && <span className="text-stone-500">{it.selectedSize.name}</span>}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onUpdateStatus(order.id, 'kitchen_prep')}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Flame className="w-3.5 h-3.5" /> Start Cooking
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 2: In Preparation & Quality Check */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-sky-500/40">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
              <h3 className="font-bold text-white text-sm uppercase tracking-wider">
                2. On Grill &amp; Prep ({inPrepOrders.length})
              </h3>
            </div>
            <span className="text-xs text-stone-400">Active chef stations</span>
          </div>

          <div className="space-y-3">
            {inPrepOrders.length === 0 ? (
              <div className="p-8 text-center bg-stone-900/40 rounded-xl border border-stone-800 text-xs text-stone-500">
                No orders currently in cook stage.
              </div>
            ) : (
              inPrepOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-stone-900 border border-sky-500/40 rounded-xl p-4 space-y-3 shadow-md"
                >
                  <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                    <span className="text-lg font-mono font-bold text-sky-400">
                      Token #{order.tokenNumber}
                    </span>
                    <span className="text-[11px] text-stone-400 font-mono">
                      {order.status === 'quality_check' ? 'PLATING & QC' : 'COOKING'}
                    </span>
                  </div>

                  <div className="text-xs text-stone-300 space-y-1">
                    <div className="font-semibold text-white">{order.customerName}</div>
                    <div className="text-stone-400">Spot: {order.tableOrLocation}</div>
                  </div>

                  <div className="space-y-1 bg-stone-850 p-2.5 rounded-lg border border-stone-800 text-xs">
                    {order.items.map((it) => (
                      <div key={it.id} className="flex justify-between">
                        <span className="font-medium text-stone-200">
                          {it.quantity}x {it.menuItem.name}
                        </span>
                        {it.selectedAddOns.length > 0 && (
                          <span className="text-amber-400 text-[10px]">
                            +{it.selectedAddOns.map((a) => a.name).join(', ')}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {order.status === 'kitchen_prep' ? (
                      <button
                        onClick={() => onUpdateStatus(order.id, 'quality_check')}
                        className="flex-1 bg-stone-800 hover:bg-stone-750 text-stone-200 font-semibold py-2 rounded-lg text-xs cursor-pointer transition-colors"
                      >
                        Send to QC Plating
                      </button>
                    ) : null}
                    <button
                      onClick={() => onUpdateStatus(order.id, 'ready')}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Mark Ready
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 3: Ready for Handover */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-500/40">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <h3 className="font-bold text-white text-sm uppercase tracking-wider">
                3. Ready for Handover ({readyOrders.length})
              </h3>
            </div>
            <span className="text-xs text-stone-400">Call student token</span>
          </div>

          <div className="space-y-3">
            {readyOrders.length === 0 ? (
              <div className="p-8 text-center bg-stone-900/40 rounded-xl border border-stone-800 text-xs text-stone-500">
                No orders ready for pickup.
              </div>
            ) : (
              readyOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-stone-900 border border-emerald-500/40 rounded-xl p-4 space-y-3 shadow-md"
                >
                  <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                    <span className="text-lg font-mono font-bold text-emerald-400">
                      Token #{order.tokenNumber}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold">
                      READY TO SERVE
                    </span>
                  </div>

                  <div className="text-xs text-stone-300">
                    <div className="font-semibold text-white">{order.customerName}</div>
                    <div className="text-stone-400">Table/Spot: {order.tableOrLocation}</div>
                  </div>

                  <button
                    onClick={() => onUpdateStatus(order.id, 'delivered')}
                    className="w-full bg-stone-800 hover:bg-stone-750 text-stone-300 font-semibold py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Complete / Handed Over
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
