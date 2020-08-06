import { Component, OnInit } from '@angular/core';
import { MercadoService } from 'src/app/shared/services/mercado.service';
import { IMercado } from 'src/app/shared/models/mercado.model';
import { IUser } from 'src/app/shared/models/users.model';
import { IPujas } from 'src/app/shared/models/pujas.model';
import { PujasService } from 'src/app/shared/services/pujas.service';
import { DatePipe, formatDate } from '@angular/common';
import * as moment from 'moment'; // add this 1 of 4
import { format } from 'url';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.scss']
})
export class ComprarComponent implements OnInit {
  public pilotos: any;
  public escuderias: any;
  public puja: number;
  private user: IUser;
  public pujas: Array<IPujas> = [];

  constructor(
    private mercadoService: MercadoService,
    private pujasService: PujasService,
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('usuario'));
    this.getPilotosMercado();
    this.getEscuderiasMercado();
  }
  public coleccionPujas(piloto?: number, puja?: number) {
    let pilotoPuja: IPujas = {
      piloto: piloto,
      puja: puja
    }
    this.pujas.push(pilotoPuja);
    console.log(this.pujas)


  }
  public coleccionPujasEscuderias(escuderia: number, puja: number) {
    let escuderiaPuja: IPujas = {
      escuderia: escuderia,
      puja: puja
    }
    this.pujas.push(escuderiaPuja);
    console.log(this.pujas)
  }
  private getPilotosMercado() {

    let fechaActual = new Date().toISOString().slice(0, 10);
    //fechaActual = '2020-06-02';
    this.mercadoService.getPilotosMercado().subscribe(pilotos => {
      console.log('pilotos', pilotos.length);
      if (pilotos && pilotos.length === 6) {
        console.log('actual', fechaActual);
        console.log('array', pilotos[0])
        console.log('comparacion', String(pilotos[0].fecha) === fechaActual)
        if (String(pilotos[0].fecha) === fechaActual) {
          console.log('comparacion');
          this.checkEscuderia(pilotos);
          this.pilotos = pilotos;
        } else {
          console.log('delete');
          this.deletePilotosMercado();
        }


      } else {
        console.log('crear');
        this.createPilotosMercado();

      }
    });
  }
  private getEscuderiasMercado() {

    let fechaActual = new Date().toISOString().slice(0, 10);
    //fechaActual = '2020-06-02';
    this.mercadoService.getEscuderiasMercado().subscribe(escuderias => {
      console.log('escuderias', escuderias);
      if (escuderias && escuderias.length === 4) {
        if (String(escuderias[0].fecha) === fechaActual) {
          //this.checkEscuderia(escuderias);
          this.escuderias = escuderias;

        } else {

          this.deleteEscuderiasMercado();
        }


      } else {

        this.createEscuderiasMercado();

      }
    });
  }

  private createPilotosMercado() {
    this.mercadoService.savePilotosMercado(this.user.usuario.liga_id).subscribe(() => this.getPilotosMercado());
  }

  private deletePilotosMercado() {
    this.mercadoService.deletePilotosMercado(this.user.usuario.liga_id).subscribe(() => this.createPilotosMercado());

  }

  private createEscuderiasMercado() {
    this.mercadoService.saveEscuderiasMercado(this.user.usuario.liga_id).subscribe(() => this.getEscuderiasMercado());
  }

  private deleteEscuderiasMercado() {
    this.mercadoService.deleteEscuderiasMercado(this.user.usuario.liga_id).subscribe(() => this.createEscuderiasMercado());

  }

  private checkEscuderia(pilotos: any) {
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
    this.pujasService.guardarPuja(this.user.usuario.id, this.pujas).subscribe(puja => puja);
  }

  public limpiarDatosPujas(form: NgForm) {

    form.reset();
  }

}
