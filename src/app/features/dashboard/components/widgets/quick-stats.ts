import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { QuickStats } from '../../models/dashboard.models';

@Component({
  selector: 'app-quick-stats',
  templateUrl: './quick-stats.html',
  styleUrls: ['./quick-stats.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule]
})
export class QuickStatsComponent {
  @Input() stats: QuickStats | null = null;

  stats_items = [
    { icon: 'local_shipping', label: 'Active Orders', value: 'stats.activeOrders' },
    { icon: 'attach_money', label: 'This Month', value: 'stats.totalSpentMonth' },
    { icon: 'card_giftcard', label: 'Loyalty Points', value: 'stats.loyaltyPoints' },
    { icon: 'location_on', label: 'Saved Addresses', value: 'stats.savedAddresses' }
  ];
}
