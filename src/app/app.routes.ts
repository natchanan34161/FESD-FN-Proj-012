import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Information } from './pages/information/information';

export const routes: Routes = [
    {path: 'home', component: Home },
    {path: 'information', component: Information},
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
