import { Component, OnInit } from '@angular/core';
import { IPilotos } from 'src/app/shared/models/pilotos.model';
import { PilotosService } from 'src/app/shared/services/pilotos.service';
import { EscuderiasService } from 'src/app/shared/services/escuderias.service';
import { IEscuderias } from 'src/app/shared/models/escuderias.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-pilotos-add',
  templateUrl: './pilotos-add.component.html',
  styleUrls: ['./pilotos-add.component.scss']
})
export class PilotosAddComponent implements OnInit {
  public piloto: IPilotos = {};
  public escuderias: Array<IEscuderias> = [];
  private pilotoId: string;
  public isLoading: boolean = true;
  constructor(
    private pilotosService: PilotosService,
    private escuderiasService: EscuderiasService,
    private route: ActivatedRoute,
    private location: Location,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.pilotoId = this.route.snapshot.paramMap.get('id');
    this.fetchEscuderias();
  }

  create() {
    this.pilotosService.addPiloto(this.piloto).subscribe(() => {
      this.snackbar.open('Piloto añadido', null, {
        duration: 2000
      })
    });
  }
  edit() {
    this.pilotosService.editPiloto(this.piloto, this.pilotoId).subscribe(() => {
      this.snackbar.open('Piloto actualizado', null, {
        duration: 2000
      })
    });
  }

  private fetchEscuderias() {
    this.escuderiasService.getAll().subscribe((escuderias) => {
      this.escuderias = escuderias;
      this.isLoading = false;
      if (this.pilotoId) {
        this.isLoading = true;
        this.fetchPiloto();
      }

    });
  }

  private fetchPiloto() {
    this.pilotosService.getPiloto(parseInt(this.pilotoId)).subscribe((piloto) => {
      this.piloto = piloto;
      //this.piloto.nombre_escuderia = this.escuderias[this.piloto.id_escuderia].nombre;
      this.isLoading = false;
    });
  }

  submitData() {
    if (this.pilotoId) {
      this.edit();
    } else {
      this.create();
    }
  }

  back() {
    this.location.back();
  }

}
