import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ControladminComponent } from './controladmin/controladmin.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'order',
    component: OrderComponent,
  },
  {
    path: 'history',
    component: OrderHistoryComponent,
  },
  {
    path: 'activities',
    component: ActivitiesComponent,
  },
  { path: 'controladmin', component: ControladminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
