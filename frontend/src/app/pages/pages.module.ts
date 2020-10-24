import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Parte pública
import { IndexComponent } from './index/index.component';

//Módulos
import { AuthModule } from '../auth/auth.module';

import { PagesComponent } from './pages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [IndexComponent, PagesComponent],
  exports: [IndexComponent, PagesComponent],
  imports: [
    CommonModule,
    AuthModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PagesModule {}
