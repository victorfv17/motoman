import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-eliminar',
  templateUrl: './dialog-eliminar.component.html',
  styleUrls: ['./dialog-eliminar.component.scss']
})
/**
 * Clase para la modal de eliminar
 */
export class DialogEliminarComponent implements OnInit {
  /**
   * Constructor para la modal de eliminar
   * @param  {MatDialogRef<DialogEliminarComponent>} publicdialogRef
   */
  constructor(
    public dialogRef: MatDialogRef<DialogEliminarComponent>,

  ) { }
  /**
   * Se ejecuta al inicio
   */
  ngOnInit() {
  }
  /**
   * Se ejecuta cuando acepta la eliminacion
   */
  accept() {
    this.dialogRef.close('accept');
  }
  /**
   * Se ejecuta cuando cancela la eliminacion
   */
  cancel() {
    this.dialogRef.close();
  }

}
