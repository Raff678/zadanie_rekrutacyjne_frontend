import { Component, OnInit, OnDestroy } from '@angular/core';
import { RefuelsService } from 'src/app/shared/refuels.service';
import { RefuelEntry } from '../refuel-entry.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-refueling-history',
  templateUrl: './refueling-history.component.html',
  styleUrls: ['./refueling-history.component.scss']
})
export class RefuelingHistoryComponent implements OnInit,OnDestroy {
  refuels: RefuelEntry[];
  subscription: Subscription ;
  constructor(private refuelsService: RefuelsService) { }

  ngOnInit(): void {
    this.refuels = this.refuelsService.getRefuels();
    this.subscription = this.refuelsService.refuelsChanged
      .subscribe((refuels: RefuelEntry[]) => {
          this.refuels = refuels;
        }
      );
  }
  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
