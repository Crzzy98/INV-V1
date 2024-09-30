import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as AssetActions from '../actions/asset.actions';
import { AssetService } from '../../services/asset.service';
import { Asset } from '../models/asset.model';

@Injectable()
export class AssetEffects {
  loadAssets$;
  loadMoreAssets$;
  searchAssets$;

  constructor(
    private actions$: Actions,
    private assetService: AssetService
  ) {
    this.loadAssets$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AssetActions.loadAssets),
        switchMap(() => this.assetService.fetchAllAssets().pipe(
          map(assets => AssetActions.loadAssetsSuccess({ assets })),
          catchError(error => of(AssetActions.loadAssetsFailure({ error: error.message })))
        ))
      )
    );

    this.loadMoreAssets$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AssetActions.loadMoreAssets),
        tap(action => console.log('Effect: Loading more assets, startIndex:', action.startIndex, 'endIndex:', action.endIndex)),
        switchMap(({ startIndex, endIndex }) =>
          this.assetService.getAssets(startIndex, endIndex).pipe(
            map(assets => {
              console.log('Loaded assets:', assets);
              return AssetActions.loadMoreAssetsSuccess({ assets });
            })
          )
        )
      )
    );

    this.searchAssets$ = createEffect(() => this.actions$.pipe(
      ofType(AssetActions.searchAssets),
      switchMap(({ searchTerm }) => this.assetService.searchAssets(searchTerm).pipe(
        map((assets: Asset[]) => AssetActions.searchAssetsSuccess({ assets })),
        catchError(error => of(AssetActions.searchAssetsFailure({ error: error.message })))
      ))
    ));
  }
}
