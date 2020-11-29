import { Component, OnInit } from '@angular/core';
import { IPilotos } from 'src/app/shared/models/pilotos.model';
import { PilotosService } from 'src/app/shared/services/pilotos.service';
import { EscuderiasService } from 'src/app/shared/services/escuderias.service';
import { IEscuderias } from 'src/app/shared/models/escuderias.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pilotos-add',
  templateUrl: './pilotos-add.component.html',
  styleUrls: ['./pilotos-add.component.scss']
})
/**
 * Clase para el componente de añadir pilotos
 */
export class PilotosAddComponent implements OnInit {
  public piloto: IPilotos = {};
  public escuderias: Array<IEscuderias> = [];
  private pilotoId: string;
  public isLoading: boolean = true;
  /**
   * Constructor para el componente de añadir pilotos
   * @param  {PilotosService} privatepilotosService
   * @param  {EscuderiasService} privateescuderiasService
   * @param  {ActivatedRoute} privateroute
   * @param  {Location} privatelocation
   * @param  {MatSnackBar} privatesnackbar
   */
  constructor(
    private pilotosService: PilotosService,
    private escuderiasService: EscuderiasService,
    private route: ActivatedRoute,
    private location: Location,
    private snackbar: MatSnackBar
  ) { }
  /**
   * Metodo que se ejecuta al inicio
   */
  ngOnInit() {
    this.pilotoId = this.route.snapshot.paramMap.get('id');
    this.fetchEscuderias();
  }
  /**
   * Añade el piloto con los datos introducidos
   * @param  {NgForm} form
   */
  create(form: NgForm) {
    this.pilotosService.addPiloto(this.piloto).subscribe(() => {
      form.reset();
      this.snackbar.open('Piloto añadido', null, {
        duration: 2000
      })
    });
  }
  /**
   * Modifica los datos del piloto 
   */
  edit() {
    this.pilotosService.editPiloto(this.piloto, this.pilotoId).subscribe(() => {
      this.snackbar.open('Piloto actualizado', null, {
        duration: 2000
      })
    });
  }
  /**
   * Obtiene las escuderias
   */
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
  /**
   * Obtiene los pilotos
   */
  private fetchPiloto() {
    this.pilotosService.getPiloto(parseInt(this.pilotoId)).subscribe((piloto) => {
      this.piloto = piloto;
      this.isLoading = false;
    });
  }
  /**
   * Edita o crea dependiendo de si ya existe el piloto
   * @param  {NgForm} form 
   */
  submitData(form: NgForm) {
    if (this.pilotoId) {
      this.edit();
    } else {

      this.create(form);


    }
  }
  /**
   * Navega a la pantalla anterior
   */
  back() {
    this.location.back();
  }

}
