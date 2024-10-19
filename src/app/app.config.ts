import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import {provideStore} from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {assetReducer} from './store/reducers/asset.reducer';
import {AssetEffects} from './store/effects/asset.effects';
import { AssetService } from './services/asset.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
     provideHttpClient(),
     provideStore({assets: assetReducer}),
     provideEffects(AssetEffects),
      AssetService
    ]
};
