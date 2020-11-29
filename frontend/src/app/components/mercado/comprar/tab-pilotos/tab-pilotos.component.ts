

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
/**
 * Clase para el componente de comprar pilotos
 */
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
  /**
   * Constructor para el componente de comprar pilotos
   * @param  {MercadoService} privatemercadoService
   * @param  {PujasService} privatepujasService
   * @param  {MatSnackBar} privatesnackBar
   * @param  {AuthenticationService} privateauthenticationService
   */
  constructor(
    private mercadoService: MercadoService,
    private pujasService: PujasService,
    private snackBar: MatSnackBar,
    private authenticationService: AuthenticationService
  ) { }
  /**
   * Metodo que se ejecuta al inicio
   */
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('usuario'));
    this.usuario = this.user.usuario;
    this.getPilotosMercado();



  }
  /**
   * Metodo que se ejecuta cuando cambia el saldo restante
   * @param  {SimpleChanges} changes //los cambios que se produjeron
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.saldoRestante.currentValue) {
      this.usuario.saldoRestante = changes.saldoRestante.currentValue;
    }

  }

  /**
   * Coleccion que se va realizando a medida que se van introduciendo pujas
   * Tiene varias condiciones dependiendo de si existe la puja o no o si ya existe puja para ese piloto
   * Realiza las validaciones correspondientes sobre el saldo y el valor del mercado
   * @param  {any} piloto? //piloto sobre el que se realiza la puja
   * @param  {number} puja? //valor de la puja realizada
   */
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
    }

  }


  /**
   * Obtiene los pilotos del mercado correspondientes al dia actual
   * Comprueba las pujas obtenidas para restarlas al saldo
   */
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
          this.isLoading = false;
        } else {
          this.isLoading = true;
          this.borrarPujas();
        }
        let existe = pilotos.find(element => element.valorPuja > 0);
        if (existe) {
          this.formInvalid = false;
        } else {
          this.formInvalid = true;
        }
      } else {

      }

    });
  }
  /**
   * Crea pilotos para el mercado
   * Se ejecuta cuando no hay pilotos en el mercado en el dia actual
   */
  private createPilotosMercado() {
    this.mercadoService.savePilotosMercado(this.user.usuario.liga_id).subscribe(() => this.getPilotosMercado());
  }
  /**
   * Borra los pilotos del mercado
   */
  private deletePilotosMercado() {
    this.mercadoService.deletePilotosMercado(this.user.usuario.liga_id).subscribe(() => this.createPilotosMercado());

  }
  /**
   * Borra las pujas 
   */
  private borrarPujas() {
    this.pujasService.deletePujas().subscribe(() => this.updateSaldo());


  }
  /**
   * Actualiza el saldo del usuario y vuelve a obtener los pilotos
   */
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
  /**
   * Comprueba la escuderia del piloto para asignarle el color correspondiente
   * @param  {any} pilotos //coleccion de pilotos
   */
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


  /**
   * Envia las pujas del usuario  y actualiza el saldo
   */
  public enviarPujas() {
    if (this.usuario.saldoRestante >= 0) {
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
  /**
   * Borra las pujas y actualiza el saldo dependiendo de las pujas borradas
   * @param  {NgForm} form
   */
  public limpiarDatosPujas(form: NgForm) {

    let totalPujasBorradas = 0;
    this.pujas.forEach(element => {
      totalPujasBorradas = totalPujasBorradas + element.puja;
    });

    this.pujasService.borrarPujasUsuario(this.user.usuario.id, 'pilotos').subscribe(() => {
      this.snackBar.open('Pujas borradas', 'Exito', {
        duration: 2000,
      });
      this.totalPujado = this.usuario.saldo - this.usuario.saldoRestante - totalPujasBorradas;
      this.pujas = [];
      this.getPilotosMercado();
    })

  }



}


