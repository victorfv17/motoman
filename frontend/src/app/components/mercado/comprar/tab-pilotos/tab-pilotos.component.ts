

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, Form } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { skip } from 'rxjs/operators';
import { IPujas } from 'src/app/shared/models/pujas.model';
import { IUser } from 'src/app/shared/models/users.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { MercadoService } from 'src/app/shared/services/mercado.service';
import { PujasService } from 'src/app/shared/services/pujas.service';

@Component({
  selector: 'app-tab-pilotos',
  templateUrl: './tab-pilotos.component.html',
  styleUrls: ['./tab-pilotos.component.scss']
})
export class TabPilotosComponent implements OnInit {
  @ViewChild('formPilotos', { static: true }) formPilotos: NgForm;
  formInvalid = false;
  public pilotos: any;
  public escuderias: any;
  public puja: number;
  private user: IUser;
  public pujas: Array<IPujas> = [];


  constructor(
    private mercadoService: MercadoService,
    private pujasService: PujasService,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('usuario'));

    // if (this.user) {
    //   this.authenticationService.loadUser(this.user.usuario.id).subscribe((usuario) => {
    //     console.log(usuario);
    //     this.user.usuario = usuario;
    //     localStorage.setItem('usuario', JSON.stringify(this.user))
    //     console.log('obtenido', usuario);
    //   });
    // }
    this.getPilotosMercado();

  }
  public coleccionPujas(piloto?: any, puja?: number) {
    if (puja < piloto.valorMercado) {
      this.formInvalid = true;
    } else {
      this.formInvalid = false;
      let pilotoPuja: IPujas = {
        piloto: piloto.idMercado,
        puja: Number(puja)
      }
      this.pujas.push(pilotoPuja);
      console.log(this.pujas)
    }

  }



  private getPilotosMercado() {

    let fechaActual = new Date().toISOString().slice(0, 10);
    //fechaActual = '2020-06-02';
    this.mercadoService.getPilotosMercado(this.user.usuario.liga_id).subscribe(pilotos => {
      console.log('pilotos', pilotos);

      if (pilotos && pilotos.length <= 6 && pilotos.length > 0) {
        if (String(pilotos[0].fecha) === fechaActual) {
          this.checkPilotoEscuderia(pilotos);
          this.pilotos = pilotos;

        } else {
          this.borrarPujas();
          // this.createPilotosMercado();
          // this.deletePilotosMercado();
        }

        //el create se hace dos veces hay que pensar esto para que no se haga bucle
      } else {

        //this.createPilotosMercado();

        // this.borrarPujas();
        // this.createPilotosMercado();

      }
    });
  }

  private createPilotosMercado() {
    this.mercadoService.savePilotosMercado(this.user.usuario.liga_id).subscribe(() => this.getPilotosMercado());
  }

  private deletePilotosMercado() {
    this.mercadoService.deletePilotosMercado(this.user.usuario.liga_id).subscribe(() => this.createPilotosMercado());

  }
  private borrarPujas() {
    this.pujasService.deletePujas().subscribe(() => this.updateSaldo());


  }
  private updateSaldo() {
    if (this.user) {
      this.authenticationService.loadUser(this.user.usuario.id).subscribe((usuario) => {
        this.user.usuario.saldo = usuario.saldo;
        localStorage.setItem('usuario', JSON.stringify(this.user))
        console.log('obtenido', usuario);
        this.mercadoService.getPilotosMercado(this.user.usuario.liga_id).subscribe(pilotos => {
          this.checkPilotoEscuderia(pilotos);
          this.pilotos = pilotos;
        });
      });
    }


  }

  private checkPilotoEscuderia(pilotos: any) {
    for (var i = 0; i < pilotos.length; i++) {

      switch (pilotos[i].escuderia) {
        case 'Monster Energy Yamaha MotoGP':
          pilotos[i].escuderia = 'blue';
          break;
        case 'Repsol Honda Team':
          pilotos[i].escuderia = 'orange';
          break;
        case 'Ducati Team':
          pilotos[i].escuderia = 'red';

          break;
        case 'Team SUZUKI ECSTAR':
          pilotos[i].escuderia = '#5464BC';
          break;
        case 'Reale Avintia Racing':
          pilotos[i].escuderia = 'white';

          break;
        case 'Aprilia Racing Team Gresini':
          pilotos[i].escuderia = 'black';
          break;
        case 'LCR Honda':
          pilotos[i].escuderia = '#CF8080';

          break;
        case 'Petronas Yamaha SRT':
          pilotos[i].escuderia = '#AAEFFF';
          break;
        case 'Pramac Racing':
          pilotos[i].escuderia = '#984F49';

          break;
        case 'Red Bull KTM Factory Racing':
          pilotos[i].escuderia = '#FF6A00';
          break;
        case 'Red Bull KTM Tech 3':
          pilotos[i].escuderia = '#00064E';
          break;
      }
    }
  }



  public enviarPujas() {

    this.pujasService.guardarPuja(this.user.usuario.id, this.pujas).subscribe(() => {
      this.snackBar.open('Pujas realizadas', 'Exito', {
        duration: 2000,
      });


    },
      (error) => error = this.snackBar.open('Pujas realizadas', 'Exito', {
        duration: 2000,
      }));
    this.limpiarDatosPujas(this.formPilotos);
  }

  public limpiarDatosPujas(form: NgForm) {

    form.reset();
  }

}


