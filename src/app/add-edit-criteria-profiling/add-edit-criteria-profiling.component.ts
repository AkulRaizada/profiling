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
  selector: 'app-add-edit-criteria-profiling',
  templateUrl: './add-edit-criteria-profiling.component.html',
  styleUrls: ['./add-edit-criteria-profiling.component.css']
})
export class AddEditCriteriaProfilingComponent implements OnInit {

  CriteriaMd: CriteriaMd[];
  Operator: Operator[];
  Value: Value[];

  selectedCriteriaMd: CriteriaMd;
  selectedOperator: Operator;
  selectedValue: Value;

  constructor(
    public dialogRef: MatDialogRef<AddEditCriteriaProfilingComponent>,
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
