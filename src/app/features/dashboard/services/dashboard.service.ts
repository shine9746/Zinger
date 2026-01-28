import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DashboardData, UserProfile, Order, Restaurant, Offer, QuickStats } from '../models/dashboard.models';
import { PlaceholderService } from '../../../shared/services/placeholder.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private placeholderService: PlaceholderService) {}

  getDashboardData(): Observable<DashboardData> {
    const data: DashboardData = {
      userProfile: this.getMockUserProfile(),
      quickStats: this.getMockQuickStats(),
      heroOffers: this.getMockHeroOffers(),
      trendingRestaurants: this.getMockTrendingRestaurants(),
      newRestaurants: this.getMockNewRestaurants(),
      offersDeals: this.getMockOffers(),
      recentOrders: this.getMockRecentOrders(),
      upcomingDeliveries: this.getMockUpcomingDeliveries(),
      favorites: this.getMockFavorites()
    };
    
    return of(data).pipe(delay(500)); // Simulate network delay
  }

  private getMockUserProfile(): UserProfile {
    return {
      id: 'user-123',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      avatar: this.placeholderService.getAvatarPlaceholder(100),
      loyaltyPoints: 2450,
      savedAddresses: [
        { id: 'addr-1', label: 'Home', address: '123 Main St, City, State 12345', isDefault: true },
        { id: 'addr-2', label: 'Work', address: '456 Business Ave, City, State 12345', isDefault: false }
      ],
      totalSpent: 1250.50,
      orderCount: 24
    };
  }

  private getMockQuickStats(): QuickStats {
    return {
      activeOrders: 1,
      totalSpentMonth: 245.75,
      loyaltyPoints: 2450,
      savedAddresses: 2
    };
  }

  private getMockHeroOffers(): Offer[] {
    return [
      {
        id: 'offer-1',
        title: '30% Off on All Orders',
        description: 'Use code ZINGER30 for 30% discount on minimum order of $15',
        image: this.placeholderService.getPlaceholderImage(800, 300, '30% OFF'),
        discount: 30,
        code: 'ZINGER30',
        expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        minOrder: 15,
        type: 'percentage'
      },
      {
        id: 'offer-2',
        title: 'Free Delivery on First Order',
        description: 'Get free delivery on your first order above $10',
        image: this.placeholderService.getPlaceholderImage(800, 300, 'FREE DELIVERY'),
        discount: 100,
        code: 'FREEDEL',
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        minOrder: 10,
        type: 'free-delivery'
      }
    ];
  }

  private getMockTrendingRestaurants(): Restaurant[] {
    return [
      {
        id: 'rest-1',
        name: 'Pizza Palace',
        image: this.placeholderService.getPlaceholderImage(300, 200, 'Pizza Palace'),
        rating: 4.8,
        reviewCount: 1240,
        cuisines: ['Italian', 'Pizza'],
        deliveryTime: 30,
        deliveryFee: 3.99,
        minOrder: 12,
        discount: 20,
        badge: 'TRENDING',
        isOpen: true
      },
      {
        id: 'rest-2',
        name: 'Burger Bliss',
        image: this.placeholderService.getPlaceholderImage(300, 200, 'Burger Bliss'),
        rating: 4.6,
        reviewCount: 892,
        cuisines: ['American', 'Burgers'],
        deliveryTime: 25,
        deliveryFee: 2.99,
        minOrder: 8,
        discount: 15,
        badge: 'TRENDING',
        isOpen: true
      },
      {
        id: 'rest-3',
        name: 'Sushi Supreme',
        image: this.placeholderService.getPlaceholderImage(300, 200, 'Sushi Supreme'),
        rating: 4.9,
        reviewCount: 567,
        cuisines: ['Japanese', 'Sushi'],
        deliveryTime: 35,
        deliveryFee: 4.99,
        minOrder: 20,
        discount: 0,
        badge: 'TRENDING',
        isOpen: true
      }
    ];
  }

  private getMockNewRestaurants(): Restaurant[] {
    return [
      {
        id: 'rest-4',
        name: 'Taco Fiesta',
        image: this.placeholderService.getPlaceholderImage(300, 200, 'Taco Fiesta'),
        rating: 4.5,
        reviewCount: 120,
        cuisines: ['Mexican', 'Tacos'],
        deliveryTime: 28,
        deliveryFee: 3.49,
        minOrder: 10,
        discount: 25,
        badge: 'NEW',
        isOpen: true
      },
      {
        id: 'rest-5',
        name: 'Thai Express',
        image: this.placeholderService.getPlaceholderImage(300, 200, 'Thai Express'),
        rating: 4.7,
        reviewCount: 210,
        cuisines: ['Thai', 'Asian'],
        deliveryTime: 32,
        deliveryFee: 3.99,
        minOrder: 12,
        discount: 20,
        badge: 'NEW',
        isOpen: true
      },
      {
        id: 'rest-6',
        name: 'Kebab King',
        image: this.placeholderService.getPlaceholderImage(300, 200, 'Kebab King'),
        rating: 4.4,
        reviewCount: 95,
        cuisines: ['Middle Eastern', 'Kebab'],
        deliveryTime: 25,
        deliveryFee: 2.99,
        minOrder: 9,
        discount: 30,
        badge: 'NEW',
        isOpen: true
      }
    ];
  }

  private getMockOffers(): Offer[] {
    return [
      {
        id: 'offer-3',
        title: 'Buy 1 Get 1 Free',
        description: 'On selected items at Pizza Palace',
        image: this.placeholderService.getPlaceholderImage(300, 200, 'Buy 1 Get 1'),
        discount: 50,
        code: 'B1G1PIZZA',
        expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        applicableRestaurants: ['rest-1'],
        type: 'percentage'
      },
      {
        id: 'offer-4',
        title: '$5 Off Orders Over $25',
        description: 'Valid at all restaurants',
        image: this.placeholderService.getPlaceholderImage(300, 200, '$5 OFF'),
        discount: 5,
        code: 'SAVE5',
        expiryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        minOrder: 25,
        type: 'fixed'
      }
    ];
  }

  private getMockRecentOrders(): Order[] {
    return [
      {
        id: 'order-1',
        restaurantId: 'rest-1',
        restaurantName: 'Pizza Palace',
        restaurantImage: this.placeholderService.getPlaceholderImage(100, 100, 'Pizza'),
        items: [
          {
            id: 'item-1',
            menuItem: { id: 'm1', name: 'Pepperoni Pizza', description: 'Classic pepperoni', price: 12.99, image: '', vegetarian: false },
            quantity: 1
          }
        ],
        status: 'delivered',
        totalAmount: 12.99,
        deliveryFee: 3.99,
        tax: 1.28,
        orderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        estimatedDelivery: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000),
        actualDelivery: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 28 * 60 * 1000),
        address: { id: 'addr-1', label: 'Home', address: '123 Main St', isDefault: true }
      },
      {
        id: 'order-2',
        restaurantId: 'rest-2',
        restaurantName: 'Burger Bliss',
        restaurantImage: this.placeholderService.getPlaceholderImage(100, 100, 'Burger'),
        items: [
          {
            id: 'item-2',
            menuItem: { id: 'm2', name: 'Deluxe Burger', description: 'With cheese and bacon', price: 10.99, image: '', vegetarian: false },
            quantity: 2
          }
        ],
        status: 'delivered',
        totalAmount: 21.98,
        deliveryFee: 2.99,
        tax: 1.95,
        orderDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        estimatedDelivery: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 25 * 60 * 1000),
        actualDelivery: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 24 * 60 * 1000),
        address: { id: 'addr-1', label: 'Home', address: '123 Main St', isDefault: true }
      }
    ];
  }

  private getMockUpcomingDeliveries(): Order[] {
    return [
      {
        id: 'order-3',
        restaurantId: 'rest-1',
        restaurantName: 'Pizza Palace',
        restaurantImage: this.placeholderService.getPlaceholderImage(100, 100, 'Pizza'),
        items: [
          {
            id: 'item-3',
            menuItem: { id: 'm3', name: 'Margherita Pizza', description: 'Fresh mozzarella', price: 11.99, image: '', vegetarian: true },
            quantity: 1
          }
        ],
        status: 'on-the-way',
        totalAmount: 11.99,
        deliveryFee: 3.99,
        tax: 1.27,
        orderDate: new Date(Date.now() - 20 * 60 * 1000),
        estimatedDelivery: new Date(Date.now() + 10 * 60 * 1000),
        deliveryAgent: {
          id: 'agent-1',
          name: 'Mike Johnson',
          rating: 4.9,
          phone: '+1 (555) 987-6543',
          vehicleType: 'Motorcycle'
        },
        address: { id: 'addr-1', label: 'Home', address: '123 Main St', isDefault: true }
      }
    ];
  }

  private getMockFavorites(): Restaurant[] {
    return [
      this.getMockTrendingRestaurants()[0],
      this.getMockNewRestaurants()[1]
    ];
  }
}
