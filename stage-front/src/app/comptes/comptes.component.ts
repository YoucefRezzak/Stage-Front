import { Component, OnInit } from '@angular/core';
import {CompteService} from '../services/comptes.services';
import {Observable, Subscribable, Subscription} from 'rxjs';
@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css']
})
export class ComptesComponent implements OnInit {
  selectedTab = 0;
  constructor(  private compteService: CompteService   ) { }
  private sho: Subscription;
  show = true;

  ngOnInit() {
    this.compteService.changeTab$.subscribe(() => {
      this.changeTab();
    });
    this.compteService.message$.subscribe(() => {
        this.show = !this.show;
    });

  }

  changeTab() {
    if (this.selectedTab === 0) {
      this.selectedTab = 1;
    } else {
      this.selectedTab = 0;
    }
  }

}
