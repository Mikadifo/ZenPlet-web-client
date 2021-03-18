import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimaryButtonComponent } from './buttons/primary-button/primary-button.component';
import { InputComponent } from './input/input.component';
import { AccessComponent } from './access/access.component';

@NgModule({
  declarations: [AppComponent, PrimaryButtonComponent, InputComponent, AccessComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
