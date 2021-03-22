import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimaryButtonComponent } from './buttons/primary-button/primary-button.component';
import { InputComponent } from './input/input.component';
import { AccessComponent } from './access/access.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PetCardComponent } from './pet-card/pet-card.component';
import { AddButtonComponent } from './buttons/add-button/add-button.component';
import { VaccineCardComponent } from './vaccine-card/vaccine-card.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    AppComponent,
    PrimaryButtonComponent,
    InputComponent,
    AccessComponent,
    FooterComponent,
    NavigationComponent,
    PetCardComponent,
    AddButtonComponent,
    VaccineCardComponent,
    ListComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
