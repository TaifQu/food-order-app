import { MenuItem } from '../data/menuData';

export interface CartItem {
  id: string; // unique cart line id (e.g. itemId + options hash)
  menuItem: MenuItem;
  quantity: number;
  selectedSize?: { name: string; extraPrice: number };
  selectedAddOns: { name: string; price: number }[];
  specialInstructions?: string;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus = 'placed' | 'kitchen_prep' | 'quality_check' | 'ready' | 'delivered';

export type OrderType = 'dine_in' | 'takeaway' | 'campus_delivery';

export type PaymentMethod = 'upi' | 'card' | 'cash';

export interface FoodOrder {
  id: string;
  tokenNumber: number;
  createdAt: string;
  customerName: string;
  rollNumber: string; // e.g. Roll 41
  phoneNumber: string;
  orderType: OrderType;
  tableOrLocation: string;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending';
  items: CartItem[];
  subtotal: number;
  tax: number; // 5% GST
  packagingFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  status: OrderStatus;
  estimatedMinutes: number;
  kitchenNotes?: string;
}

export interface MetricSnapshot {
  timestamp: string;
  totalRequests: number;
  requestsPerSecond: number;
  p95LatencyMs: number;
  activeOrders: number;
  successfulOrders: number;
  errorRatePercent: number;
  uptimeSeconds: number;
  cpuUsagePercent: number;
  memoryUsageMb: number;
}
