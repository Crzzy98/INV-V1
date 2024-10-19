import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AssetState } from '../reducers/asset.reducer';

export const selectAssetState = createFeatureSelector<AssetState>('assets');

export const selectAllAssets = createSelector(
  selectAssetState,
  (state: AssetState) => state.assets
);

export const selectLoadedAssets = createSelector(
  selectAssetState,
  (state: AssetState) => state.loadedAssets
);

export const selectIsLoading = createSelector(
  selectAssetState,
  (state: AssetState) => state.isLoading
);

export const selectError = createSelector(
  selectAssetState,
  (state: AssetState) => state.error
);