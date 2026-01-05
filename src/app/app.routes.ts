import { Routes } from '@angular/router';
import { TestComponent } from './pages/test/test';
import { Home } from './pages/home/home';

export const routes: Routes = [
    {
        path: "",
        component: Home,
        pathMatch: 'full'
    },
    {
        path: "test",
        component: TestComponent
    }
];
