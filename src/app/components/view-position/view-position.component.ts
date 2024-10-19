import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-position',
  standalone: true,
  imports: [],
  templateUrl: './view-position.component.html',
  styleUrl: './view-position.component.scss'
})
export class ViewPositionComponent implements OnInit{
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    const assetData = this.route.snapshot.paramMap.get('assetData')

    console.log("Asset Data in View: " + assetData)
  }
}
