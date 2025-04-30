import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trade-stocks-selector',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './trade-stocks-selector.component.html',
  styleUrl: './trade-stocks-selector.component.scss'
})
export class TradeStocksSelectorComponent {
  router = inject(Router);

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
