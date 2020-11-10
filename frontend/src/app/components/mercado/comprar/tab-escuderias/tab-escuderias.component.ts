import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IPujas } from 'src/app/shared/models/pujas.model';
import { MercadoService } from 'src/app/shared/services/mercado.service';
import { IUser } from 'src/app/shared/models/users.model';
import { PujasService } from 'src/app/shared/services/pujas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-tab-escuderias',
  templateUrl: './tab-escuderias.component.html',
  styleUrls: ['./tab-escuderias.component.scss']
})
export class TabEscuderiasComponent implements OnInit {
  @ViewChild('formEscuderias', { static: true }) formEscuderias: NgForm;
  formInvalid = false;
  public escuderias: Array<any> = [];
  public puja: number;
  private user: IUser;
  public pujas: Array<IPujas> = [];
  public isLoading: boolean = true;
  constructor(
    private mercadoService: MercadoService,
    private pujasService: PujasService,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('usuario'));

    this.getEscuderiasMercado();
  }

  public coleccionPujasEscuderias(escuderia: any, puja: number) {
    let index = this.escuderias.findIndex(elem => elem.idMercado === escuderia.idMercado);
    if (puja > this.user.usuario.saldo) {
      this.escuderias[index].saldoMenorQuePuja = true;
      this.formInvalid = true;
    } else if (puja < escuderia.valorMercado) {
      this.escuderias[index].pujaMenorQueValorMercado = true;
      this.formInvalid = true;
    } else {
      this.escuderias[index].saldoMenorQuePuja = false;
      this.escuderias[index].pujaMenorQueValorMercado = false;
      this.formInvalid = false;
      let escuderiaPuja: IPujas = {
        escuderia: escuderia.idMercado,
        puja: puja
      }
      this.pujas.push(escuderiaPuja);
    }
  }

  private getEscuderiasMercado() {

    let fechaActual = new Date().toISOString().slice(0, 10);
    //fechaActual = '2020-06-02';
    this.mercadoService.getEscuderiasMercado(this.user.usuario.liga_id).subscribe(escuderias => {

      if (escuderias && escuderias.length > 0) {
        if (String(escuderias[0].fecha) === fechaActual) {
          this.checkEscuderia(escuderias);
          this.escuderias = escuderias;
          this.isLoading = false;
        } else {
          this.isLoading = true;
          this.borrarPujas();
          // this.deleteEscuderiasMercado();
        }


      } else {


      }

    });
  }

  private createEscuderiasMercado() {
    this.mercadoService.saveEscuderiasMercado(this.user.usuario.liga_id).subscribe(() => this.getEscuderiasMercado());
  }

  private deleteEscuderiasMercado() {
    this.mercadoService.deleteEscuderiasMercado(this.user.usuario.liga_id).subscribe(() => this.createEscuderiasMercado());

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
        this.mercadoService.getEscuderiasMercado(this.user.usuario.liga_id).subscribe(escuderias => {
          this.checkEscuderia(escuderias);
          this.escuderias = this.escuderias;
          this.isLoading = false;
        });
      });
    }


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
      this.snackBar.open('Pujas realizadas', 'Exito', {
        duration: 2000,
      });
    },
      (error) => error = this.snackBar.open('Pujas realizadas', 'Exito', {
        duration: 2000,
      }));
    this.limpiarDatosPujas(this.formEscuderias);
  }

  public limpiarDatosPujas(form: NgForm) {

    form.reset();
  }

}