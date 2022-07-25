import { Injectable } from '@angular/core';

const TDR_CRITERIA = "Postpaid TDR";
const SCEE_CRITERIA = "Prepaid TDR&SCEE";
const MAX_CHARS_IN_ROW = 70;
//const DONE_STATUS = "done" + getSpaces(5);
const SPACES_FOR_C1V1 = 40;
const SPACES_FOR_STATUS = 20;
const CANCEL_RULE_EXECUTION = "cancel";
const FAILED_STATUS = "Failed!";

@Injectable({
  providedIn: 'root'
})

export class JsTreeContextMenuService {

  constructor() { }

   removingOrEditingCriteria($node,tree){
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
            "action": function (obj) {
                //this.resetProfiling();
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
  
  addingNewCriteria($node,tree){
    return {
        "Create": {
            "separator_before": false,
            "separator_after": false,
            "label": "Add/Edit Criteria",
            "action": function (obj) {
                if(tree._model.data["Overall Customers Summary"].data.status===FAILED_STATUS){
                    alert("Please delete failed rules before adding a new ones");
                    return;
                }
                this.creatCritetiasTable($node);
                this.handleQueries(tree,$node);
                }
            }
    }
  }
  
   handleQueries(tree,$node){
    alert("inside handle fn");
    //this.openSelect();
  //openDialog(dialogrf);
    // let promise = new Promise(function(resolve, reject) {
    //     $('#myModal_cust').modal('show');
    //     $('#myModal_cust').on('hidden.bs.modal',function(){
    //         resolve(CANCEL_RULE_EXECUTION);
    //     });
  
    //     $('#closeAddCriteria').click(function(){
    //         resolve(CANCEL_RULE_EXECUTION);
    //     });
  
    //     $('#addCriteria').click(function(){
    //         var array = new Array();
    //         $('.chosen-choices > li > span').each(function() {
    //             array.push($(this).text());
    //         });
    //         resolve(array);
    //     });
  
    // });
  
    // promise.then(
    //     result => {
    //         if(result === CANCEL_RULE_EXECUTION){
    //             return;
    //         }
  
    //         var repo = $("#repository").val();
    //         var column = $('#tableCriteria').val();
    //         var operator = $('#operator').val();
    //         $('#operator').val("");
    //         var selectedValue = $('#value').val();
    //         $('#values').html("");           
            
    //         // add to history table
    //         //addHistoryForUser(COOKIE[COOKIE_USER_NAME],"add criteria",column);
  
            
    //         var value =createVvQuery(result);
    //         let valueWithNewLines = addBreaklinesIfNeeded(MAX_CHARS_IN_ROW,value);
    //         let amountOfNewLines= (value.match(/<br>/g) || []).length;
    //         let brakeLinesAdd='<br>'.repeat(amountOfNewLines+1);
    //         // let brakeLinesAdd = "spaces";
    //         var tmpNode = tree.create_node($node,{id:column,text: column,data: {count: getSpaces(8)+" loading"+brakeLinesAdd, c1v1: valueWithNewLines,c2v2:"",query:"LOADING", "status": "Processing"+brakeLinesAdd}});
    //         var jsonData = JSON.parse(exportToJson());
    //         refreshTable(jsonData);
  
    //         excuteQueryAndGetCriteriaCount(tree,$node,tmpNode,column,operator,value,repo);
    //         $('#myModal_cust').modal('hide');
    //     });
  }
  
   creatCritetiasTable($node){
    console.log("node is : ", $node);
    // $.ajax({
    //     url:'./tdm_profile/ajaxFiles/getTableCriteria.php',
    //     type: 'POST',
    //     data: $node,
    //     success: function (data) {
    //         $("#criName").html(data);
    //     }
    // });
  }
 }
