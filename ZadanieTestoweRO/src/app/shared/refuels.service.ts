import { Injectable } from '@angular/core';
import { RefuelEntry } from '../main-section/refuel-entry.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefuelsService {

  refuels: RefuelEntry[] = [];
  refuelsChanged = new Subject<RefuelEntry[]>();
  startedEditing = new Subject<number>();
  constructor() { }


  getRefuels(): RefuelEntry[] {
    return this.refuels.slice();
  }

  getRefuel(index: number): RefuelEntry {
    return this.refuels[index];
  }

  addRefuel(refuel: RefuelEntry): void {
    this.refuels.push(refuel);
    this.refuelsChanged.next(this.refuels.slice());
  }

  addRefuels(refuels: RefuelEntry[]): void {
    this.refuels.push(...refuels);
    this.refuelsChanged.next(this.refuels.slice());
  }

  updateRefuel(index: number, newRefuel: RefuelEntry): void {
    this.refuels[index] = newRefuel;
    this.refuelsChanged.next(this.refuels.slice());
  }

  deleteRefuel(index: number): void {
    this.refuels.splice(index, 1);
    this.refuelsChanged.next(this.refuels.slice());
  }
}