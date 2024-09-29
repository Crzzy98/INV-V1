import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { take, filter } from 'rxjs/operators';
import { Asset } from '../../store/models/asset.model';
import * as AssetActions from '../../store/actions/asset.actions';
import { selectLoadedAssets, selectIsLoading } from '../../store/selectors/asset.selectors';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AssetComponent } from '../asset/asset.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as AssetSelectors from '../../store/selectors/asset.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, RouterModule,
     FormsModule, AssetComponent, CommonModule, StoreModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  //Fix pagination, in scrollable
  //add search function
  //create c for placing order(s) and configuring auto orders/sells
  //Create graph component for visualizing market data

  //set auto sell price
  //set auto buy price 
  //set frequency per day of trades
  //view yearly trend graph of each position
  //Implement CSP headers
  //SSL/TLS: Configure HTTPS for secure connections.
  //Implement HTTP Strict Transport Security

  activeAssets$: Observable<Asset[]>;
  isLoading$: Observable<boolean>;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  searchInput: string = '';
  loginAssetRetrievalStatus: boolean = false;
  http = inject(HttpClient);
  private baseUrl: string = 'http://localhost:3000';

  constructor(private store: Store) {
    this.activeAssets$ = this.store.select(selectLoadedAssets);
    this.isLoading$ = this.store.select(selectIsLoading);
  }

  ngOnInit() {
    this.loadInitialAssets();
  }

  ngOnDestroy() {
    // Cleanup if necessary
  }

  loadInitialAssets() {
    this.store.dispatch(AssetActions.loadAssets());
  }

  onScroll(event: any) {
    console.log('Scroll event fired');

    const element = event.target;
    if (
      element.scrollHeight - element.scrollTop === element.clientHeight
    ) {
      this.isLoading$.pipe(
        take(1),
        filter(isLoading => !isLoading)
      ).subscribe(() => {
        this.loadMoreAssets();
      });
    }
  }

  loadMoreAssets() {
    this.store.select(AssetSelectors.selectAllAssets).pipe(
      take(1)
    ).subscribe(assets => {
      const startIndex = assets.length;
      const endIndex = startIndex + 10; // Load 10 more items, adjust as needed
      this.store.dispatch(AssetActions.loadMoreAssets({ startIndex, endIndex }));
    });
  }

  //Add funct to dynamically update search results as user types 
  searchForActiveAssets() {
    console.log("Attempting to fetch active assets from API");
    if (this.searchInput.trim() !== '') {
    } else {
      this.loadInitialAssets();
    }
  }
}
