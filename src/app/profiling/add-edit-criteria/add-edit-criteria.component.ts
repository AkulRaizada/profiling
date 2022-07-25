import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface CriteriaMd {
  name: string,
  code: string
}

interface Operator {
  name: string,
  code: string
}

interface Value {
  name: string,
  code: string
}

@Component({
  selector: 'app-add-edit-criteria',
  templateUrl: './add-edit-criteria.component.html',
  styleUrls: ['./add-edit-criteria.component.css']
})
export class AddEditCriteriaComponent implements OnInit {
  CriteriaMd: CriteriaMd[];
  Operator: Operator[];
  Value: Value[];

  selectedCriteriaMd: CriteriaMd;
  selectedOperator: Operator;
  selectedValue: Value;

  constructor(
    public dialogRef: MatDialogRef<AddEditCriteriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
  }

  
  close(): void {
    this.dialogRef.close();
  }

  addCriteria(){
    
  }

}
