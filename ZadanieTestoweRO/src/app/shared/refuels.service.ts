import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Refuel} from '../shared/refuel';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RefuelsService {

  refuels: Refuel[] = [];
  refuelsChanged = new Subject<Refuel[]>();
  error = new Subject<string>();

  constructor(private http: HttpClient, private routes: Router) { }

  getRefuel(index: number): Refuel {
    return this.refuels[index];
  }

  addRefuel(refuel: Refuel): void {
    const postData: Refuel = refuel;
    this.http
      .post(
        'http://localhost:8080/zadanie/refuels',
        postData,
        {
          observe: 'response'
        }
      )
      .subscribe(
        responseData => {
          this.routes.navigate(['general/refuelinghistory']);
        },
        error => {
          this.error.next(error.message);
        }
      );
  }

  updateRefuel(index: number, newRefuel: Refuel): void {
    const postData: Refuel = newRefuel;
    this.http
    .put(
      'http://localhost:8080/zadanie/refuels/'+index,
      postData,
      {
        observe: 'response'
      }
    )
    .subscribe(
      responseData => {
        this.fetchRefuels();
      },
      error => {
        this.error.next(error.message);
      }
    );
  }

  deleteRefuel(index: number): void {
    this.http
    .delete(
      'http://localhost:8080/zadanie/refuels/'+index
    )
    .subscribe(
      responseData => {
        this.fetchRefuels();
      },
      error => {
        this.error.next(error.message);
      }
    );
  }

  fetchRefuels(): void {
    this.http
      .get(
        'http://localhost:8080/zadanie/refuels',
        {
          responseType: 'json'
        }
      ).subscribe(
            responseData => {
              this.refuels = (<Refuel[]>responseData).slice();
              this.refuelsChanged.next(this.refuels.slice());
            },
            error => {
              this.error.next(error.message);
            });
  }
}