import { createReducer, on } from '@ngrx/store';
import * as AssetActions from '../actions/asset.actions';
import { Asset } from '../models/asset.model';

export interface AssetState {
  assets: Asset[];
  loadedAssets: Asset[];  // Assets currently loaded/displayed
  isLoading: boolean;
  error: any;
}
export const initialState: AssetState = {
  assets: [],
  loadedAssets: [],
  isLoading: false,
  error: null
}

export const assetReducer = createReducer(
  initialState,
  on(AssetActions.loadAssets, state => ({
    ...state, isLoading: true
  })),
  on(AssetActions.loadAssetsSuccess, (state, { assets }) => ({
    ...state,
    allAssets: assets,
    loadedAssets: assets.slice(0, 10),
    isLoading: false
  })),
  on(AssetActions.loadAssetsFailure, (state, { error }) => ({
    ...state, error,
    isLoading: false
  })),
  on(AssetActions.loadMoreAssets, (state, {startIndex, endIndex}) => ({
    ...state,
    isLoading: true, 
    loadedAssets: [...state.loadedAssets, ...state.assets.slice(startIndex, endIndex)]
  })),
  on(AssetActions.loadMoreAssetsSuccess, (state, { assets }) => {
    console.log('Reducer: Adding more assets, count:', assets.length);
    return {
      ...state,
      assets: [...state.assets, ...assets],
      loadedAssets: [...state.loadedAssets, ...assets],
      isLoading: false
    };
  }),
  on(AssetActions.searchAssetsSuccess, (state, { assets }) => ({
    ...state,
    loadedAssets: assets,
    isLoading: false
  }))
);