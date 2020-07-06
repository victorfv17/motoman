import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LigaRoutingModule } from './liga-routing.module';
import { LigaCreateComponent } from './liga-create/liga-create.component';
import { LigaComponent } from './liga.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from 'src/app/core/material-module';
import { LigaSearchComponent } from './liga-search/liga-search.component';


@NgModule({
  declarations: [LigaComponent, LigaCreateComponent, LigaSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    LigaRoutingModule
  ]
})
export class LigaModule { }
