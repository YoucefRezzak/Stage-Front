import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ClasseService } from '../../services/classes.service';
import { isNumber } from 'util';
import {Classe } from '../../Classe.model';

@Component({
  selector: 'app-classe-ajouter',
  templateUrl: './classe-ajouter.component.html',
  styleUrls: ['./classe-ajouter.component.css']
})
export class ClasseAjouterComponent implements OnInit {
  matt: number;
  soldee: number;
  nomm: string;
  ttt = false;
  AjtTxt = 'Ajouter classe';
  classes: Classe[] = [];
  constructor(private classeService: ClasseService) { }

  ngOnInit() {
    this.classeService.getClasses().subscribe(res => {
      this.classes = res;
    });
    this.classeService.messageTab$.subscribe(compte => {
      this.modifier(compte);
      this.ttt = true;
    });

  }
  ajouter(form: NgForm) {
    console.log(this.AjtTxt);
    if (this.AjtTxt === 'Ajouter classe') {
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
        this.classeService.insertClasse(form.value.nom, form.value.mat, form.value.solde);
        console.log('c bon');
        this.classes.push({num: form.value.mat, nom: form.value.nom, somme: form.value.solde});
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
        this.classeService.updateClasse(form.value.nom, this.matt, form.value.solde);
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
    this.classes.forEach(element => {
      // tslint:disable-next-line: radix
      if (parseInt(element.num + '') === parseInt(mat + '')) {
        console.log('mat exist!');
        b = true;
      }
    });
    return b;
  }
  modifier(classe: Classe) {
    this.matt = classe.num;
    this.nomm = classe.nom;
    this.soldee = classe.somme;
    this.AjtTxt = 'Modifier classe';
  }
}
