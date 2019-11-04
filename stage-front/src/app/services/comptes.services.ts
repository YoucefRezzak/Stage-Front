import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Compte} from '../compte.model';
import {HttpClient } from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class CompteService {
  constructor( private http: HttpClient ) {}

  changeTab = new Subject();
  changeTab$ = this.changeTab.asObservable();

  messageCompte = new Subject<Compte>();
  messageCompte$ = this.messageCompte.asObservable();

  messageTab = new Subject<Compte>();
  messageTab$ = this.messageTab.asObservable();

  message = new Subject();
  message$ = this.message.asObservable();

  showMou = new Subject();
  showMou$ = this.showMou.asObservable();

  updatCompte = new Subject<Compte>();
  updatCompte$ = this.updatCompte.asObservable();
  httpOptionsProduit = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

 compte = new Subject<Compte[]>();
  modifier(compte: Compte) {
    this.messageTab.next(compte);
    this.changerTab();
  }
  changerTab() {
    this.changeTab.next();
  }
  showComptes(): number {
    this.message.next();
    return 0;
  }
  showMouv() {
    this.showMou.next();
  }
  sendtoList(compte: Compte ) {
    this.messageCompte.next(compte);
  }
  getComptes(): Observable <Compte []> {
    return this.http.get<Compte []>('http://localhost:3000/comptes');

  }
  moreMoney(compte: Compte, som: number) {
    try {
      // tslint:disable-next-line: radix
      compte.somme = parseInt(compte.somme + '') + parseInt(som + '');
      this.http.patch<Compte>('http://localhost:3000/comptes/' + compte.mat,
      JSON.stringify(compte), this.httpOptionsProduit).subscribe();
      this.updatCompte.next(compte);
      return;
    } catch (err) {
      console.log('mafihach');
      return;
    }
  }
  lessMoney(compte: Compte, som: number) {
    try {
      compte.somme = compte.somme - som;
      this.http.patch<Compte>('http://localhost:3000/comptes/' + compte.mat,
      JSON.stringify(compte), this.httpOptionsProduit).subscribe();
      this.updatCompte.next(compte);
      return;
    } catch (err) {
      console.log('mafihach');
      return;
    }
  }
  insertCompte(no: string, ma: number, sold: number) {
    const compte: Compte = {nom: no, mat: ma, somme: sold, soldein: sold};
    try {
      this.http.post<Compte>('http://localhost:3000/comptes', JSON.stringify(compte), this.httpOptionsProduit).subscribe();
      this.sendtoList(compte);
      this.changerTab();
      return;
    } catch (err) {
      console.log('mafihach');
      return;
    }
  }
  updateCompte(no: string, ma: number, sold: number) {
    let soldi: number;
    this.getComptes().subscribe(res => {
      res.forEach(element => {
        if (element.mat === ma) {
          soldi = element.soldein;
        }
      });
    });
    const compte: Compte = {nom: no, mat: ma, somme: sold, soldein: soldi};
    try {
      console.log('rah update now ! ');
      console.log('http://localhost:3000/comptes/' + compte.mat);
      this.http.patch<Compte>('http://localhost:3000/comptes/' + compte.mat,
      JSON.stringify(compte), this.httpOptionsProduit).subscribe();
      this.updatCompte.next(compte);
      this.changerTab();
      // this.sendtoList(compte);
      return;
    } catch (err) {
      console.log('mafihach');
      return;
    }
  }


}
