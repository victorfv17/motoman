

import { EventEmitter, Input, SimpleChanges } from '@angular/core';
import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm, Form } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { skip } from 'rxjs/operators';
import { IPilotos } from 'src/app/shared/models/pilotos.model';
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
  @Input() saldoRestante: number;
  @Output() saldo = new EventEmitter();
  formInvalid: boolean = false;
  public pilotos: Array<any> = [];
  public escuderias: any;
  public puja: number;
  public user: IUser;
  public pujas: Array<IPujas> = [];
  public isLoading: boolean = true;
  public usuario: any;
  private totalPujado: number = 0;
  constructor(
    private mercadoService: MercadoService,
    private pujasService: PujasService,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('usuario'));
    this.usuario = this.user.usuario;
    this.getPilotosMercado();

    // this.fetchPujasUsuario();

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.saldoRestante.currentValue) {
      this.usuario.saldoRestante = changes.saldoRestante.currentValue;
    }

    //this.doSomething(changes.categoryId.currentValue);
    // You can also use categoryId.previousValue and 
    // categoryId.firstChange for comparing old and new values

  }

  public coleccionPujas(piloto?: any, puja?: number) {
    let index = this.pilotos.findIndex(elem => elem.idMercado === piloto.idMercado);
    if (puja === null) {
      let existePiloto = this.pujas.find(((elemento) => elemento.piloto === piloto.idMercado));
      if (existePiloto) {
        this.usuario.saldoRestante = this.usuario.saldoRestante + existePiloto.puja;
        this.pujas.splice(this.pujas.indexOf(existePiloto), 1);
      }

    }
    if (!puja) {
      let existe = this.pilotos.find(element => element.valorPuja > 0);
      if (existe) {
        this.formInvalid = false;
      } else {
        this.formInvalid = true;
      }
    } else if (puja > this.user.usuario.saldo) {
      this.pilotos[index].saldoMenorQuePuja = true;
      this.formInvalid = true;
    } else if (puja < piloto.valorMercado) {
      this.pilotos[index].pujaMenorQueValorMercado = true;
      this.formInvalid = true;
    } else {
      this.pilotos[index].saldoMenorQuePuja = false;
      this.pilotos[index].pujaMenorQueValorMercado = false;
      this.formInvalid = false;

      let existe = this.pujas.find((elemento) => elemento.piloto === piloto.idMercado);
      if (existe) {
        this.usuario.saldoRestante = this.usuario.saldoRestante + existe.puja;
        this.pujas.splice(this.pujas.indexOf(existe), 1);

      }

      let pilotoPuja: IPujas = {
        piloto: piloto.idMercado,
        puja: Number(puja)
      }
      this.pujas.push(pilotoPuja);
      this.usuario.saldoRestante = this.usuario.saldoRestante - puja;
      console.log(this.pujas);
    }

  }



  private getPilotosMercado() {

    let fechaActual = new Date().toISOString().slice(0, 10);
    this.mercadoService.getPilotosMercado(this.user.usuario).subscribe(pilotos => {
      if (pilotos && pilotos.length > 0) {
        if (String(pilotos[0].fecha) === fechaActual) {
          this.checkPilotoEscuderia(pilotos);
          this.pilotos = pilotos;
          this.pilotos.forEach(piloto => {
            this.totalPujado = this.totalPujado + piloto.valorPuja;
            if (piloto.valorPuja != null) {
              let pilotoPuja: IPujas = {
                piloto: piloto.idMercado,
                puja: Number(piloto.valorPuja)
              }
              this.pujas.push(pilotoPuja);
            }


          });

          this.usuario.saldoRestante = this.usuario.saldo - this.totalPujado;
          this.saldo.emit(this.usuario.saldoRestante);
          // this.fetchPujasUsuario();
          this.isLoading = false;
        } else {
          this.isLoading = true;
          this.borrarPujas();
          // this.createPilotosMercado();
          // this.deletePilotosMercado();
        }
        let existe = pilotos.find(element => element.valorPuja > 0);
        if (existe) {
          this.formInvalid = false;
        } else {
          this.formInvalid = true;
        }

        //el create se hace dos veces hay que pensar esto para que no se haga bucle
      } else {

        //this.createPilotosMercado();

        // this.borrarPujas();
        // this.createPilotosMercado();

      }

    });
  }

  // private fetchPujasUsuario() {
  //   this.pujasService.getPujasUsuario(this.user.usuario.id).subscribe((pujas) => {
  //     this.pilotos.map((piloto) => {
  //       let existe = pujas.find((puja) => puja.mercadoPilotoId === piloto.idMercado);
  //       console.log(existe);
  //       if (existe) {
  //         piloto.valorPuja = existe.valorPuja;
  //         this.formInvalid = false;
  //       }
  //     })
  //     console.log(this.pilotos);
  //     //this.pujas = pujas;
  //   });
  // }

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
        this.user.usuario.saldoRestante = usuario.saldo;
        localStorage.setItem('usuario', JSON.stringify(this.user));
        this.mercadoService.getPilotosMercado(this.user.usuario).subscribe(pilotos => {
          this.checkPilotoEscuderia(pilotos);
          this.pilotos = pilotos;
          this.isLoading = false;
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
    // let totalPujas = 0;
    // this.pujas.forEach(element => {
    //   totalPujas = totalPujas + element.puja;
    // });

    if (this.usuario.saldoRestante >= 0) {
      // this.usuario.saldoRestante = this.usuario.saldo - totalPujas;
      this.pujasService.guardarPuja(this.user.usuario.id, this.pujas).subscribe(() => {
        this.user.usuario = this.usuario;
        localStorage.setItem('usuario', JSON.stringify(this.user));
        this.saldo.emit(this.usuario.saldoRestante);
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
        }
      );
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
    //form.reset();
    this.pujasService.borrarPujasUsuario(this.user.usuario.id, 'pilotos').subscribe(() => {
      // this.pujas.forEach(element => {
      //   this.usuario.saldoRestante = this.usuario.saldoRestante + element.puja;
      // });

      this.snackBar.open('Pujas borradas', 'Exito', {
        duration: 2000,
      });
      this.totalPujado = this.usuario.saldo - this.usuario.saldoRestante - totalPujasBorradas;
      this.pujas = [];
      this.getPilotosMercado();


      //this.usuario.saldoRestante = this.usuario.saldo;
    })

  }



}


