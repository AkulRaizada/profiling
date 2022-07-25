import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEditCriteriaProfilingComponent } from '../add-edit-criteria-profiling/add-edit-criteria-profiling.component';

declare var $: any;
const TDR_CRITERIA = "Postpaid TDR";
const SCEE_CRITERIA = "Prepaid TDR&SCEE";
const MAX_CHARS_IN_ROW = 70;
const DONE_STATUS = "done" + getSpaces(5);
const SPACES_FOR_C1V1 = 40;
const SPACES_FOR_STATUS = 20;
const CANCEL_RULE_EXECUTION = "cancel";
const FAILED_STATUS = "Failed!";
declare var dialogref: MatDialog

interface Environment {
  name: string,
  code: string
}

interface Repository {
  name: string,
  code: string
}

interface Criteria {
  name: string,
  code: string
}

interface LoadFavCriteria {
  name: string,
  code: string
}



@Component({
  selector: 'app-profiling',
  templateUrl: './profiling.component.html',
  styleUrls: ['./profiling.component.css']
})
export class ProfilingComponent implements OnInit {
  // @ViewChild('contentSelect', { read: TemplateRef }) contentSelect: TemplateRef<any>;

  // closeResult: string;
  // openSelect(contentSelect: any) {
  //   this.modalService.open(contentSelect, { size: 'xl', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {

  //   if (reason === ModalDismissReasons.ESC) {

  //     return 'by pressing ESC';

  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {

  //     return 'by clicking on a backdrop';

  //   } else {

  //     return `with: ${reason}`;

  //   }

  // }

  Environment: Environment[];
  Repository: Repository[];
  Criteria: Criteria[];
  LoadFavCriteria: LoadFavCriteria[];


  selectedEnvironment: Environment;
  selectedRepository: Repository;
  selectedCriteria: Criteria;
  selectedLoadFavCriteria: LoadFavCriteria;


  disableEnv: boolean = true;
  disableRepo: boolean = true;
  disableCriteria: boolean = true;
  data: any;
  
  constructor(
    private modalService: NgbModal,
    private dialog: MatDialog
  ) {
    this.Environment = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' }
    ];

    this.Repository = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' }
    ];

