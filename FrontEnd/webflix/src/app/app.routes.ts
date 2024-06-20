import { HomeComponent } from './pages/home/home.component';
import { Routes } from '@angular/router';
import { RequestsComponent } from './pages/requests/requests.component';
import { SignupComponent } from './pages/signup/signup.component';
import { RequestFormComponent } from './pages/request-form/request-form.component';
import { LoginComponent } from './pages/login/login.component';
import { TopMoviesComponent } from './pages/top-movies/top-movies.component';
import { TopTvSeriesComponent } from './pages/top-tv-series/top-tv-series.component';
import { SearchComponent } from './pages/search/search.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { TvShowsComponent } from './pages/tv-shows/tv-shows.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { SerieDetailComponent } from './pages/serie-detail/serie-detail.component';

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
    path: "movies",
    component: MoviesComponent,
    title: "Movies"
  },
  {
    path: "movie-detail",
    component: MovieDetailComponent,
    title: "Movie Detail"
  },
  {
    path: "serie-detail",
    component: SerieDetailComponent,
    title: "Serie Detail"
  },
  {
    path: "tv-series",
    component: TvShowsComponent,
    title: "Series"
  },
  {
    path: "top-movies",
    component: TopMoviesComponent,
    title: "Top Movies"
  },
  {
    path: "top-tv-series",
    component: TopTvSeriesComponent,
    title: "Top Series"
  },
  {
    path: "search",
    component: SearchComponent,
    title: "Search"
  },
  {
    path: "**",
    component: HomeComponent,
    title: "Home"
  }

];
