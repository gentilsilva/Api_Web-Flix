import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { SignupComponent } from './pages/signup/signup.component';
import { RequestFormComponent } from './pages/request-form/request-form.component';

export const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    title: "Home"
  },
  {
    path: "requests",
    component: RequestsComponent,
    title: "Pedidos"
  },
  {
    path: "request-form",
    component: RequestFormComponent,
    title: "Formulário de pedidos"
  },
  {
    path: "signup",
    component: SignupComponent,
    title: "SingUp"
  },
  {
    path: "**",
    component: MainLayoutComponent,
    title: "Home"
  }

];
