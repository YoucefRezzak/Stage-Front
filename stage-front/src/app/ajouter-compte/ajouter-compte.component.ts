import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { CompteService } from '../services/comptes.services';
import { isNumber } from 'util';
import {Compte } from '../compte.model';

@Component({
  selector: 'app-ajouter-compte',
  templateUrl: './ajouter-compte.component.html',
  styleUrls: ['./ajouter-compte.component.css']
})
/* after modif  : change f tableau
    change button */
export class AjouterCompteComponent implements OnInit {
  matt: number;
  soldee: number;
  nomm: string;
  ttt = false;
  AjtTxt = 'Ajouter Compte';
  comptes: Compte[] = [];
  constructor(private compteService: CompteService) { }

  ngOnInit() {
    this.compteService.messageTab$.subscribe(compte => {
      this.modifier(compte);
      this.ttt = true;
    });
    this.compteService.getComptes().subscribe(res => {
      this.comptes = res;
    });
  }
  ajouter(form: NgForm) {
    console.log(this.AjtTxt);
    if (this.AjtTxt === 'Ajouter Compte') {
      console.log(this.AjtTxt);
      if (!(form.valid && this.noValid(form))) {
        alert('Mauvais remplissage!');
        form.resetForm();
        return;
      }
      if (this.matExist(form.value.mat)) {
        alert('Ce matricule existe déja! ');
        form.resetForm();
        return;
      }
      try {
        this.compteService.insertCompte(form.value.nom, form.value.mat, form.value.solde);
        form.resetForm();
      } catch (err) {
        alert('Mauvais remplissage! 2');
      }

    } else {
      if (!(form.valid && this.noValidmod(form))) {
        alert('Mauvais remplissage! 3 ');
        form.resetForm();
        return;
      }
      try {
        this.compteService.updateCompte(form.value.nom, this.matt, form.value.solde);
        this.AjtTxt = 'Ajouter Compte';
        this.ttt = false;
        form.controls.mat.enable();
        form.resetForm();
      } catch (err) {
        alert('Mauvais remplissage! 4 ');
      }
    }
  }
  noValid(form: NgForm): boolean {
    const b = (!isNaN(form.value.mat)) && (!isNaN(form.value.solde));
    console.log(b);
    return b;
  }
  noValidmod(form: NgForm): boolean {
    const b = !isNaN(form.value.solde);
    console.log(b);
    return b;
  }
  // VERIFIE SI LE MATRICULE EXISTE DEJA!
  matExist(mat: number): boolean {
    let b = false;
    this.comptes.forEach(element => {
      // tslint:disable-next-line: radix
      if (parseInt(element.mat + '') === parseInt(mat + '')) {
        b = true;
      }
    });
    return b;
  }
  modifier(compte: Compte) {
    this.matt = compte.mat;
    this.nomm = compte.nom;
    this.soldee = compte.somme;
    this.AjtTxt = 'Modifier Compte';
  }
}
