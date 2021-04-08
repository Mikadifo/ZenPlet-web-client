import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessComponent } from './access/access.component';
import { EditNewComponent } from './edit-new/edit-new.component';
import { ListComponent } from './list/list.component';
import { LoggedInComponent } from './logged-in/logged-in.component';
import { LostPetPrintableComponent } from './lost-pet-printable/lost-pet-printable.component';

const routes: Routes = [
  {
    path: '',
    component: LoggedInComponent,
    children: [
      { path: 'list/:card', component: ListComponent },
      { path: ':mode/:page', component: EditNewComponent },
    ],
  },
  { path: 'print-lost', component: LostPetPrintableComponent },
  { path: 'auth', component: AccessComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
