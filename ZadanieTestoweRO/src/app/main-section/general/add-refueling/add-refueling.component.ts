import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {RefuelsService} from '../../../shared/refuels.service'
import { Refuel } from '../../../shared/refuel';
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
    const refuel: Refuel = this.addEntryForm.value;
    this.refuelsService.addRefuel(refuel);
  }
}
