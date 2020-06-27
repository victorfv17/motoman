import { Component, OnInit } from '@angular/core';
import { MercadoService } from 'src/app/shared/services/mercado.service';
import { IMercado } from 'src/app/shared/models/mercado.model';
import { IUser } from 'src/app/shared/models/users.model';
import { IPujas } from 'src/app/shared/models/pujas.model';
import { PujasService } from 'src/app/shared/services/pujas.service';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.scss']
})
export class ComprarComponent implements OnInit {
  public pilotos: any;
  public puja: number;
  private user: IUser;
  public pujas: Array<IPujas> = [];
  constructor(private mercadoService: MercadoService, private pujasService: PujasService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('usuario'));
    this.getPilotosMercado();
  }
  public recopilacion(piloto: number, puja: number) {
    let pilotoPuja: IPujas = {
      piloto: piloto,
      puja: puja
    }
    this.pujas.push(pilotoPuja);
    console.log(this.pujas)
  }
  private getPilotosMercado() {
    this.mercadoService.getPilotosMercado().subscribe(pilotos => {
      if (pilotos.length === 6) {
        this.checkEscuderia(pilotos);
        this.pilotos = pilotos;
      } else {
        this.createPilotosMercado();

      }
    });
  }

  private createPilotosMercado() {
    this.mercadoService.savePilotosMercado(this.user.usuario.liga_id).subscribe(mercado => mercado);
    this.getPilotosMercado();
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

}
