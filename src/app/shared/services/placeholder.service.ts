import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlaceholderService {
  
  /**
   * Get a placeholder image as SVG data URI
   */
  getPlaceholderImage(width: number = 300, height: number = 200, text: string = 'Image'): string {
    const encodedText = encodeURIComponent(text);
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#d4a574;stop-opacity:0.3" />
            <stop offset="100%" style="stop-color:#9d7c51;stop-opacity:0.3" />
          </linearGradient>
        </defs>
        <rect width="${width}" height="${height}" fill="#f5f1ed" />
        <rect width="${width}" height="${height}" fill="url(#grad)" />
        <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="${Math.min(width, height) / 8}" fill="#9d7c51" text-anchor="middle" dominant-baseline="middle" font-weight="500">
          ${text}
        </text>
        <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="${Math.min(width, height) / 12}" fill="#d4a574" text-anchor="middle" opacity="0.7">
          ${width}x${height}
        </text>
      </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }

  /**
   * Get avatar placeholder
   */
  getAvatarPlaceholder(size: number = 80): string {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <defs>
          <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#d4a574;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#9d7c51;stop-opacity:1" />
          </linearGradient>
        </defs>
        <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="url(#avatarGrad)" />
        <circle cx="${size/2}" cy="${size * 0.35}" r="${size * 0.2}" fill="#faf8f6" opacity="0.9" />
        <path d="M ${size * 0.2} ${size * 0.75} Q ${size/2} ${size * 0.65} ${size * 0.8} ${size * 0.75} Q ${size * 0.9} ${size * 0.85} ${size * 0.85} ${size}" fill="#faf8f6" opacity="0.85" />
      </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }
}
