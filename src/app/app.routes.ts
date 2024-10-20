import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CheckPositionsComponent } from './components/check-positions/check-positions.component';
import { SearchPositionsComponent } from './components/search-positions/search-positions.component';
import { ViewPositionComponent } from './components/view-position/view-position.component';
import { ViewAssetComponent } from './components/view-asset/view-asset.component';
import { TradeComponent } from './components/trade/trade.component';
import { AutoTradeComponent } from './components/auto-trade/auto-trade.component';
import { ViewTradeComponent } from './components/view-trade/view-trade.component';
import { RedirectComponent } from './components/redirect/redirect.component';

export const routes: Routes = [
    {path: '', component:HomeComponent, title:'Home Page'},
    {path: 'check-positions', component:CheckPositionsComponent, title:'Check Positions'},
    {path: 'search-positions', component:SearchPositionsComponent, title:'Search Positions'},
    {path: 'view-position', component:ViewPositionComponent, title:'View Position'},
    {path: 'view-asset', component:ViewAssetComponent, title:'View Asset'},
    {path: 'trade', component:TradeComponent, title:'Trade'},
    {path: 'auto-trade', component:AutoTradeComponent, title:'Auto Trade'},
    {path: 'trade-confirmation', component:ViewTradeComponent, title:'View Trade'},
    {path: 'redirect', component:RedirectComponent, title:'Redirect Page'},
];