    this.Criteria = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' }
    ];
    this.data = [
      {
        "id": "Overall Customers Summary",
        "text": "Overall Customers Summary",
        "icon": true,
        "li_attr": {
          "id": "Overall_Customers_Summary"
        },
        "a_attr": {
          "href": "#",
          "id": "Overall_Customers_Summary_anchor"
        },
        "state": {
          "loaded": true,
          "opened": true,
          "selected": false,
          "disabled": false
        },
        "data": {
          "count": "TOTAL: 0",
          "c1v1": getSpaces(SPACES_FOR_C1V1),
          "status": getSpaces(SPACES_FOR_STATUS)
        },
        "parent": "#"
      },
      {
        "id": TDR_CRITERIA,
        "text": TDR_CRITERIA,
        "icon": true,
        "li_attr": {
          "id": TDR_CRITERIA
        },
        "a_attr": {
          "href": "#",
          "id": "TDR criteria_anchor"
        },
        "state": {
          "loaded": true,
          "opened": true,
          "selected": true,
          "disabled": false
        },
        "data": {
          "c1v1": getSpaces(SPACES_FOR_C1V1),
          "status": getSpaces(SPACES_FOR_STATUS)
        },
        "parent": "Overall Customers Summary"
      },
      {
        "id": SCEE_CRITERIA,
        "text": SCEE_CRITERIA,
        "icon": true,
        "li_attr": {
          "id": SCEE_CRITERIA
        },
        "a_attr": {
          "href": "#",
          "id": "SCEE criteria_anchor"
        },
        "state": {
          "loaded": true,
          "opened": true,
          "selected": false,
          "disabled": false
        },
        "data": {
          "c1v1": getSpaces(SPACES_FOR_C1V1),
          "status": getSpaces(SPACES_FOR_STATUS)
        },
        "parent": "Overall Customers Summary"
      }
    ];
  }

  ngOnInit(): void {
    if (true) {
      this.disableEnv = false;
    }

    // load jstree
    var jstree = $("div#jstree").jstree({
      plugins: ["table", "ui", "dnd", "contextmenu"],
      core: {
        data: this.data,
        check_callback: true
      },
      // configure tree table
      table: {
        columns: getColumns(),
        resizable: false,
        contextmenu: true
      },
      "contextmenu": {
        "items": this.customMenu
        //   function ($node: any) {
        //     var tree = $("div#jstree").jstree(true);
        //     if ($node.id == TDR_CRITERIA || $node.id == SCEE_CRITERIA) {
        //       return this.addingNewCriteria($node, tree);
        //     }
        //     else if ($node.parent == TDR_CRITERIA || $node.parent == SCEE_CRITERIA) {
        //       return removingOrEditingCriteria($node, tree);
        //     }
        //   }
      }
    });

    jstree.bind("dblclick.jstree", function (event) {
      var node = $(event.target).closest("li");
      var data = node.data("jstree");
      // this.dialog.open(AddEditCriteriaProfilingComponent, {
      //   width: '250px',
      //   data: {}
      // });
   });

  }

  customMenu=(node)=> {
    var tree = $("div#jstree").jstree(true);

    var items = {
      'item1': {
        'label': 'Add/Edit Criteria',
        'action': function (data) {
          if (tree._model.data["Overall Customers Summary"].data.status === FAILED_STATUS) {
            alert("Please delete failed rules before adding a new ones");
            return;
          }
          // this.dialog.open(AddEditCriteriaProfilingComponent, {
          //   width: '250px',
          //   data: {}
          // });

        
          
        }
      },
      'item2': {
        'label': 'Remove',
        'action': function () { /* action */ }
      }
    }

    if (node.id == TDR_CRITERIA || node.id == SCEE_CRITERIA) {
      delete items.item2;
    } else if (node.parent == TDR_CRITERIA || node.parent == SCEE_CRITERIA) {
      delete items.item1;
    }

    return items;
  }



  envChange() {
    if (this.selectedEnvironment != null) {
      this.disableRepo = false;
    }
  }

  repoChange() {
    if (this.selectedRepository != null) {
      this.disableCriteria = false;
    }
  }

  criteriaChange() {
    if (this.selectedCriteria != null) {

    }
  }

  loadFavCriteriaChange() {

  }

  addingNewCriteria($node: any, tree: any) {
    return {
      "Create": {
        "separator_before": false,
        "separator_after": false,
        "label": "Add/Edit Criteria",
        "action": function (obj: any) {
          if (tree._model.data["Overall Customers Summary"].data.status === FAILED_STATUS) {
            alert("Please delete failed rules before adding a new ones");
            return;
          }
          this.creatCritetiasTable($node);
          this.handleQueries(tree, $node);
        }
      }
    }
  }

  creatCriteriasTable($node: any) {
    console.log("node is : ", $node);
    // $.ajax({
    //   url: './tdm_profile/ajaxFiles/getTableCriteria.php',
    //   type: 'POST',
    //   data: $node,
    //   success: function (data: any) {
    //     $("#criName").html(data);
    //   }
    // });
  }

  handleQueries(tree: any, $node: any) {
    // this.openSelect(this.contentSelect);
    // let promise = new Promise(function (resolve, reject) {

    //   $('#myModal_cust').modal('show');
    //   $('#myModal_cust').on('hidden.bs.modal', function () {
    //     resolve(CANCEL_RULE_EXECUTION);
    //   });

    //   $('#closeAddCriteria').click(function () {
    //     resolve(CANCEL_RULE_EXECUTION);
    //   });

    //   $('#addCriteria').click(function () {
    //     var array = new Array();
    //     $('.chosen-choices > li > span').each(function () {
    //       array.push($(this).text());
    //     });
    //     resolve(array);
    //   });

    // });

    // promise.then(
    //   result => {
    //     if (result === CANCEL_RULE_EXECUTION) {
    //       return;
    //     }

    //     var repo = $("#repository").val();
    //     var column = $('#tableCriteria').val();
    //     var operator = $('#operator').val();
    //     $('#operator').val("");
    //     var selectedValue = $('#value').val();
    //     $('#values').html("");

    //     // add to history table
    //     //addHistoryForUser(COOKIE[COOKIE_USER_NAME], "add criteria", column);


    //     var value = createVvQuery(-result);
    //     let valueWithNewLines = addBreaklinesIfNeeded(MAX_CHARS_IN_ROW, value);
    //     let amountOfNewLines = (value.match(/<br>/g) || []).length;
    //     let brakeLinesAdd = '<br>'.repeat(amountOfNewLines + 1);
    //     // let brakeLinesAdd = "spaces";
    //     var tmpNode = tree.create_node($node, { id: column, text: column, data: { count: getSpaces(8) + " loading" + brakeLinesAdd, c1v1: valueWithNewLines, c2v2: "", query: "LOADING", "status": "Processing" + brakeLinesAdd } });
    //     var jsonData = JSON.parse(exportToJson());
    //     refreshTable(jsonData);

    //     excuteQueryAndGetCriteriaCount(tree, $node, tmpNode, column, operator, value, repo);
    //     $('#myModal_cust').modal('hide');
    //   });
  }

}

function updateStatusForNode(node, status) {
  node.data.status = status;
}

