import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { RequestsComponent } from './pages/requests/requests.component';

export const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    title: "Home"
  },
  {
    path: "requests",
    component: RequestsComponent,
    title: "Requests"
  },
  {
    path: "**",
    redirectTo: "/home",
    title: "Home"
  },
];
