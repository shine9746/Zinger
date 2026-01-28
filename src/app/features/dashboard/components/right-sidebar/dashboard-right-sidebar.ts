import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { Order, Restaurant } from '../../models/dashboard.models';
import { OrderCardComponent } from '../cards/order-card';

@Component({
  selector: 'app-dashboard-right-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatTooltipModule,
    MatDividerModule,
    OrderCardComponent
  ],
  templateUrl: './dashboard-right-sidebar.html',
  styleUrls: ['./dashboard-right-sidebar.scss']
})
export class DashboardRightSidebarComponent implements OnInit {
  @Input() recentOrders: Order[] = [];
  @Input() favoriteRestaurants: Restaurant[] = [];
  @Input() loyaltyPoints: number = 0;

  activeTab: 'orders' | 'favorites' = 'orders';
  pointsToNextReward: number = 250;

  ngOnInit(): void {
    this.calculatePointsToReward();
  }

  calculatePointsToReward(): void {
    // Assuming 1000 points = 1 reward
    const nextRewardThreshold = (Math.floor(this.loyaltyPoints / 1000) + 1) * 1000;
    this.pointsToNextReward = nextRewardThreshold - this.loyaltyPoints;
  }

  setActiveTab(tab: 'orders' | 'favorites'): void {
    this.activeTab = tab;
  }

  getRewardProgressPercentage(): number {
    const threshold = 1000;
    const currentInThreshold = this.loyaltyPoints % threshold;
    return (currentInThreshold / threshold) * 100;
  }

  getRewardTier(): string {
    const points = this.loyaltyPoints;
    if (points >= 5000) return 'Platinum';
    if (points >= 3000) return 'Gold';
    if (points >= 1000) return 'Silver';
    return 'Bronze';
  }

  getRewardTierColor(): string {
    const tier = this.getRewardTier();
    switch (tier) {
      case 'Platinum':
        return '#e1bee7';
      case 'Gold':
        return '#ffd700';
      case 'Silver':
        return '#c0c0c0';
      default:
        return '#cd7f32';
    }
  }

  onReorder(orderId: string): void {
    console.log('Reordering:', orderId);
  }

  onTrack(orderId: string): void {
    console.log('Tracking:', orderId);
  }

  onRate(orderId: string): void {
    console.log('Rating:', orderId);
  }
}
