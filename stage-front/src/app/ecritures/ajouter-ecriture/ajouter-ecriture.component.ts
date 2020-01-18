import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {CompteService} from '../../services/comptes.services';
import {EcritureService} from '../../services/ecriture.service';
import {Compte} from '../../compte.model';
import {Ecriture} from '../../ecriture.model';
import { DatePipe } from '@angular/common';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatStepper, MatAutocompleteModule} from '@angular/material';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-ajouter-ecriture',
  templateUrl: './ajouter-ecriture.component.html',
  styleUrls: ['./ajouter-ecriture.component.css']
})
export class AjouterEcritureComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  somme = 0;
  numb = 0;
  motif = '';
  informations = '';
  comptes: Compte[] = [];
  ecritures: Ecriture[] = [];
  options: string [] = [];
  filteredOptions: Observable<string[]>;
  filteredOptions2: Observable<string[]>;
  comptesEControl = new FormControl('', [Validators.required]);
  comptesRControl = new FormControl('', [Validators.required]);
  Motif = new FormControl('', []);
  Somme = new FormControl('', [Validators.required]);

  // tslint:disable-next-line: variable-name
  constructor(private _formBuilder: FormBuilder,
              private compteService: CompteService,
              private ecritureService: EcritureService) {}

  ngOnInit() {
    this.compteService.getComptes().subscribe(res => {
      this.comptes = res;
      this.compteNoms();
      this.filteredOptions = this.comptesEControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
      this.firstFormGroup = this._formBuilder.group({
      firstCtrl: this.comptesEControl
    });
    });

    this.filteredOptions2 = this.comptesRControl.valueChanges
      .pipe(
        startWith(''),
        map(value2 => this._filter(value2))
      );
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: this.comptesRControl
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: this.Somme,
      forthCtrl: this.Motif
    });
    this.ecritureService.getEcritures().subscribe(res => {
      this.ecritures = res;
      this.numb = this.ecritures.length + 1;
    });

  }
  private _filter(value: string): string[] {
    const filterValue = value;

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  infos() {
    this.informations = 'Compte Envoyant : ' + this.comptesEControl.value +
                        '<br/>\nCompte Recevant : ' + this.comptesRControl.value +
                        '<br/>\nSomme : ' + this.Somme.value +
                        '<br/>\nMotif : ' + this.Motif.value;
  }
  num(): number {
     const n = this.numb;
     this.numb += 1;
     return n ;
  }
  compteNoms() {
    this.comptes.forEach( elemen => {
      this.options.push(elemen.nom + ' ' + elemen.mat);
    });
  }
  ajouter(stepper: MatStepper ) {
    const num = this.num();
    const somme = this.Somme.value as number;
    let matE = 0;
    // tslint:disable-next-line: no-shadowed-variable
    this.comptes.forEach(element => {
      if (element.nom + ' ' + element.mat === this.comptesEControl.value) {
        matE = element.mat;
      }
    });
    let matS = 0;
    // tslint:disable-next-line: no-shadowed-variable
    this.comptes.forEach(element => {
      if (element.nom + ' ' + element.mat === this.comptesRControl.value) {
        matS = element.mat;
      }
    });
    const motif = this.Motif.value;
    const date: Date = new Date(Date.now());
    let ando = true;
    // tslint:disable-next-line: no-shadowed-variable
    this.comptes.forEach(element => {
      if (element.mat === matE ) {
        if (somme > element.somme ) {
          alert('Ce Compte n\'a pas cette somme!');
          ando = false;
        }
      }
    });
    try {
      if ( ando ) {
        this.ecritureService.insertEcriture(num, somme, matE, matS, motif, date);
        this.sendMoney(matE, matS, somme);
      }
    } finally { console.log(' '); }
  }
  sendMoney(matE: number, matS: number, somme: number) {
    // tslint:disable-next-line: no-shadowed-variable
    this.comptes.forEach(element => {
      if (element.mat === matE) {
        this.compteService.lessMoney(element, somme);
      }
      if (element.mat === matS) {
        this.compteService.moreMoney(element, somme);
      }
    });
  }
  memeCompte(): boolean {
    if (this.comptesRControl.value !== this.comptesEControl.value) {
      return false;
    }
    return true;
  }
}
