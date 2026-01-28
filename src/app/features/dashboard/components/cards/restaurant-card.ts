import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { Restaurant } from '../../models/dashboard.models';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.html',
    styleUrls: ['./restaurant-card.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatBadgeModule, MatTooltipModule, MatButtonModule]
})
export class RestaurantCardComponent {
  @Input() restaurant: Restaurant | null = null;
}
