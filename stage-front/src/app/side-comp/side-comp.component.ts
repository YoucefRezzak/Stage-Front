import { Component, OnInit } from '@angular/core';
import {CompteService } from '../services/comptes.services';
import {EcritureService } from '../services/ecriture.service';

@Component({
  selector: 'app-side-comp',
  templateUrl: './side-comp.component.html',
  styleUrls: ['./side-comp.component.css']
})
export class SideCompComponent implements OnInit {
  showFiller = true;
  constructor(private compteService: CompteService, private ecritureService: EcritureService) { }
  ngOnInit() {

  }
  ouvComptes() {
    this.showFiller = true;
  }
}
