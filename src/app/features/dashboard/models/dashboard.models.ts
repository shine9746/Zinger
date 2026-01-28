/**
 * Dashboard Models
 */

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  loyaltyPoints: number;
  savedAddresses: Address[];
  totalSpent: number;
  orderCount: number;
}

export interface Address {
  id: string;
  label: string;
  address: string;
  isDefault: boolean;
}

export interface QuickStats {
  activeOrders: number;
  totalSpentMonth: number;
  loyaltyPoints: number;
  savedAddresses: number;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  cuisines: string[];
  deliveryTime: number;
  deliveryFee: number;
  minOrder: number;
  discount?: number;
  badge?: 'NEW' | 'TRENDING' | 'FEATURED';
  isOpen: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  vegetarian: boolean;
}

export interface OrderItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface DeliveryAgent {
  id: string;
  name: string;
  rating: number;
  phone: string;
  vehicleType: string;
  currentLocation?: {
    lat: number;
    lng: number;
  };
}

export interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  items: OrderItem[];
  status: 'preparing' | 'confirmed' | 'on-the-way' | 'delivered' | 'cancelled';
  totalAmount: number;
  deliveryFee: number;
  tax: number;
  orderDate: Date;
  estimatedDelivery: Date;
  actualDelivery?: Date;
  deliveryAgent?: DeliveryAgent;
  trackingUrl?: string;
  address: Address;
  specialInstructions?: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  image: string;
  discount: number;
  code: string;
  expiryDate: Date;
  minOrder?: number;
  applicableRestaurants?: string[];
  type: 'percentage' | 'fixed' | 'free-delivery';
}

export interface DashboardData {
  userProfile: UserProfile;
  quickStats: QuickStats;
  heroOffers: Offer[];
  trendingRestaurants: Restaurant[];
  newRestaurants: Restaurant[];
  offersDeals: Offer[];
  recentOrders: Order[];
  upcomingDeliveries: Order[];
  favorites: Restaurant[];
}
