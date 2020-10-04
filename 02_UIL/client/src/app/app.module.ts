import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { MenuItemComponent } from './order/menu-item/menu-item.component';
import { CartComponent } from './order/cart/cart.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ControladminComponent } from './controladmin/controladmin.component';
import { OrdercardComponent } from './activities/ordercard/ordercard.component';
import { UserdetailsComponent } from './activities/userdetails/userdetails.component';
import { OrderdetailsComponent } from './activities/orderdetails/orderdetails.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { HistoryItemComponent } from './order-history/history-item/history-item.component';
import { SendTokenInterceptor } from './shared/services/send-token-interceptor.service';
import { NotificationsComponent } from './header/notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HeaderComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    OrderComponent,
    MenuItemComponent,
    CartComponent,
    LoadingSpinnerComponent,
    ActivitiesComponent,
    ControladminComponent,
    OrdercardComponent,
    UserdetailsComponent,
    OrderdetailsComponent,
    OrderHistoryComponent,
    HistoryItemComponent,
    NotificationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SendTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
