import { Component, OnInit } from '@angular/core';
import { IEscuderias } from 'src/app/shared/models/escuderias.model';
import { ActivatedRoute } from '@angular/router';
import { EscuderiasService } from 'src/app/shared/services/escuderias.service';

@Component({
  selector: 'app-escuderias-add',
  templateUrl: './escuderias-add.component.html',
  styleUrls: ['./escuderias-add.component.scss']
})
export class EscuderiasAddComponent implements OnInit {

  public escuderia: IEscuderias = {};
  public escuderiaId: string;
  constructor(
    private escuderiasService: EscuderiasService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.escuderiaId = this.route.snapshot.paramMap.get('id');
    if (this.escuderiaId) {
      console.log(this.escuderiaId)
      this.fetchEscuderia();
    }

  }

  create() {
    this.escuderiasService.addEscuderia(this.escuderia).subscribe();
  }
  edit() {

    this.escuderiasService.editEscuderia(this.escuderia, this.escuderiaId).subscribe();
  }


  private fetchEscuderia() {
    this.escuderiasService.getEscuderia(parseInt(this.escuderiaId)).subscribe((escuderia) => {
      this.escuderia = escuderia[0];

    });
  }

  submitData() {
    if (this.escuderiaId) {
      this.edit();
    } else {
      this.create();
    }
  }
}
