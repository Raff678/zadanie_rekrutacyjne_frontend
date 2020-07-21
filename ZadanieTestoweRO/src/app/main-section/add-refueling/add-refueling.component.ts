import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {RefuelsService} from '../../shared/refuels.service'
import { Refuel } from 'src/app/shared/refuel';
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

  private initForm(): void {
    this.addEntryForm = new FormGroup({
      date: new FormControl(''),
      fuelAmount: new FormControl(''),
      fuelType: new FormControl(''),
      meterStatus: new FormControl(''),
      unitPrice: new FormControl('')
    });
  }

  onSubmit(): void{
    const refuel: Refuel = {
      id: null,
      meterStatus:this.addEntryForm.value.meterStatus,
      date:this.addEntryForm.value.date,
      fuelType:this.addEntryForm.value.fuelType,
      fuelAmount:this.addEntryForm.value.fuelAmount,
      unitPrice:this.addEntryForm.value.unitPrice
    };
    this.refuelsService.addRefuel(refuel);
  }
}
