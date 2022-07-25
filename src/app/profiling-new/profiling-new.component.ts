import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetContextMenuItemsParams, MenuItemDef } from 'ag-grid-community';
import { MenuItem, MessageService, PrimeNGConfig, TreeNode } from 'primeng/api';
import { ProfilingService } from '../services/profiling.service';

const TDR_CRITERIA = "Postpaid TDR";
const SCEE_CRITERIA = "Prepaid TDR&SCEE";
const MAX_CHARS_IN_ROW = 70;
//const DONE_STATUS = "done" + getSpaces(5);
const SPACES_FOR_C1V1 = 40;
const SPACES_FOR_STATUS = 20;
const CANCEL_RULE_EXECUTION = "cancel";
const FAILED_STATUS = "Failed!";

@Component({
  selector: 'app-profiling-new',
  templateUrl: './profiling-new.component.html',
  styleUrls: ['./profiling-new.component.css'],
  providers: [MessageService]
})
export class ProfilingNewComponent implements OnInit {
  // @ViewChild('contentSelect', { read: TemplateRef }) contentSelect: TemplateRef<any>;

  files: TreeNode[];
  selectedNode: TreeNode;
  cols: any[];
  items: MenuItem[];
  CriteriaMd: any;//CriteriaMd[];
  LoadFavCriteriaMd: any;
  Operator: any = ["=", "!="];//Operator[];
  disableOperator: boolean = true;
  Value: any;//Value[];
  disableValue: boolean = true;
  selectedCriteriaMd: any;//CriteriaMd;
  selectedLoadFavCriteriaMd: any;
  selectedOperator: any;//Operator;
  selectedValue: any;//Value;
  finalselectedCriteriaMd: string = "";
  finalselectedOperator: string = "";
  finalSelectedValue: string = "";
  criteraCount: string = "";
  totalCustomerCount: string = "";
  displayMaximizable: boolean;
  displayBasic: boolean;
  displayResetAlert: boolean;
  hiddenContextMenu: boolean = false;
  data: any = {
    "data":
      [
        {
          "data": {
            "criteria": "Overall Customers Summary",
            "bancount": "TOTAL: 0",
            "criteriavalues": "",
            "status": ""
          },
          "children": [
            {
              "data": {
                "criteria": TDR_CRITERIA,
                "bancount": "",
                "criteriavalues": "",
                "status": ""
              },
              "children": []
            },
            {
              "data": {
                "criteria": SCEE_CRITERIA,
                "bancount": "",
                "criteriavalues": "",
                "status": ""
              },
              "children": []
            }
          ],
          expanded: true
        }
      ]
  }

  constructor(
    private primengConfig: PrimeNGConfig,
    private profilingService: ProfilingService
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.files = this.data.data;
    this.cols = [
      { field: 'criteria', header: 'Criteria' },
      { field: 'bancount', header: 'Ban Count' },
      { field: 'criteriavalues', header: 'Criteria Value(s)' },
      { field: 'status', header: 'Status' }
    ];

    this.onSelectCriteria();

    // this.items = [
    //   { label: 'Add/Edit Criteria', icon: 'pi pi-fw pi-plus', command: (event) => this.openAddEditCriteriaDialog(this.selectedNode) },
    //   { label: 'Remove', icon: 'pi pi-fw pi-trash', command: (event) => this.removeCriteria(this.selectedNode) }
    // ];

  }

  contextMenu = (node, contextMenu) => {
    //console.log('node', node)
    //console.log('contextMenu', contextMenu)
    if (node.parent != null) {
      if (node.data.criteria == TDR_CRITERIA || node.data.criteria == SCEE_CRITERIA) {
        this.items = [
          { label: 'Add/Edit Criteria', icon: 'pi pi-fw pi-plus', command: (event) => this.openAddEditCriteriaDialog(this.selectedNode) }
        ];
        this.hiddenContextMenu = false;
      }
      else if (node.parent.data.criteria == TDR_CRITERIA || node.parent.data.criteria == SCEE_CRITERIA) {
        this.items = [
          { label: 'Remove', icon: 'pi pi-fw pi-trash', command: (event) => this.removeCriteria(this.selectedNode) }
        ];
        this.hiddenContextMenu = false;
      }
    }
    else if (node.parent == null) {
      this.items = [];
      contextMenu.hide();
      this.hiddenContextMenu = true;
    }
  }

  openAddEditCriteriaDialog(node) {
    this.displaySpinner = "none";
    //console.log(node)
    if (node.parent != null && node.parent.data.criteria == "Overall Customers Summary") {
      if (node.parent.data.status === FAILED_STATUS) {
        // alert("Please delete failed rules before adding a new ones");
        this.displayBasic = true;
        return;
      }
    }
    this.selectedCriteriaMd = "";
    this.selectedOperator = "";
    this.selectedValue = [];
    let alreadyPresentArr: any = [];
    if (node.children[0]) {
      for (let i: number = 0; i < node.children.length; i++) {
        alreadyPresentArr.push(node.children[i].data.criteria);
      }
      //console.log(alreadyPresentArr)
    }
    this.profilingService.getTableCriteria({ "level": node.data.criteria }).subscribe((data: any) => {
      //console.log(data);
      if (node.children[0]) {
        data = data.filter(function (el) {
          return !alreadyPresentArr.includes(el);
        });
      }
      this.CriteriaMd = data;
      this.displayMaximizable = true;
    });
  }

  removeCriteria(node) {
    this.displayResetAlert = true;
  }

