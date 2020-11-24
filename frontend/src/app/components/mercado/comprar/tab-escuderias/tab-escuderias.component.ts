import { Component, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IPujas } from 'src/app/shared/models/pujas.model';
import { MercadoService } from 'src/app/shared/services/mercado.service';
import { IUser } from 'src/app/shared/models/users.model';
import { PujasService } from 'src/app/shared/services/pujas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tab-escuderias',
  templateUrl: './tab-escuderias.component.html',
  styleUrls: ['./tab-escuderias.component.scss']
})
export class TabEscuderiasComponent implements OnInit, OnChanges {
  @ViewChild('formEscuderias', { static: true }) formEscuderias: NgForm;
  @Input() saldoRestante: number;
  @Output() saldo = new EventEmitter();
  formInvalid = false;
  public escuderias: Array<any> = [];
  public puja: number;
  public user: IUser;
  public pujas: Array<IPujas> = [];
  public isLoading: boolean = true;
  public usuario: any;
  private totalPujado: number = 0;
  totalPujas: number = 0;
  constructor(
    private mercadoService: MercadoService,
    private pujasService: PujasService,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('usuario'));
    this.usuario = this.user.usuario;

    this.getEscuderiasMercado();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.saldoRestante.currentValue) {
      this.usuario.saldoRestante = changes.saldoRestante.currentValue;
    }

    //this.doSomething(changes.categoryId.currentValue);
    // You can also use categoryId.previousValue and 
    // categoryId.firstChange for comparing old and new values

  }

  public coleccionPujasEscuderias(escuderia: any, puja: number) {
    let index = this.escuderias.findIndex(elem => elem.idMercado === escuderia.idMercado);
    if (puja === null) {
      let existeEscuderia = this.pujas.find(((elemento) => elemento.escuderia === escuderia.idMercado));
      if (existeEscuderia) {
        this.usuario.saldoRestante = this.usuario.saldoRestante + existeEscuderia.puja;
        this.pujas.splice(this.pujas.indexOf(existeEscuderia), 1);
      }

    }
    if (!puja) {
      console.log(this.escuderias);
      let existe = this.escuderias.find(element => element.puja > 0);
      if (existe) {
        this.formInvalid = false;
      } else {
        this.formInvalid = true;
      }
    } else if (puja > this.user.usuario.saldo) {
      this.escuderias[index].saldoMenorQuePuja = true;
      this.formInvalid = true;
    } else if (puja < escuderia.valorMercado) {
      this.escuderias[index].pujaMenorQueValorMercado = true;
      this.formInvalid = true;
    } else {
      this.escuderias[index].saldoMenorQuePuja = false;
      this.escuderias[index].pujaMenorQueValorMercado = false;
      this.formInvalid = false;
      let existe = this.pujas.find((elemento) => elemento.escuderia === escuderia.idMercado);
      if (existe) {
        this.usuario.saldoRestante = this.usuario.saldoRestante + existe.puja;
        this.pujas.splice(this.pujas.indexOf(existe), 1);

      }
      let escuderiaPuja: IPujas = {
        escuderia: escuderia.idMercado,
        puja: puja
      }
      this.pujas.push(escuderiaPuja);
      console.log('pujas', this.pujas);
      this.usuario.saldoRestante = this.usuario.saldoRestante - puja;
    }
  }

  private getEscuderiasMercado() {

    let fechaActual = new Date().toISOString().slice(0, 10);
    //fechaActual = '2020-06-02';
    this.mercadoService.getEscuderiasMercado(this.user.usuario).subscribe(escuderias => {

      if (escuderias && escuderias.length > 0) {
        if (String(escuderias[0].fecha) === fechaActual) {
          this.checkEscuderia(escuderias);
          this.escuderias = escuderias;
          this.escuderias.forEach(escuderia => {
            this.totalPujado = this.totalPujado + escuderia.puja;
            if (escuderia.puja != null) {
              let escuderiaPuja: IPujas = {
                escuderia: escuderia.idMercado,
                puja: escuderia.puja
              }
              this.pujas.push(escuderiaPuja);
              console.log(this.pujas);
            }

          });

          this.usuario.saldoRestante = this.usuario.saldoRestante - this.totalPujado;
          this.saldo.emit(this.usuario.saldoRestante);
          this.isLoading = false;
        } else {
          this.isLoading = true;
          this.borrarPujas();
          // this.deleteEscuderiasMercado();
        }

        let existe = escuderias.find(element => element.valorPuja > 0);
        if (existe) {
          this.formInvalid = false;
        } else {
          this.formInvalid = true;
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
        this.user.usuario.saldoRestante = usuario.saldo;
        localStorage.setItem('usuario', JSON.stringify(this.user))
        this.mercadoService.getEscuderiasMercado(this.user.usuario).subscribe(escuderias => {
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
    if (this.usuario.saldoRestante >= 0) {

      this.pujasService.guardarPuja(this.user.usuario.id, this.pujas).subscribe(() => {
        this.user.usuario = this.usuario;
        this.saldo.emit(this.usuario.saldoRestante);
        localStorage.setItem('usuario', JSON.stringify(this.usuario));
        this.snackBar.open('Pujas realizadas', 'Exito', {
          duration: 2000,
        });
      },
        (error) => {
          this.user.usuario = this.usuario;
          this.saldo.emit(this.usuario.saldoRestante);
          localStorage.setItem('usuario', JSON.stringify(this.user));
          error = this.snackBar.open('Pujas realizadas', 'Exito', {
            duration: 2000,
          })
        });

    } else {
      this.snackBar.open('No se han realizado las pujas porque no tienes saldo suficiente', 'Error', {
        duration: 2000,
      })
    }
  }

  public limpiarDatosPujas(form: NgForm) {
    let totalPujasBorradas = 0;
    this.pujas.forEach(element => {
      totalPujasBorradas = totalPujasBorradas + element.puja;
    });
    this.pujasService.borrarPujasUsuario(this.user.usuario.id, 'escuderias').subscribe(() => {
      this.snackBar.open('Pujas borradas', 'Exito', {
        duration: 2000,
      });
      // this.totalPujado = this.usuario.saldo - this.usuario.saldoRestante - totalPujasBorradas;
      // this.pujas = [];
      this.totalPujado = 0;
      this.usuario.saldoRestante = this.usuario.saldoRestante + totalPujasBorradas;
      this.pujas = [];
      this.getEscuderiasMercado();
    })
  }

}