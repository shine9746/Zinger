import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Order } from '../../models/dashboard.models';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatTooltipModule
  ],
  templateUrl: './order-card.html',
  styleUrls: ['./order-card.scss']
})
export class OrderCardComponent implements OnInit {
  @Input() order!: Order;
  @Output() reorder = new EventEmitter<string>();
  @Output() track = new EventEmitter<string>();
  @Output() rate = new EventEmitter<string>();

  statusIcon: string = 'shopping_bag';
  statusColor: string = 'primary';
  itemsPreview: string = '';

  ngOnInit(): void {
    this.updateStatusDisplay();
    this.generateItemsPreview();
  }

  updateStatusDisplay(): void {
    switch (this.order.status) {
      case 'confirmed':
        this.statusIcon = 'check_circle';
        this.statusColor = 'accent';
        break;
      case 'preparing':
        this.statusIcon = 'local_fire_department';
        this.statusColor = 'warn';
        break;
      case 'on-the-way':
        this.statusIcon = 'two_wheeler';
        this.statusColor = 'primary';
        break;
      case 'delivered':
        this.statusIcon = 'done_all';
        this.statusColor = 'primary';
        break;
      default:
        this.statusIcon = 'shopping_bag';
    }
  }

  generateItemsPreview(): void {
    if (this.order.items && this.order.items.length > 0) {
      const itemNames = this.order.items.map(item => item.menuItem.name).slice(0, 2);
      this.itemsPreview = itemNames.join(', ');
      if (this.order.items.length > 2) {
        this.itemsPreview += ` +${this.order.items.length - 2}`;
      }
    }
  }

  getStatusLabel(): string {
    return this.order.status.charAt(0).toUpperCase() + this.order.status.slice(1).replace('-', ' ');
  }

  getDeliveryTimeRemaining(): string {
    if (this.order.status === 'delivered') {
      return 'Delivered';
    }
    const now = new Date();
    const estimatedTime = new Date(this.order.estimatedDelivery);
    const diffMs = estimatedTime.getTime() - now.getTime();
    const diffMins = Math.round(diffMs / 60000);

    if (diffMins < 0) return 'Overdue';
    if (diffMins < 1) return 'Arriving soon';
    if (diffMins < 60) return `${diffMins} mins`;
    const hours = Math.round(diffMins / 60);
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  }

  onReorder(): void {
    this.reorder.emit(this.order.id);
  }

  onTrack(): void {
    this.track.emit(this.order.id);
  }

  onRate(): void {
    this.rate.emit(this.order.id);
  }

  isDelivered(): boolean {
    return this.order.status === 'delivered';
  }
}
