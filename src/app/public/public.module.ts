import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { PLayoutComponent } from './p-layout/p-layout.component';
import { RouterModule } from "@angular/router";
import { PublicRoutingModule } from "./public-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PublicFormInscriptionComponent } from './public-form-inscription/public-form-inscription.component';
import { InscriptionConfirmComponent } from './inscription-confirm/inscription-confirm.component';
import { MatterDisplayComponent } from '../shared/components/matter-display/matter-display.component';

@NgModule({
  declarations: [
    HomeComponent,
    RegisterComponent,
    PLayoutComponent,
    PublicFormInscriptionComponent,
    InscriptionConfirmComponent,
    MatterDisplayComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PublicModule { }
