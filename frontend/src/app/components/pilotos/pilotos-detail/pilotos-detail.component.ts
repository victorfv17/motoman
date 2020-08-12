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
export class PilotosDetailComponent implements OnInit {
  public idPiloto: number;
  public piloto: IPilotos;
  public escuderia: IEscuderias;
  public isLoading: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private pilotosService: PilotosService,
    private escuderiasService: EscuderiasService,
    private location: Location) { }

  ngOnInit() {
    //Añadir foto al detail
    this.isLoading = true;
    this.idPiloto = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

    this.pilotosService.getPiloto(this.idPiloto).subscribe((piloto => {
      if (!piloto) return;
      this.piloto = piloto[0];
      this.escuderiasService.getEscuderia(this.piloto.id_escuderia).subscribe((escuderia) => {
        if (!escuderia) return;
        this.escuderia = escuderia;
        this.piloto.nombre_escuderia = escuderia[0].nombre;

        this.isLoading = false;

      })
    }));
  }
  public back() {
    this.location.back();
  }
}
