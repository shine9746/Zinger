import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { DashboardData } from '../models/dashboard.models';
import { DashboardSidebarComponent } from '../components/sidebar/dashboard-sidebar';
import { HeroCarouselComponent } from '../components/carousel/hero-carousel';
import { QuickStatsComponent } from '../components/widgets/quick-stats';
import { RestaurantCardComponent } from '../components/cards/restaurant-card';
import { DashboardRightSidebarComponent } from '../components/right-sidebar/dashboard-right-sidebar';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    DashboardSidebarComponent,
    HeroCarouselComponent,
    QuickStatsComponent,
    RestaurantCardComponent,
    DashboardRightSidebarComponent
  ],
  templateUrl: './dashboard-layout.html',
  styleUrls: ['./dashboard-layout.scss']
})
export class DashboardLayoutComponent {
  @Input() data!: DashboardData;
  
  isMobileSidebarOpen: boolean = false;

  toggleMobileSidebar(): void {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }

  closeMobileSidebar(): void {
    this.isMobileSidebarOpen = false;
  }
}
