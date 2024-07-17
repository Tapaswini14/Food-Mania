import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { MenuComponent } from './Components/menu/menu.component';
import { HeaderComponent } from './Components/header/header.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './Components/profile/profile.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { RegisterComponent } from './Components/register/register.component';
import { RecipeModalComponent } from './Components/modal/recipe-modal/recipe-modal.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'header', component: HeaderComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'recipe-modal/:id',
    component: RecipeModalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contactUs',
    component: ContactUsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'aboutUs',
    component: AboutUsComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
