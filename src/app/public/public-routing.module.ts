import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { PLayoutComponent } from "./p-layout/p-layout.component";
import { RegisterComponent } from "./register/register.component";
import {PublicFormInscriptionComponent} from "./public-form-inscription/public-form-inscription.component";
import {InscriptionConfirmComponent} from "./inscription-confirm/inscription-confirm.component";


const routes: Routes = [
  {
    path: '', component: PLayoutComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'inscription', component: PublicFormInscriptionComponent },
      { path: 'confirm', component: InscriptionConfirmComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
