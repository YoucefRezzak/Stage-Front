import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { CompteService } from '../../services/comptes.services';
import { Classe} from '../../classe.model';
import {ClasseService } from '../../services/classes.service';
import { isNumber } from 'util';
import {Compte } from '../../compte.model';

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
  selected: string;
  AjtTxt = 'Ajouter Compte';
  comptes: Compte[] = [];
  classes: Classe[] = [];
  constructor(private compteService: CompteService, private classeService: ClasseService) { }

  ngOnInit() {
    this.compteService.messageTab$.subscribe(compte => {
      this.modifier(compte);
      this.ttt = true;
    });
    this.compteService.getComptes().subscribe(res => {
      this.comptes = res;
    });
    this.classeService.getClasses().subscribe(res => {
      this.classes = res;
    });
  }
  ajouter(form: NgForm) {
    if (this.AjtTxt === 'Ajouter Compte') {
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
        const classnum = this.classnumber(this.selected);
        this.compteService.insertCompte(form.value.nom, form.value.mat, form.value.solde, classnum);
        this.comptes.push({mat: form.value.mat, nom: form.value.nom, somme: form.value.solde, soldein: form.value.solde, classe: classnum});
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
        const classnum = this.classnumber(this.selected);
        this.compteService.updateCompte(form.value.nom, this.matt, form.value.solde, classnum);
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
    return b;
  }
  classnumber(nom: string): number {
    let n = 0;
    this.classes.forEach(element => {
      if (element.nom === nom) {
        n = element.num;
      }
    });
    return n;
  }
  noValidmod(form: NgForm): boolean {
    const b = !isNaN(form.value.solde);
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
    this.selected = compte.nom;
    this.matt = compte.mat;
    this.nomm = compte.nom;
    this.soldee = compte.somme;
    this.AjtTxt = 'Modifier Compte';
  }
}
