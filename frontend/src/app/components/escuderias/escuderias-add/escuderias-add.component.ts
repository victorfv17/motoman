import { Component, OnInit } from '@angular/core';
import { IEscuderias } from 'src/app/shared/models/escuderias.model';
import { ActivatedRoute } from '@angular/router';
import { EscuderiasService } from 'src/app/shared/services/escuderias.service';
import { Location, NgForOf } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-escuderias-add',
  templateUrl: './escuderias-add.component.html',
  styleUrls: ['./escuderias-add.component.scss']
})
/**
 * Clase para el componente de añadir o editar escuderia
 */
export class EscuderiasAddComponent implements OnInit {

  public escuderia: IEscuderias = {};
  public escuderiaId: string;
  public isLoading: boolean = true;
  /**
   * Constructor para el componente de añadir o editar escuderia
   * @param  {EscuderiasService} privateescuderiasService
   * @param  {ActivatedRoute} privateroute
   * @param  {Location} privatelocation
   * @param  {MatSnackBar} privatesnackbar
   */
  constructor(
    private escuderiasService: EscuderiasService,
    private route: ActivatedRoute,
    private location: Location,
    private snackbar: MatSnackBar
  ) { }
  /**
   * Metodo que se ejecuta al inicio
   */
  ngOnInit() {
    this.escuderiaId = this.route.snapshot.paramMap.get('id');
    if (this.escuderiaId) {
      this.fetchEscuderia();
    } else {
      this.isLoading = false;
    }

  }
  /**
   * Envia la informacion de la escuderia para añadirla
   * @param  {NgForm} form //formulario para limpiar la informacion
   */
  create(form: NgForm) {
    this.escuderiasService.addEscuderia(this.escuderia).subscribe(() => {
      form.reset();
      this.snackbar.open('Escudería añadida', null, {
        duration: 2000
      })
    });
  }
  /**
   * Envia la informacion modificada de la escuderia 
   */
  edit() {

    this.escuderiasService.editEscuderia(this.escuderia, this.escuderiaId).subscribe(() => {
      this.snackbar.open('Escudería actualizada', null, {
        duration: 2000
      })
    });
  }

  /**
   * Obtiene los datos de la escuderia por el id
   */
  private fetchEscuderia() {
    this.escuderiasService.getEscuderia(parseInt(this.escuderiaId)).subscribe((escuderia) => {
      this.escuderia = escuderia[0];
      this.isLoading = false;
    });
  }
  /**
   * Comprueba si hay id para editar o crear la escuderia
   * @param  {NgForm} form //formulario con la informacion de la escuderia
   */
  submitData(form: NgForm) {
    if (this.escuderiaId) {
      this.edit();
    } else {
      this.create(form);
    }
  }
  /**
   * Navega a la anterior pantalla
   */
  back() {
    this.location.back();
  }
}
