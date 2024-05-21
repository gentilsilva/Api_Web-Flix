import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { RequestsComponent } from './pages/requests/requests.component';

export const routes: Routes = [
    {
        path: "",
        component: MainLayoutComponent
    },
    {
      path: "requests",
      component: RequestsComponent
    },
    {
        path: "**",
        redirectTo: "/home"
    },
];
