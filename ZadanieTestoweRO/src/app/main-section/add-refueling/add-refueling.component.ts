import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
      date: new FormControl('',[Validators.required]),
      fuelAmount: new FormControl('',[Validators.required]),
      fuelType: new FormControl('',[Validators.required]),
      meterStatus: new FormControl('',[Validators.required]),
      unitPrice: new FormControl('',[Validators.required]),
      driverName: new FormControl('')
    });
  }

  onSubmit(): void{
    const refuel: Refuel = {
      id: null,
      meterStatus:this.addEntryForm.value.meterStatus,
      date:this.addEntryForm.value.date,
      fuelType:this.addEntryForm.value.fuelType,
      fuelAmount:this.addEntryForm.value.fuelAmount,
      unitPrice:this.addEntryForm.value.unitPrice,
      driverName:this.addEntryForm.value.driverName
    };
    this.refuelsService.addRefuel(refuel);
  }
}