function getTotalCustomerCount(jsonData, total_customer_query, total_subscriber_query) {
  // $.ajax({
  //     url:'./tdm_profile/ajaxFiles/getTotalCustomerCount.php',
  //     type: 'POST',
  //     data: {total_customer_query:total_customer_query,total_subscriber_query:total_subscriber_query,form_data:Form_Data},
  //     success: function (data) {

  //         jsonData[0].data.count = "TOTAL: "+data;
  //         if(total_customer_query == "" && total_subscriber_query!= ""){
  //             jsonData[0].data.query = total_subscriber_query;
  //         }else if(total_customer_query != "" && total_subscriber_query == ""){
  //             jsonData[0].data.query = total_customer_query;
  //         }else if(total_customer_query != "" && total_subscriber_query != ""){
  //             jsonData[0].data.query = "("+total_customer_query + ") INTERSECT ("+ total_subscriber_query+")";
  //         }else{
  //             jsonData[0].data.query = "";
  //         }
  //         updateStatusForNode(jsonData[0],DONE_STATUS);
  //         $('div#jstree').jstree(true).settings.core.data = jsonData;
  //         $('div#jstree').jstree(true).refresh();
  //         $('#jstree').resize()
  //     }
  // });
}

function excuteQueryAndGetCriteriaCount(tree, $node, tmpNode, column, operator, value, repo) {
  // $.ajax({
  //     url:'./tdm_profile/ajaxFiles/getCriteriaCount.php',
  //     type: 'POST',
  //     data: {column:column,operator:operator,value:value,repo:repo,form_data:Form_Data},
  //     success: function (data) {
  //         //remove the temporary node.
  //         tree.delete_node(tmpNode);
  //         data = data.split("~");
  //         value = addBreaklinesIfNeeded(MAX_CHARS_IN_ROW,value);

  //         let amountOfNewLines= (value.match(/<br>/g) || []).length;
  //         let brakeLinesAdd='<br>'.repeat(amountOfNewLines+1);

  //         $node = tree.create_node($node,{id:column,text: column+brakeLinesAdd,data: {count: getSpaces(8)+data[1]+brakeLinesAdd, c1v1: value,c2v2:"",query:data[0],"status": DONE_STATUS+brakeLinesAdd}});
  //         var jsonData = JSON.parse(exportToJson());

  //         updateStatusForNode(jsonData[0],"Processing"); 
  //         refreshTable(jsonData);
  //         var total_customer_query= createTotalTdrQuery(jsonData);

  //         refreshTable(jsonData);

  //         var total_subscriber_query = createTotalSceeQuery(jsonData);

  //         getTotalCustomerCount(jsonData,total_customer_query,total_subscriber_query);
  //     }
  // }).fail(function (jqXHR, textStatus, errorThrown) {
  //     let errorMessage = "Query fail due to : "+errorThrown+".\nConsider removing the rule : "+column;
  //     setTimeout(() => {
  //         tree.delete_node(tmpNode);
  //         value = addBreaklinesIfNeeded(MAX_CHARS_IN_ROW,value);

  //         let amountOfNewLines= (value.match(/<br>/g) || []).length;
  //         let brakeLinesAdd='<br>'.repeat(amountOfNewLines+1);

  //         $node = tree.create_node($node,{id:column,text: column+brakeLinesAdd,data: {count: getSpaces(8)+"---"+brakeLinesAdd, c1v1: value,c2v2:"",query:"---","status": FAILED_STATUS+brakeLinesAdd}});
  //         var jsonData = JSON.parse(exportToJson());

  //         updateStatusForNode(jsonData[0],FAILED_STATUS); 
  //         refreshTable(jsonData);
  //         alert(errorMessage);
  //     }, 100);
  // });
}

function createTotalSceeQuery(jsonData) {
  let i = getFirstNodeOf(SCEE_CRITERIA, jsonData);
  let total_subscriber_query = "";
  for (let j = i; j < jsonData.length; j++) {
    if (jsonData[j].id == SCEE_CRITERIA) {
      continue;
    }
    if (j + 1 >= jsonData.length) {
      total_subscriber_query += jsonData[j].data.query;
    } else {
      total_subscriber_query += jsonData[j].data.query + " INTERSECT ";
    }
  }
  return total_subscriber_query;
}

function getFirstNodeOf(level, jsonData) {
  for (let i = 0; i < jsonData.length; i++) {
    if (jsonData[i].id == level) {
      return i;
    }
  }
}

