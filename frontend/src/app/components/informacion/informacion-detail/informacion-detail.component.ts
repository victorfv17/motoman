import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-informacion-detail',
  templateUrl: './informacion-detail.component.html',
  styleUrls: ['./informacion-detail.component.scss']
})
export class InformacionDetailComponent implements OnInit {
  public idPiloto: string;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.idPiloto = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
