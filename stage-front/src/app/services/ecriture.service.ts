import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient } from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { Ecriture } from '../ecriture.model';
import { CompteService } from './comptes.services';

@Injectable()
export class EcritureService {
  constructor( private http: HttpClient, private compteService: CompteService ) {}
  adress = 'http://localhost:3000';
  httpOptionsProduit = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  show = new Subject();
  show$ = this.show.asObservable();

  recu = new Subject<Ecriture>();
  recu$ = this.recu.asObservable();

  insertEc = new Subject<Ecriture>();
  insertEc$ = this.insertEc.asObservable();

  showE() {
    this.show.next();
  }
  getEcritures(): Observable <Ecriture []> {
    console.log('njibhom!');
    return this.http.get<Ecriture []>(this.adress + '/ecritures');
  }
  insertEcriture(nu: number, somm: number, compteSMat: number, compteVmat: number, moti: string, dat: Date) {
    const ecriture: Ecriture = {num: nu, somme: somm, compteSmat : compteSMat, compteVMat : compteVmat, motif: moti, date: dat};
    try {
      this.http.post<Ecriture>(this.adress + '/ecritures', JSON.stringify(ecriture), this.httpOptionsProduit).subscribe();
      this.sendtoList(ecriture);
      // this.sendMoney()
      // this.changerTab();
      return;
    } catch (err) {
      console.log('mafihach');
      return;
    }
  }
  sendtoList(ecriture: Ecriture) {
    this.insertEc.next(ecriture);
  }
}
