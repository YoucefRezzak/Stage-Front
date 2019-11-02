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
  mat = true;
  AjtTxt = 'Ajouter Compte';
  constructor(private compteService: CompteService) { }

  ngOnInit() {
    this.compteService.messageTab$.subscribe(compte => {
      this.modifier(compte);
      this.mat = false;
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
        this.mat = true;
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
    const b = false;
    return b;
  }
  modifier(compte: Compte) {
    this.matt = compte.mat;
    this.nomm = compte.nom;
    this.soldee = compte.somme;
    this.AjtTxt = 'Modifier Compte';
  }
}