function createTotalTdrQuery(jsonData) {
  let total_customer_query = ""
  for (let i = 2; i < jsonData.length; i++) {
    if (jsonData[i].id == SCEE_CRITERIA) {
      break;
    }
    if (jsonData[i + 1].id == SCEE_CRITERIA) {
      total_customer_query += jsonData[i].data.query;
    } else {
      total_customer_query += jsonData[i].data.query + " INTERSECT ";
    }
  }
  return total_customer_query;
}

function exportToJson() {
  var v = $('div#jstree').jstree(true).get_json('#', { flat: true })
  var mytext = JSON.stringify(v);
  console.log(mytext);
  // alert(mytext);
  return mytext;
}



function getColumns() {
  return [
    { width: 350, header: "Criteria" + getSpaces(60) },
    { width: 350, value: "count", header: "Ban Count" },
    { width: 350, value: "c1v1", header: "Criteria Value(s)" + getSpaces(80) },
    { width: 350, value: "status", header: "Status   " }
  ]
}



function createVvQuery(selectedValue: any) {
  console.log("selectedValue in createVvQuery: ", selectedValue)
  var value = "(";
  for (var i = 0; i < selectedValue.length; i++) {
    let word: any;
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

function addBreaklinesIfNeeded(maxcharsAmount: any, value: any) {
  if (value.length > maxcharsAmount) {
    let reg = '/(.{' + String(maxcharsAmount) + '})/g';
    value = value.replace(eval(reg), "$1<br>")
  }
  return value;
}

function getSpaces(amount: any) {
  return '&nbsp'.repeat(amount);
}

function refreshTable(jsonData: any) {
  $('div#jstree').jstree(true).settings.core.data = jsonData;
  $('div#jstree').jstree(true).refresh();
  $('#jstree').resize()
}

function removingOrEditingCriteria($node: any, tree: any) {
  // resetProfiling();
  return {
    /* "Create": {
        "separator_before": false,
        "separator_after": false,
        "label": "Edit Criteria",
        "action": function (obj) {
            $('#myModal').modal('show');
        }
    }, */
    "Remove": {
      "separator_before": false,
      "separator_after": false,
      "label": "Remove",
      "action": function (obj: any) {
        resetProfiling();
        // exist();
        /* tree.delete_node($node);
        var jsonData = JSON.parse(exportToJson());
        updateStatusForNode(jsonData[0],"processing");

        var total_customer_query=createTotalTdrQuery(jsonData);
        var total_subscriber_query = createTotalSceeQuery(jsonData);
        refreshTable(jsonData);
        getTotalCustomerCount(jsonData,total_customer_query,total_subscriber_query); */
      }
    }
  }
}

function resetProfiling() {
  var r = confirm("Are you sure you want to reset? ");
  if (r == true) {
    $('#all_customer').prop("checked", true);
    $('#percentaged_customer_value').val('');
    $('#counted_customer_value').val('');
    $('div#jstree').jstree(true).settings.core.data = [
      {
        "id": "Overall Customers Summary",
        "text": "Overall Customers Summary",
        "icon": true,
        "li_attr": {
          "id": "Overall_Customers_Summary"
        },
        "a_attr": {
          "href": "#",
          "id": "Overall_Customers_Summary_anchor"
        },
        "state": {
          "loaded": true,
          "opened": true,
          "selected": false,
          "disabled": false
        },
        "data": {
          "count": "TOTAL: 0",
          "c1v1": ""
        },
        "parent": "#"
      },
      {
        "id": "Customer level criteria",
        "text": "Customer level criteria",
        "icon": true,
        "li_attr": {
          "id": "Customer level criteria"
        },
        "a_attr": {
          "href": "#",
          "id": "Customer level criteria_anchor"
        },
        "state": {
          "loaded": true,
          "opened": true,
          "selected": true,
          "disabled": false
        },
        "data": {
          "count": "&nbsp;&nbsp;&nbsp;&nbsp;TOTAL: 0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
          "c1v1": ""
        },
        "parent": "Overall Customers Summary"
      },
      {
        "id": "Subscriber level criteria",
        "text": "Subscriber level criteria",
        "icon": true,
        "li_attr": {
          "id": "Subscriber level criteria"
        },
        "a_attr": {
          "href": "#",
          "id": "Subscriber level criteria_anchor"
        },
        "state": {
          "loaded": true,
          "opened": true,
          "selected": false,
          "disabled": false
        },
        "data": {
          "count": "&nbsp;&nbsp;&nbsp;&nbsp;TOTAL: 0",
          "c1v1": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
        },
        "parent": "Overall Customers Summary"
      }
    ];
    $('div#jstree').jstree(true).refresh();
  } else {

  }

}

function openDialog(dialog): void {
  let dialogRef = dialog.open(AddEditCriteriaProfilingComponent, {
    width: '250px',
    data: {}
  });

  dialogRef.afterClosed().subscribe(result => {

  });
}