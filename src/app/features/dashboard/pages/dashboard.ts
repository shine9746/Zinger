import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DashboardService } from '../services/dashboard.service';
import { DashboardData } from '../models/dashboard.models';
import { DashboardLayoutComponent } from '../layouts/dashboard-layout';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    DashboardLayoutComponent
  ]
})
export class DashboardPage implements OnInit, OnDestroy {
  dashboardData: DashboardData | null = null;
  isLoading: boolean = true;
  error: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    this.error = null;

    this.dashboardService
      .getDashboardData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: DashboardData) => {
          this.dashboardData = data;
          this.isLoading = false;
        },
        error: (err: any) => {
          console.error('Error loading dashboard data:', err);
          this.error = 'Failed to load dashboard data. Please try again.';
          this.isLoading = false;
        }
      });
  }

  retryLoadData(): void {
    this.loadDashboardData();
  }
}
