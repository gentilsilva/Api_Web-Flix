import { HomeComponent } from './pages/home/home.component';
import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { SignupComponent } from './pages/signup/signup.component';
import { RequestFormComponent } from './pages/request-form/request-form.component';
import { LoginComponent } from './pages/login/login.component';
import { TopMoviesComponent } from './pages/top-movies/top-movies.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
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
    path: "login",
    component: LoginComponent,
    title: "Login"
  },
  {
    path: "top-movies",
    component: TopMoviesComponent,
    title: "Top Movies"
  },
  {
    path: "**",
    component: HomeComponent,
    title: "Home"
  }

];
