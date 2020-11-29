import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PilotosService } from 'src/app/shared/services/pilotos.service';
import { IPilotos } from 'src/app/shared/models/pilotos.model';
import { EscuderiasService } from 'src/app/shared/services/escuderias.service';
import { IEscuderias } from 'src/app/shared/models/escuderias.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pilotos-detail',
  templateUrl: './pilotos-detail.component.html',
  styleUrls: ['./pilotos-detail.component.scss']
})
/**
 * Clase para el componente de detalle del piloto
 */
export class PilotosDetailComponent implements OnInit {
  public idPiloto: number;
  public piloto: IPilotos;
  public escuderia: IEscuderias;
  public isLoading: boolean = false;
  /**
   * Constructor para el componente de detalle del piloto
   * @param  {ActivatedRoute} privateactivatedRoute
   * @param  {PilotosService} privatepilotosService
   * @param  {EscuderiasService} privateescuderiasService
   * @param  {Location} privatelocation
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private pilotosService: PilotosService,
    private escuderiasService: EscuderiasService,
    private location: Location) { }
  /**
   * Metodo que se ejecuta al inicio y que trae los pilotos con su escuderia
   */
  ngOnInit() {
    this.isLoading = true;
    this.idPiloto = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

    this.pilotosService.getPiloto(this.idPiloto).subscribe((piloto => {
      this.piloto = piloto;
      this.escuderiasService.getEscuderia(this.piloto.id_escuderia).subscribe((escuderia) => {
        this.escuderia = escuderia;
        this.piloto.nombre_escuderia = escuderia[0].nombre;

        this.isLoading = false;

      })
    }));
  }
  /**
   * navega a la anterior pantalla
   */
  public back() {
    this.location.back();
  }
}
