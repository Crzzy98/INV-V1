import { createAction, props } from '@ngrx/store';
import { Asset } from '../models/asset.model';

// Action to initiate loading assets
export const loadAssets = createAction('[Asset] Load Assets');

export const loadMoreAssets = createAction(
  '[Asset] Load More Assets',
  props<{ startIndex: number; endIndex: number }>()
);

export const searchAssets = createAction(
  '[Asset] Search Assets',
  props<{ searchTerm: string }>()
);
export const searchAssetsFailure = createAction(
  '[Asset] Search Assets Failure',
  props<{ error: any }>()
);
export const loadMoreAssetsSuccess = createAction(
  '[Asset] Load More Assets Success',
   props<{ assets: Asset[] }>());
export const loadMoreAssetsFailure = createAction(
  '[Asset] Load More Assets Failure',
   props<{ error: any }>());

// Action for successful asset loading
export const loadAssetsSuccess = createAction(
  '[Asset] Load Assets Success',
  props<{ assets: Asset[] }>()
);

// Action for failed asset loading
export const loadAssetsFailure = createAction(
  '[Asset] Load Assets Failure',
  props<{ error: any }>()
);

// Action to save all assets to the store
export const saveAllAssets = createAction(
  '[Asset] Save All Assets',
  props<{ assets: Asset[] }>()
);

// Action for successful saving of assets
export const saveAllAssetsSuccess = createAction(
  '[Asset] Save All Assets Success'
);

// Action for failed saving of assets
export const saveAllAssetsFailure = createAction(
  '[Asset] Save All Assets Failure',
  props<{ error: any }>()
);

// Action to add a single asset
export const addAsset = createAction(
  '[Asset] Add Asset',
  props<{ asset: Asset }>()
);

// Action to update a single asset
export const updateAsset = createAction(
  '[Asset] Update Asset',
  props<{ asset: Asset }>()
);

// Action to delete a single asset
export const deleteAsset = createAction(
  '[Asset] Delete Asset',
  props<{ id: string }>()
);
export const searchAssetsSuccess = createAction(
  '[Asset] Search Assets Success',
   props<{ assets: Asset[] }>());

