import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { RefuelsService } from 'src/app/shared/refuels.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Refuel } from 'src/app/shared/refuel';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-refueling-history',
  templateUrl: './refueling-history.component.html',
  styleUrls: ['./refueling-history.component.scss']
})
export class RefuelingHistoryComponent implements OnInit,OnDestroy,AfterViewInit {
  subscription: Subscription ;
  dataSource = new MatTableDataSource<Refuel>();

  constructor(private refuelsService: RefuelsService, private dialog: MatDialog) { }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.refuelsService.fetchRefuels();
    this.subscription = this.refuelsService.refuelsChanged
      .subscribe((refuels: Refuel[]) => {
          this.dataSource.data = refuels;
        }
      );
  }
  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
}
  onSearchChange(filterString:string): void{
    this.dataSource.filter = filterString;
  }

  openInfoDialog(index: number): void{
    this.dialog.open(InfoDialogComponent,{data: this.refuelsService.getRefuel(index)});
  }
  openEditDialog(index: number): void{
    const dialogRef = this.dialog.open(EditDialogComponent, {data: this.refuelsService.getRefuel(index)});
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.refuelsService.updateRefuel((<Refuel>result.value).id, result.value);
      }
    });
  }
  openDeleteDialog(index: number): void{
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        let id: number = this.refuelsService.getRefuel(index).id;
        this.refuelsService.deleteRefuel(id);
      }
    });
  }
}





@Component({
  selector: 'app-info-dialog',
  templateUrl: './dialogs/info-dialog.html',
  styles: [`
  .info-dialog__content{ 
    display:grid;
    grid-template-areas: "label data";
  }
  .info-dialog__content--label{
    grid:label;
  }
  .info-dialog__content--data{
    grid:data;
  }
  `]})
export class InfoDialogComponent {
  refuel: Refuel;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Refuel) {
    this.refuel = data;
   }
}

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './dialogs/edit-dialog.html',
})
export class EditDialogComponent {

  editForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Refuel) { }

  ngOnInit(): void {
    this.initForm();
  }
  private initForm(): void {
    this.editForm = new FormGroup({
      id: new FormControl(this.data.id),
      date: new FormControl(this.data.date),
      fuelAmount: new FormControl(this.data.fuelAmount),
      fuelType: new FormControl(this.data.fuelType),
      meterStatus: new FormControl(this.data.meterStatus),
      unitPrice: new FormControl(this.data.unitPrice)
    });
  }
}

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './dialogs/delete-dialog.html',
})
export class DeleteDialogComponent {}
