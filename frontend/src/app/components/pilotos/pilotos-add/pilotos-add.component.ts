import { Component, OnInit } from '@angular/core';
import { IPilotos } from 'src/app/shared/models/pilotos.model';
import { PilotosService } from 'src/app/shared/services/pilotos.service';
import { EscuderiasService } from 'src/app/shared/services/escuderias.service';
import { IEscuderias } from 'src/app/shared/models/escuderias.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pilotos-add',
  templateUrl: './pilotos-add.component.html',
  styleUrls: ['./pilotos-add.component.scss']
})
export class PilotosAddComponent implements OnInit {
  public piloto: IPilotos = {};
  public escuderias: Array<IEscuderias> = [];
  private pilotoId: string;
  constructor(
    private pilotosService: PilotosService,
    private escuderiasService: EscuderiasService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.pilotoId = this.route.snapshot.paramMap.get('id');
    this.fetchEscuderias();
  }

  create() {
    console.log(this.piloto);
    this.pilotosService.addPiloto(this.piloto).subscribe();
  }
  edit() {
    console.log(this.piloto);
    this.pilotosService.editPiloto(this.piloto, this.pilotoId).subscribe();
  }

  private fetchEscuderias() {
    this.escuderiasService.getAll().subscribe((escuderias) => {
      this.escuderias = escuderias;
      if (this.pilotoId) {
        this.fetchPiloto();
      }
    });
  }

  private fetchPiloto() {
    this.pilotosService.getPiloto(parseInt(this.pilotoId)).subscribe((piloto) => {
      this.piloto = piloto[0];
      //this.piloto.nombre_escuderia = this.escuderias[this.piloto.id_escuderia].nombre;
    });
  }

  submitData() {
    if (this.pilotoId) {
      this.edit();
    } else {
      this.create();
    }
  }

}
