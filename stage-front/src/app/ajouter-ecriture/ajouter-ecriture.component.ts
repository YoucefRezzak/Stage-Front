import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {CompteService} from '../services/comptes.services';
import {EcritureService} from '../services/ecriture.service';
import {Compte} from '../compte.model';
import {Ecriture} from '../ecriture.model';
import { DatePipe } from '@angular/common';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material';
import { element } from 'protractor';
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
  motif = '';
  informations = '';
  comptes: Compte[] = [];
  ecritures: Ecriture[] = [];
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
    });
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: this.comptesEControl
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: this.comptesRControl
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: this.Somme,
      forthCtrl: this.Motif
    });
    this.ecritureService.getEcritures().subscribe(res => {
      this.ecritures = res;
    });
  }
  infos() {
    this.informations = 'Compte Envoyant : ' + this.comptesEControl.value.nom + ' ' + this.comptesEControl.value.mat +
                        '<br/>\nCompte Recevant : ' + this.comptesRControl.value.nom + ' ' + this.comptesRControl.value.mat +
                        '<br/>\nSomme : ' + this.Somme.value +
                        '<br/>\nMotif : ' + this.Motif.value;
  }
  num(): number {
    let num = 1;
    this.ecritures.forEach(element => {
      if (num === element.num) {
        num += 1;
      }
    });
    return num;
  }
  ajouter(stepper: MatStepper ) {
    const num = this.num();
    const somme = this.Somme.value as number;
    const matE = this.comptesEControl.value.mat;
    const matS = this.comptesRControl.value.mat;
    const motif = this.Motif.value;
    const date: Date = new Date(Date.now());
    let ando = true;
    this.comptes.forEach(element => {
      if (element.mat === matE ) {
        if (somme > element.somme ) {
          console.log('ma3andoch!');
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
    } finally { console.log('ajouté!'); }
  }
  sendMoney(matE: number, matS: number, somme: number) {
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
