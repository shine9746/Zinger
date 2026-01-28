import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Offer } from '../../models/dashboard.models';

@Component({
  selector: 'app-hero-carousel',
  templateUrl: './hero-carousel.html',
  styleUrls: ['./hero-carousel.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule]
})
export class HeroCarouselComponent implements OnInit, OnDestroy {
  @Input() offers: Offer[] = [];
  
  currentIndex = 0;
  autoPlayInterval: any;

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.offers.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.offers.length) % this.offers.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  get currentOffer(): Offer {
    return this.offers[this.currentIndex];
  }
}
