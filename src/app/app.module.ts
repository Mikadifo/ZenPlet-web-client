import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';
import { AccessComponent } from './access/access.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PetCardComponent } from './pet-card/pet-card.component';
import { VaccineCardComponent } from './vaccine-card/vaccine-card.component';
import { ListComponent } from './list/list.component';
import { IconButtonComponent } from './buttons/icon-button/icon-button.component';
import { ButtonComponent } from './buttons/button/button.component';
import { EditNewComponent } from './edit-new/edit-new.component';
import { LoggedInComponent } from './logged-in/logged-in.component';
import { LostPetCardComponent } from './lost-pet-card/lost-pet-card.component';
import { FormsModule } from '@angular/forms';
import { OwnerService } from './service/owner.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PetsFoundCounterComponent } from './pets-found-counter/pets-found-counter.component';
import { LostPetPrintableComponent } from './lost-pet-printable/lost-pet-printable.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    AccessComponent,
    FooterComponent,
    NavigationComponent,
    PetCardComponent,
    VaccineCardComponent,
    ListComponent,
    IconButtonComponent,
    ButtonComponent,
    EditNewComponent,
    LoggedInComponent,
    LostPetCardComponent,
    PetsFoundCounterComponent,
    LostPetPrintableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [OwnerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
