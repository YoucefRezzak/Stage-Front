import { Component, OnInit } from '@angular/core';
import {CompteService} from '../services/comptes.services';
import {EcritureService} from '../services/ecriture.service';
import {Compte} from '../compte.model';
import {Ecriture} from '../ecriture.model';

@Component({
  selector: 'app-ec-co',
  templateUrl: './ec-co.component.html',
  styleUrls: ['./ec-co.component.css']
})
export class EcCoComponent implements OnInit {
  comptes: Compte [] = [];
  ecritures: Ecriture [] = [];
  show = false;

  constructor(private compteService: CompteService, private ecritureService: EcritureService) { }

  ngOnInit() {
    this.ecritureService.showEcCo.subscribe(() => {
      this.show = !this.show;
    });
    this.compteService.getComptes().subscribe(co => {
      this.comptes = co;
      this.ecritureService.getEcritures().subscribe(ec => {
        this.ecritures = ec;
      });
    });
  }
  remplire() {

  }
}
interface comec {
  matcom: number;

  ec: Ecriture[];
}
