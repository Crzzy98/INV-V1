// asset.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  getLoadedAssets(): Observable<any[]> {
    return this.loadedAssetsSubject.asObservable();
  }

  fetchAllAssets() {
    return this.http.get<any>(`${this.baseUrl}/active-assets`).pipe(
      map(response => {
        if (Array.isArray(response)) {
          return response;
        } else if (typeof response === 'object' && response.data) {
          return response.data;
        } else {
          console.log('Unexpected response format');
          return [];
        }
      })
    ).subscribe(assets => {
      this.allAssetsSubject.next(assets);
      this.loadedAssetsSubject.next(assets.slice(0, 10)); // Initial load
    });
  }

  loadMoreAssets(startIndex: number, endIndex: number) {
    const currentAssets = this.allAssetsSubject.value;
    const newAssets = currentAssets.slice(startIndex, endIndex);
    const loadedAssets = [...this.loadedAssetsSubject.value, ...newAssets];
    this.loadedAssetsSubject.next(loadedAssets);
  }
}