  ResetTreeTable() {
    this.data = {
      "data":
        [
          {
            "data": {
              "criteria": "Overall Customers Summary",
              "bancount": "TOTAL: 0",
              "criteriavalues": "",
              "status": ""
            },
            "children": [
              {
                "data": {
                  "criteria": TDR_CRITERIA,
                  "bancount": "",
                  "criteriavalues": "",
                  "status": ""
                },
                "children": []
              },
              {
                "data": {
                  "criteria": SCEE_CRITERIA,
                  "bancount": "",
                  "criteriavalues": "",
                  "status": ""
                },
                "children": []
              }
            ],
            expanded: true
          }
        ]
    }
    this.files = this.data.data;
    this.displayResetAlert = false;
  }

  onCriteriaChange(event) {
    // console.log(event);
    // console.log(this.selectedCriteriaMd);
    this.selectedValue = [];
    if (this.selectedCriteriaMd != "" && this.selectedCriteriaMd != null && this.selectedCriteriaMd != undefined) {
      this.disableOperator = false;
      this.selectedOperator = this.Operator[0];
      this.disableValue = false;
      this.profilingService.getValidValues({ 'criteria': this.selectedCriteriaMd }).subscribe((data: any) => {
        // console.log(data);
        this.Value = data.criterias;
      });
    }
  }
  displaySpinner: string = "none";
  finalSelectedNode: any;
  onAddCriteriaClick() {
    this.displaySpinner = "block";
    this.finalSelectedNode = this.selectedNode;
    // let selectedV: string = "";
    // for (let i: number = 0; i < this.selectedValue.length; i++) {
    //   selectedV += "'" + this.selectedValue[i][0] + "'" + (i != this.selectedValue.length - 1 ? "," : "");
    // }
    this.finalSelectedValue = this.createVvQuery(this.selectedValue);//"(" + selectedV + ")";
    // console.log(this.finalSelectedValue);
    this.finalselectedOperator = this.selectedOperator == "=" ? "EQUALS" : "NOT_EQUALS";
    // console.log(this.finalselectedOperator);
    this.finalselectedCriteriaMd = this.selectedCriteriaMd;
    // console.log(this.finalselectedCriteriaMd);
    this.profilingService.getCriteriaCount({
      'criteria': this.finalselectedCriteriaMd,
      'value': this.finalSelectedValue,
      'operator': this.finalselectedOperator
    }).subscribe((data: any) => {
      //console.log(data);
      this.criteraCount = data.split("~")[1];
      this.profilingService.getTotalCustomerCount({}).subscribe((data: any) => {
        //console.log(data);
        this.totalCustomerCount = data;
        this.addChildInTreeTable();
        this.displayMaximizable = false;
        this.displaySpinner = "none";
      });
    });
  }

  addChildInTreeTable() {
    if (this.finalSelectedNode.data.criteria == this.data.data[0].children[0].data.criteria) {
      this.data.data[0].children[0].children.push({
        "data": {
          "criteria": this.finalselectedCriteriaMd,
          "bancount": this.criteraCount,
          "criteriavalues": this.finalSelectedValue,
          "status": "done"
        },
        "children": []
      });
      this.data.data[0].data.status = "done";
      this.data.data[0].children[0].expanded = true;
      this.files = [...this.files];
    }
    else if (this.finalSelectedNode.data.criteria == this.data.data[0].children[1].data.criteria) {
      this.data.data[0].children[1].children.push({
        "data": {
          "criteria": this.finalselectedCriteriaMd,
          "bancount": this.criteraCount,
          "criteriavalues": this.finalSelectedValue,
          "status": "done"
        },
        "children": []
      });
      this.data.data[0].data.status = "done";
      this.data.data[0].children[0].expanded = true;
      this.files = [...this.files];
    }
  }

  createVvQuery(selectedValue) {
    //console.log("selectedValue in createVvQuery: ", selectedValue)
    var value = "(";
    for (var i = 0; i < selectedValue.length; i++) {
      let word;
      if (selectedValue[i].indexOf(' ') === -1) {
        word = selectedValue[i];
      }
      else {
        word = selectedValue[i].substr(0, selectedValue[i].indexOf(' '))
      }
      if (i == selectedValue.length - 1) {
        value += "'" + word + "'";
      } else {
        value += "'" + word + "',";
      }
    }
    value += ")";
    return value;
  }

  onSelectCriteria() {
    this.profilingService.getFavorites({}).subscribe((data: any) => {
      this.LoadFavCriteriaMd = data;
    });

  }

  onLoadFavCriteriaChange(event) {
    console.log(this.selectedLoadFavCriteriaMd);
  }

  confirmBox: boolean = false;
  displayConfirm() {
    if (this.selectedLoadFavCriteriaMd == null || this.selectedLoadFavCriteriaMd == undefined || this.selectedLoadFavCriteriaMd == "") {
      return;
    }
    this.profilingService.checkForFavoriteName({ favName: this.selectedLoadFavCriteriaMd })
      .subscribe((data: any) => {
        if (data > 0) {
          this.confirmBox = true;
        }
        else {
          this.addCriteriaToFavorites();
        }
      });
  }
  addCriteriaToFavorites() {
    this.profilingService.addToFavorites({ favJSON: (this.data) })
      .subscribe((data: any) => {
        this.onSelectCriteria();
      });
  }

  delete_favorite() {
    if (this.selectedLoadFavCriteriaMd == null || this.selectedLoadFavCriteriaMd == undefined || this.selectedLoadFavCriteriaMd == "") {
      return;
    }
    this.confirmBoxDelete = true;
  }
  
  confirmBoxDelete: boolean = false;
  deleteFavCriteria() {
    this.profilingService.delete_favorite({ favName: (this.selectedLoadFavCriteriaMd) })
      .subscribe((data: any) => {
        this.onSelectCriteria();
        this.confirmBoxDelete = false;
      });
  }

}
