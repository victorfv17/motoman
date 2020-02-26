import { Component, OnInit } from '@angular/core';
import { ILigas } from 'src/app/shared/models/ligas.model';
import { LigasService } from 'src/app/shared/services/ligas.service';

@Component({
  selector: 'app-liga-create',
  templateUrl: './liga-create.component.html',
  styleUrls: ['./liga-create.component.scss']
})
export class LigaCreateComponent implements OnInit {
  public isLoading: boolean = false;
  public liga: ILigas = {};
  constructor(private ligasService: LigasService) { }

  ngOnInit() {
  }
  public create(): void {
    this.ligasService.createLiga(this.liga).subscribe((data) => console.log(data));
  }

}
