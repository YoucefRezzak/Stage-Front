import { Component, OnInit } from '@angular/core';
import {ClasseService} from '../services/classes.service';
import {Observable, Subscribable, Subscription} from 'rxjs';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  selectedTab = 0;
  constructor(  private classeService: ClasseService   ) { }
  private sho: Subscription;
  show = true;

  ngOnInit() {
    this.classeService.changeTab$.subscribe(() => {
      this.changeTab();
    });
  }

  changeTab() {
    console.log('je change de tab! ');
    if (this.selectedTab === 0) {
      console.log('0 welat 1');
      this.selectedTab = 1;
    } else {
      console.log('1 welat 0');
      this.selectedTab = 0;
    }
  }


}
