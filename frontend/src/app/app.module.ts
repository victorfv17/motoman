import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/material-module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ClasificacionComponent } from './components/clasificacion/clasificacion.component';
import { AlineacionComponent } from './components/alineacion/alineacion.component';
import { AlineacionDialogComponent } from './components/alineacion/alineacion-dialog/alineacion-dialog.component';
import { PuntuacionComponent } from './components/puntuacion/puntuacion.component';
import { DialogEliminarComponent } from './components/pilotos/dialog-eliminar/dialog-eliminar.component';
import { EscuderiasComponent } from './components/escuderias/escuderias.component';
import { EscuderiasAddComponent } from './components/escuderias/escuderias-add/escuderias-add.component';
import { PilotosAddComponent } from './components/pilotos/pilotos-add/pilotos-add.component';
import { PilotosComponent } from './components/pilotos/pilotos.component';
import { PilotosDetailComponent } from './components/pilotos/pilotos-detail/pilotos-detail.component';
import { RegistroComponent } from './components/registro/registro.component';




@NgModule({
  declarations: [
    AppComponent,
    PilotosComponent,
    PilotosDetailComponent,
    PilotosAddComponent,
    LoginComponent,
    HomeComponent,
    ClasificacionComponent,
    AlineacionComponent,
    AlineacionDialogComponent,
    PuntuacionComponent,

    DialogEliminarComponent,
    EscuderiasComponent,
    EscuderiasAddComponent,
    RegistroComponent,



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
  entryComponents: [AlineacionDialogComponent, DialogEliminarComponent]
})
export class AppModule { }
