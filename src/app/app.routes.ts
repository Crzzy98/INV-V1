import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CheckPositionsComponent } from './components/check-positions/check-positions.component';
import { SearchPositionsComponent } from './components/search-positions/search-positions.component';
export const routes: Routes = [
    {path: '', component:HomeComponent, title:'Home Page'},
    {path: 'check-positions', component:CheckPositionsComponent, title:'Check Positions'},
    {path: 'search-positions', component:SearchPositionsComponent, title:'Search Positions'},
];
