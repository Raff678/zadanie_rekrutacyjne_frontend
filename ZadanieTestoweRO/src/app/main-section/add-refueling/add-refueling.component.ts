import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RefuelEntry } from '../refuel-entry.model';
import {RefuelsService} from '../../shared/refuels.service'
@Component({
  selector: 'app-add-refueling',
  templateUrl: './add-refueling.component.html',
  styleUrls: ['./add-refueling.component.scss']
})
export class AddRefuelingComponent implements OnInit {
  addEntryForm: FormGroup;

  constructor(private refuelsService: RefuelsService) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void{
    const entry: RefuelEntry = new RefuelEntry(
      this.addEntryForm.value.meterStatus,
      this.addEntryForm.value.date,
      this.addEntryForm.value.fuelType,
      this.addEntryForm.value.fuelAmount,
      this.addEntryForm.value.unitPrice
    );
    this.refuelsService.addRefuel(entry);
  }

  private initForm(): void {
    this.addEntryForm = new FormGroup({
      date: new FormControl(''),
      fuelAmount: new FormControl(''),
      fuelType: new FormControl(''),
      meterStatus: new FormControl(''),
      unitPrice: new FormControl('')
    });
  }
}
