import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IPujas } from 'src/app/shared/models/pujas.model';
import { MercadoService } from 'src/app/shared/services/mercado.service';
import { IUser } from 'src/app/shared/models/users.model';
import { PujasService } from 'src/app/shared/services/pujas.service';

@Component({
  selector: 'app-tab-escuderias',
  templateUrl: './tab-escuderias.component.html',
  styleUrls: ['./tab-escuderias.component.scss']
})
export class TabEscuderiasComponent implements OnInit {
  formInvalid = false;
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

    this.getEscuderiasMercado();
  }

  public coleccionPujasEscuderias(escuderia: any, puja: number) {
    if (puja < escuderia.valorMercado) {
      this.formInvalid = true;
    } else {
      this.formInvalid = false;
      let escuderiaPuja: IPujas = {
        escuderia: escuderia,
        puja: puja
      }
      this.pujas.push(escuderiaPuja);
      console.log(this.pujas)
    }
  }

  private getEscuderiasMercado() {

    let fechaActual = new Date().toISOString().slice(0, 10);
    //fechaActual = '2020-06-02';
    this.mercadoService.getEscuderiasMercado().subscribe(escuderias => {
      console.log('escuderias', escuderias);
      if (escuderias && escuderias.length === 4) {
        if (String(escuderias[0].fecha) === fechaActual) {
          this.checkEscuderia(escuderias);
          this.escuderias = escuderias;

        } else {

          this.deleteEscuderiasMercado();
        }


      } else {

        this.createEscuderiasMercado();

      }
    });
  }

  private createEscuderiasMercado() {
    this.mercadoService.saveEscuderiasMercado(this.user.usuario.liga_id).subscribe(() => this.getEscuderiasMercado());
  }

  private deleteEscuderiasMercado() {
    this.mercadoService.deleteEscuderiasMercado(this.user.usuario.liga_id).subscribe(() => this.createEscuderiasMercado());

  }

  private checkEscuderia(escuderias: any) {
    for (var i = 0; i < escuderias.length; i++) {

      switch (escuderias[i].nombre) {
        case 'Monster Energy Yamaha MotoGP':
          escuderias[i].color = 'blue';
          break;
        case 'Repsol Honda Team':
          escuderias[i].color = 'orange';
          break;
        case 'Ducati Team':
          escuderias[i].color = 'red';

          break;
        case 'Team SUZUKI ECSTAR':
          escuderias[i].color = '#5464BC';
          break;
        case 'Reale Avintia Racing':
          escuderias[i].color = 'white';

          break;
        case 'Aprilia Racing Team Gresini':
          escuderias[i].color = 'black';
          break;
        case 'LCR Honda':
          escuderias[i].color = '#CF8080';

          break;
        case 'Petronas Yamaha SRT':
          escuderias[i].color = '#AAEFFF';
          break;
        case 'Pramac Racing':
          escuderias[i].color = '#984F49';

          break;
        case 'Red Bull KTM Factory Racing':
          escuderias[i].color = '#FF6A00';
          break;
        case 'Red Bull KTM Tech 3':
          escuderias[i].color = '#00064E';
          break;
      }
    }

  }
  public enviarPujas() {

    this.pujasService.guardarPuja(this.user.usuario.id, this.pujas).subscribe(() => {
    },
      (error) => error = undefined);
  }

  public limpiarDatosPujas(form: NgForm) {

    form.reset();
  }

}