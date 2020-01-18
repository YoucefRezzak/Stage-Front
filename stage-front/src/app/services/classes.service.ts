import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Classe} from '../classe.model';
import {HttpClient } from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Compte} from '../compte.model';
import {CompteService} from '../services/comptes.services';
@Injectable()
export class ClasseService {
  messageTab = new Subject<Classe>();
  messageTab$ = this.messageTab.asObservable();

  messageCompte = new Subject<Classe>();
  messageCompte$ = this.messageCompte.asObservable();

  updatCompte = new Subject<Classe>();
  updatCompte$ = this.updatCompte.asObservable();

  changeTab = new Subject();
  changeTab$ = this.changeTab.asObservable();

  constructor( private http: HttpClient, private compteService: CompteService ) {}
  httpOptionsProduit = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  getClasses(): Observable <Classe []> {
    return this.http.get<Classe []>('http://localhost:3000/classes');

  }
  modifierc(compte: Classe) {
    this.messageTab.next(compte);
    this.changerTab();
  }

  changerTab() {
    this.changeTab.next();
  }

  insertClasse(no: string, nu: number,  somm: number) {
    const classe: Classe = {nom: no, num: nu, somme: somm};
    try {
      this.http.post<Classe>('http://localhost:3000/classes', JSON.stringify(classe), this.httpOptionsProduit).subscribe();
      this.sendtoList(classe);
      // this.changerTab();
      return;
    } catch (err) {
      console.log('mafihach');
      return;
    }
  }
  modifier(compte: Classe) {
    this.messageTab.next(compte);
    this.changerTab();
  }
  updateClasse(no: string, nu: number, sold: number) {
    const compte: Classe = {nom: no, num: nu, somme: sold};
    try {
      this.http.patch<Classe>('http://localhost:3000/classes/' + compte.num,
      JSON.stringify(compte), this.httpOptionsProduit).subscribe();
      this.modifierComptesClasse(compte.num);
      this.updatCompte.next(compte);
      this.changerTab();
      //this.sendtoList(compte);
      return;
    } catch (err) {
      console.log('mafihach');
      return;
    }
  }
  modifierComptesClasse(num: number) {
    let comptes: Compte [] = [];
    this.compteService.getComptes().subscribe( res =>{
      comptes = res;
      comptes.forEach(element => {
        if (element.classe === num) {
          const compte: Compte = {nom: element.nom,
                                classe: num,
                                mat: element.mat,
                                soldein: element.soldein,
                                somme: element.somme};
          this.compteService.modifier(compte);
        }
      });
    })
  }
  sendtoList(compte: Classe ) {
    this.messageCompte.next(compte);
  }

}
