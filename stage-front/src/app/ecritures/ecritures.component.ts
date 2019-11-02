import { Component, OnInit } from '@angular/core';
import { EcritureService } from '../services/ecriture.service';
@Component({
  selector: 'app-ecritures',
  templateUrl: './ecritures.component.html',
  styleUrls: ['./ecritures.component.css']
})
export class EcrituresComponent implements OnInit {
  show = false;
  selectedTab = 0;
  constructor(private ecritureService: EcritureService) { }

  ngOnInit() {
    this.ecritureService.show$.subscribe(() => {
      this.show = !this.show;
    });
  }

}
