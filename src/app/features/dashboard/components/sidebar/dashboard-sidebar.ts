import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserProfile } from '../../models/dashboard.models';

@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.html',
  styleUrl: './dashboard-sidebar.scss',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule]
})
export class DashboardSidebarComponent {
  @Input() userProfile: UserProfile | null = null;
}
