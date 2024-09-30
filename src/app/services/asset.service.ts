// asset.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError,tap  } from 'rxjs/operators';
import {Asset} from '../store/models/asset.model';
@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private baseUrl: string = 'http://localhost:3000';
  private allAssetsSubject = new BehaviorSubject<any[]>([]);
  private loadedAssetsSubject = new BehaviorSubject<any[]>([]);

  //Variable containing details related to the current asset in focus in the client
  private inFocusAsset: any = null;

  constructor(private http: HttpClient) { }

  setInFocusAsset(asset: any) {
    this.inFocusAsset = asset;
  }
  getInFocusAsset(): any {
    return this.inFocusAsset;
  }
  
  getAllAssets(): Observable<any[]> {
    return this.allAssetsSubject.asObservable();
  }

  getAssets(startIndex: number, endIndex: number): Observable<Asset[]> {
    const url = `${this.baseUrl}/assets?startIndex=${startIndex}&endIndex=${endIndex}`;
    console.log('Service: Fetching assets from', startIndex, 'to', endIndex);
    return this.http.get<Asset[]>(url).pipe(
      tap(assets => console.log('Service: Received assets:', assets))
    );
  }


  getLoadedAssets(): Observable<any[]> {
    return this.loadedAssetsSubject.asObservable();
  }

  fetchAllAssets(): Observable<Asset[]> {
    return this.http.get<Asset[] | { data: Asset[] }>(`${this.baseUrl}/active-assets`).pipe(
      map(response => {
        if (Array.isArray(response)) {
          return response;
        } else if (typeof response === 'object' && response.data) { 
          return response.data;
        } else {
          console.log('Unexpected response format');
          return [];
        }
      }),
      catchError(error => {
        console.error('Error fetching assets:', error);
        return of([]); // Return an empty array as Observable
      })
    );
  }

  searchAssets(searchTerm: string): Observable<Asset[]> {
    let params = new HttpParams().set('search', searchTerm);

    return this.http.get<{ data: Asset[] }>(`${this.baseUrl}/search-assets`, { params }).pipe(
      map(response => {
        if (response && Array.isArray(response.data)) {
          return response.data;
        } else {
          console.log('Unexpected response format');
          return [];
        }
      })
    );
  }


  loadMoreAssets(startIndex: number, endIndex: number): Observable<Asset[]> {
    const currentAssets = this.allAssetsSubject.value;
    const newAssets = currentAssets.slice(startIndex, endIndex);
    const loadedAssets = [...this.loadedAssetsSubject.value, ...newAssets];
    this.loadedAssetsSubject.next(loadedAssets);
    return this.loadedAssetsSubject.asObservable();
  }
}
