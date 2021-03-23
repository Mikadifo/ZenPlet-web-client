import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessComponent } from './access/access.component';
import { ListComponent } from './list/list.component';
import { LoggedInComponent } from './logged-in/logged-in.component';

const routes: Routes = [
  {
    path: '',
    component: LoggedInComponent,
    children: [{ path: 'list/:card', component: ListComponent }],
  },
  { path: 'auth', component: AccessComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
