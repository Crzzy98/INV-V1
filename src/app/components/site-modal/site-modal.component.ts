import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { defineCustomElements } from '../../../../node_modules/first-stencil/loader';

@Component({
  selector: 'site-modal',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './site-modal.component.html',
  styleUrl: './site-modal.component.scss'
})

export class SiteModalComponent {
  constructor() {
    // Initialize the custom elements
    defineCustomElements(window);
  }
}
