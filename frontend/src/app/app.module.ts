import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { InformacionComponent } from './components/informacion/informacion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/material-module';
import { InformacionDetailComponent } from './components/informacion/informacion-detail/informacion-detail.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ClasificacionComponent } from './components/clasificacion/clasificacion.component';
import { AlineacionComponent } from './components/alineacion/alineacion.component';
import { AlineacionDialogComponent } from './components/alineacion/alineacion-dialog/alineacion-dialog.component';
import { PuntuacionComponent } from './components/puntuacion/puntuacion.component';




@NgModule({
  declarations: [
    AppComponent,
    InformacionComponent,
    InformacionDetailComponent,
    LoginComponent,
    HomeComponent,
    ClasificacionComponent,
    AlineacionComponent,
    AlineacionDialogComponent,
    PuntuacionComponent,



  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AlineacionDialogComponent]
})
export class AppModule { }
